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

  const categories = await graphql(`
    {
      prismic {
        categories: allProjets {
          edges {
            node {
              categorie
              password
            }
          }
        }
      }
    }
  `)

  const templateProject = path.resolve("src/templates/project.js")
  const templatePrivate = path.resolve("src/templates/privateProject.js")
  const templateGallery = path.resolve("src/pages/gallery.js")

  pages.data.prismic.allProjets.edges.forEach(edge => {
    if (!!edge.node.password) {
      createPage({
        path: `/gallery/private/${edge.node._meta.uid}`,
        component: templatePrivate,
        context: {
          uid: edge.node._meta.uid,
        },
      })
    } else {
      createPage({
        path: `/gallery/${edge.node._meta.uid}`,
        component: templateProject,
        context: {
          uid: edge.node._meta.uid,
        },
      })
    }
  })

  categories.data.prismic.categories.edges.forEach(edge => {
    if (!!edge.node.password) return

    createPage({
      path: `/gallery/${edge.node.categorie.toLowerCase()}`,
      component: templateGallery,
      context: {
        uid: edge.node.categorie.toLowerCase(),
      },
    })
  })
}
