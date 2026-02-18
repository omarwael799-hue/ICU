/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // امسح X-Frame-Options أو على الأقل خليه SAMEORIGIN
          { key: "X-Frame-Options", value: "SAMEORIGIN" },

          // ده الأهم: اسمح للـ iframe من BrandMeOn
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://app.brandmeon.com https://*.brandmeon.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;