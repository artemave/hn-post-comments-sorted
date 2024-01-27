# hn-post-comments-sorted <a rel="noreferrer noopener" href="https://addons.mozilla.org/en-GB/firefox/addon/hn-post-comments-sorted/" target="_blank"><img alt="Mozilla Add-on Version" src="https://img.shields.io/amo/v/hn-post-comments-sorted"></a> <a rel="noreferrer noopener" href="https://chromewebstore.google.com/detail/hn-post-comments-sorted/dmpckmaliambaalbnkmgdgmblafdchli"  target="_blank"><img alt="Chrome Web Store Version" src="https://img.shields.io/chrome-web-store/v/dmpckmaliambaalbnkmgdgmblafdchli"></a>
Browser extension that allows sorting HN post comments by date.

## Development

Install dependencies

```sh
npm install
```

Build (and keep rebuilding on file changes)

```sh
npm run dev
```

The build is in `.build/v{2,3}`.

Or just build once. The build directory contains both manifest v2 and v3 versions (for Firefox and Chrome respectively).

```sh
npm run build
```
