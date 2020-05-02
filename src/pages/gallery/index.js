import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../../hoc/layout"
import ProjectPreview from "../../components/projectPreview"

const Gallery = ({
  data: {
    prismic: { projets, galerie },
  },
  pageContext,
}) => {
  const data = pageContext.uid
    ? projets.edges.filter(
        el => el.node.categorie.toLowerCase() === pageContext.uid
      )
    : projets.edges

  return (
    <Layout
      isGallery
      seo={{ title: galerie?.pageTitle, desc: galerie?.pageDescription }}
    >
      <div className="gallery-all">
        {data.map(
          (el, i) =>
            !el.node.password && <ProjectPreview key={i} {...el.node} />
        )}
      </div>
    </Layout>
  )
}

Gallery.propTypes = {
  data: PropTypes.object,
}

export default Gallery

export const galleryQuery = graphql`
  query Gallery {
    prismic {
      projets: allProjets(sortBy: order_ASC) {
        edges {
          node {
            title
            order
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
