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
  }
});
