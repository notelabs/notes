const withTM = require("next-transpile-modules")(["ui", "hooks"]);


/**
 * @type {import('next').NextConfig}
 **/
module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/auth/session',
        destination: 'https://app.notelabs.me/api/auth/session',
      },
    ]
  },
});
