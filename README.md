# hn-post-comments-sorted ![Mozilla Add-on Rating](https://img.shields.io/amo/rating/hn-post-comments-sorted?label=addons.mozilla.org)

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
