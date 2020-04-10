require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: process.env.PRISMIC_REPOSITORY_NAME, // required
        defaultLang: "fr-fr", // optional, but recommended
        accessToken: process.env.PRISMIC_ACCESS_TOKEN, // optional
        // pages: [{ // optional
        //   type: 'Article', // TypeName from prismic
        //   match: '/article/:uid', // pages will be generated under this pattern (optional)
        //   path: '/article', // placeholder page for unpublished documents
        //   component: require.resolve('./src/templates/article.js'),
        //   sortBy: 'date_ASC', // optional, default: meta_lastPublicationDate_ASC; useful for pagination
        // }],
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
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
