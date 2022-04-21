const withTM = require("next-transpile-modules")(["ui", "hooks"]);


/**
 * @type {import('next').NextConfig}
 **/
module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/app",
        destination: "https://noteslabs-app.vercel.app/app"
      },
      {
        source: "/app/:match*",
        destination: "https://noteslabs-app.vercel.app/app/:match*"
      }
    ]
  },
});
