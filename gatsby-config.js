require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Madline`,
    description: `Site de Madline`,
    author: `@madline_vslr`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
        defaultLang: "fr-fr",
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        pages: [],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
  ],
}
