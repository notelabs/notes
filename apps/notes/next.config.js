const withTM = require("next-transpile-modules")(["ui", "hooks"]);

module.exports = withTM({
  reactStrictMode: true,
  basePath: "/app",
  async rewrites () {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: `/api/auth/:path*`,
        },
      ]
    }
  },
  async redirects () {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/app/api/auth/:path*',
        permanent: true,
        basePath: false
      }
    ]
  }
});
