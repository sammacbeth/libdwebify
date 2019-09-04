# libdwebify

This is a [Browserify](https://github.com/browserify/browserify) transform, which replaces some
node libraries with [libdweb](https://github.com/mozilla/libdweb) polyfills. This makes your
node networking stack run in Firefox!

Current replaced modules:
 * `net`
 * `dgram`
 * `dns`

## Install

```bash
npm install --save-dev @sammacbeth/libdwebify
```

## Usage

Pass it to browserify with either `-t` to just replace in top-level files, or `-g` to also replace
imports in dependencies:

```bash
browserify -e my_app.js -g @sammacbeth/libdwebify > bundle.js
```

Note, you will still have to add the libdweb experimental APIs in your extension manifest.

## License

MIT
