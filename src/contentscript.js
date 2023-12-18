async function withPulsatingOverlay(fn) {
  const overlay = document.createElement('div')
  overlay.style = `
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    height: 100%;
    background: white;
    animation: pulse 2s infinite;
  `

  document.body.append(overlay)

  const result = await fn()

  overlay.remove()

  return result
}

async function fetchPost(postId) {
  const response = await fetch(`https://hn.algolia.com/api/v1/items/${postId}`)
  return response.json()
}

function renderComments(children, indent = 0) {
  const sortedChildren = children.sort((a, b) => b.created_at_i - a.created_at_i)
  sortedChildren.forEach(child => {
    renderComment(child, indent)
  })
}

function renderComment(comment, indent) {
  const renderedComment = commentTemplate(comment, indent)
  postCommentsContainer.insertAdjacentHTML('beforeend', renderedComment)
  renderComments(comment.children, indent + 1)
}

function renderSortLink(container) {
  container.append(' | ')

  const sortLink = document.createElement('a')

  if (window.location.search.match('sortBy=date')) {
    sortLink.href = window.location.href.replace(/&sortBy=date/, '')
    sortLink.innerText = 'sort by score'
  } else {
    sortLink.href = `${window.location.href}&sortBy=date`
    sortLink.innerText = 'sort by date'
  }

  container.append(sortLink)
}

// copied from https://stackoverflow.com/a/69122877/51209
function timeAgo(input) {
  const date = (input instanceof Date) ? input : new Date(input)
  const formatter = new Intl.RelativeTimeFormat('en')
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  }

  const secondsElapsed = (date.getTime() - Date.now()) / 1000

  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key]
      return formatter.format(Math.round(delta), key)
    }
  }
}

// TODO: vote/unvote
function commentTemplate(comment, indent) {
  return `
    <tr class="athing comtr" id="${comment.id}">
      <td>
        <table border="0">
          <tbody>
            <tr>
              <td class="ind" indent="${indent}"><img src="s.gif" height="1" width="${indent * 40}"></td>
              <td valign="top" class="votelinks">
                <center>
                  <a class="nosee clicky">
                    <div class="votearrow" title="upvote"></div>
                  </a>
                </center>
              </td>
              <td class="default">
                <div style="margin-top:2px; margin-bottom:-10px;">
                  <span class="comhead"><a href="user?id=${comment.author}" class="hnuser">${comment.author}</a> <span class="age" title="${comment.created_at}"><a href="item?id=${comment.id}">${timeAgo(comment.created_at)}</a></span><span class="navs">| <a href="#${comment.story_id}" class="clicky" aria-hidden="true">root</a> | <a href= "#${comment.parent_id}" class="clicky" aria-hidden="true">parent</a> | <a href="#${comment.id}" class="clicky" aria-hidden="true">next</a> <a class="togg clicky" id="${comment.id}" n="2" href="javascript:void(0)">[–]</a></span></span>
                </div>
                <br>
                <div class="comment">
                  <span class="commtext c00">${comment.text}</span>
                  <div class="reply"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  `
}

function injectCss() {
  const pulse = document.createElement('style')
  pulse.innerHTML = `
    @keyframes pulse {
      0% {
        opacity: 0.2;
      }
      50% {
        opacity: 0.6;
      }
      100% {
        opacity: 0.2;
      }
    }
  `
  document.head.append(pulse)
}


(async () => {
  const subline = document.querySelectorAll('.subtext .subline')
  const postCommentsContainer = document.querySelector('.comment-tree')

  injectCss()

  if (subline.length === 1) { // exactly one subline - we're on a post page
    renderSortLink(subline[0])
    if (window.location.search.match('sortBy=date')) {
      const postId = window.location.search.match(/id=(\d+)/)[1]

      const post = await withPulsatingOverlay(() => fetchPost(postId))

      if (post.children.length) {
        postCommentsContainer.innerHTML = ''
        renderComments(post.children)
      }
    }
  }
})()
