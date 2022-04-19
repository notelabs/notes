const withTM = require("next-transpile-modules")(["ui"]);


/**
 * @type {import('next').NextConfig}
 **/
module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/notes/:path*",
        destination: "https://noteslabs-app.vercel.app/notes/:path*"
      }
    ]
  },
});
