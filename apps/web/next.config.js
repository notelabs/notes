const withTM = require("next-transpile-modules")(["ui", "hooks"]);


/**
 * @type {import('next').NextConfig}
 **/
module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/bee.js",
        destination: "https://cdn.splitbee.io/sb.js",
      },
      {
        source: "/_hive/:slug",
        destination: "https://hive.splitbee.io/:slug",
      },
    ];
  },
});
