/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pages = await graphql(`
    {
      prismic {
        allProjets {
          edges {
            node {
              _meta {
                uid
              }
            }
          }
        }
      }
    }
  `)
  console.log(pages)

  const template = path.resolve("src/templates/project.js")

  pages.data.prismic.allProjets.edges.forEach(edge => {
    createPage({
      path: `/gallery/${edge.node._meta.uid}`,
      component: template,
      context: {
        uid: edge.node._meta.uid,
      },
    })
  })
}
