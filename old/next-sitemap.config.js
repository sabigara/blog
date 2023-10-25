const siteMetadata = require("./data/siteMetadata")

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: siteMetadata.siteUrl,
  generateRobotsTxt: true,
}
