const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/notes",
        destination: "https://noteslabs-app.vercel.app/",
        permanent: true
      }
    ]
  }
});
