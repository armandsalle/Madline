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
              password
              _meta {
                uid
              }
            }
          }
        }
      }
    }
  `)

  const template = path.resolve("src/templates/project.js")
  const privateTemplate = path.resolve("src/templates/privateProject.js")

  pages.data.prismic.allProjets.edges.forEach(edge => {
    if (!!edge.node.password) {
      createPage({
        path: `/gallery/private/${edge.node._meta.uid}`,
        component: privateTemplate,
        context: {
          uid: edge.node._meta.uid,
        },
      })
    } else {
      createPage({
        path: `/gallery/${edge.node._meta.uid}`,
        component: template,
        context: {
          uid: edge.node._meta.uid,
        },
      })
    }
  })
}
