require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Madline Vslr`,
    description: `Site de Madline`,
    author: `Madline Vslr`,
    siteUrl: `https://madlinevslr.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/private/*`, `/gallery/private/*`, `/404`, `/preview`],
      },
    },
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
        defaultLang: "fr-fr",
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      },
    },
    {
      resolve: "gatsby-plugin-prismic-preview",
      options: {
        repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
        linkResolver: require("./linkResolver.js"),
        path: "/preview",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Madline Vslr`,
        short_name: `Madline Vslr`,
        start_url: `/`,
        background_color: `#fffaf6`,
        theme_color: `#24211c`,
        display: `standalone`,
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },
  ],
}
