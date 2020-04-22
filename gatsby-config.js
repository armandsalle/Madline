require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Madline Vslr`,
    description: `Site de Madline`,
    author: `Madline Vslr`,
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
        icon: `./static/icons/favicon-32x32.png`,
      },
    },
  ],
}
