import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../hoc/layout"
import ProjectPreview from "../components/projectPreview"
import SEO from "../components/seo"

const Gallery = ({
  data: {
    prismic: { projets, galerie },
  },
}) => {
  const data = projets.edges

  return (
    <Layout>
      <SEO title={galerie.pageTitle} description={galerie.description} />
      {data.map(
        (el, i) => !el.node.password && <ProjectPreview key={i} {...el.node} />
      )}
    </Layout>
  )
}

Gallery.propTypes = {
  data: PropTypes.object,
}

export default Gallery

export const indexQuery = graphql`
  query Gallery {
    prismic {
      projets: allProjets {
        edges {
          node {
            password
            title
            date
            place
            thumbnail
            categorie
            _meta {
              uid
            }
          }
        }
      }
      galerie(lang: "fr-fr", uid: "gallery") {
        pageTitle
        pageDescription
      }
    }
  }
`
