import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { LayoutContext } from "../../context/layoutContext"
import { SeoContext } from "../../context/seoContext"
import ProjectPreview from "../../components/projectPreview"

const Gallery = ({
  data: {
    prismic: { projets, galerie },
  },
  pageContext,
}) => {
  const { setContainer } = useContext(LayoutContext)
  const { setSeo } = useContext(SeoContext)

  const data = pageContext.uid
    ? projets.edges.filter(
        el => el.node.categorie.toLowerCase() === pageContext.uid
      )
    : projets.edges

  useEffect(() => {
    setContainer("isGallery")
    setSeo({ title: galerie?.pageTitle, desc: galerie?.pageDescription })
  }, [setSeo, setContainer, galerie])

  return (
    <div className="gallery-all">
      {data.map(
        (el, i) =>
          !el.node.password && <ProjectPreview key={i} index={i} {...el.node} />
      )}
    </div>
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
