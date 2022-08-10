const withTM = require("next-transpile-modules")(["ui", "hooks"]);

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    images: {
      allowFutureImage: true
    }
  },
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
          }
        ]
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/d/:slug',
        destination: '/document/:slug',
        permanent: true
      },
      {
        source: '/doc/:slug',
        destination: '/document/:slug',
        permanent: true
      }
    ]
  }
});
