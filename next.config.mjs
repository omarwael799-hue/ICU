/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // خلّيه مش DENY
          { key: "X-Frame-Options", value: "SAMEORIGIN" },

          // السماح بالـ iframe من BrandMeOn
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://app.brandmeon.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;