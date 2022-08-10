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
  async redirects() {
    return [
      {
        source: '/d/:slug',
        destination: 'https://app.notelabs.me/document/:slug',
        permanent: true
      },
      {
        source: '/doc/:slug',
        destination: 'https://app.notelabs.me/document/:slug',
        permanent: true
      },
      {
        source: '/document/:slug',
        destination: 'https://app.notelabs.me/document/:slug',
        permanent: true
      }
    ]
  }
});
