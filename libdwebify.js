const transformTools = require("browserify-transform-tools");
const packageName = require('./package.json').name;

module.exports = transformTools.makeStringTransform(
  "libdwebify",
  {
    excludeExtensions: [".json"]
  },
  function(content, transformOptions, done) {
    let formatted = content
      .replace(
        /require\(['"]net['"]\)/g,
        `require('${packageName}/lib/net.js')`
      )
      .replace(
        /require\(['"]dgram['"]\)/g,
        `require('${packageName}/lib/dgram.js')`
      )
      .replace(
        /require\(['"]dns['"]\)/g,
        `require('${packageName}/lib/dns.js')`
      );

    done(null, formatted);
  }
);
