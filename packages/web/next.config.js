// @ts-check
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "pt-BR"],
    defaultLocale: "pt-BR",
  },
  images: {
    loader: "cloudinary",
    path: "https://res.cloudinary.com/fly-virtual-airlines/image/upload/",
    domains: ["res.cloudinary.com"],
  },
}
