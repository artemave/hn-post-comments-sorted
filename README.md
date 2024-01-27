# hn-post-comments-sorted ![Mozilla Add-on Version](https://img.shields.io/amo/v/hn-post-comments-sorted) ![Chrome Web Store](https://img.shields.io/chrome-web-store/rating-count/dmpckmaliambaalbnkmgdgmblafdchli?label=Chrome)

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
