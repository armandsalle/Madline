import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../hoc/layout"
import ProjectPreview from "../components/projectPreview"
import ScrollSnap from "scroll-snap"

const Gallery = ({
  data: {
    prismic: { projets, galerie },
  },
  pageContext,
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const element = containerRef.current

    const snapElement = new ScrollSnap(element, {
      snapDestinationY: "90%",
      time: true,
      duration: 250,
    })

    snapElement.bind()
    return () => {
      snapElement.unbind()
    }
  }, [containerRef, ScrollSnap])

  const data = pageContext.uid
    ? projets.edges.filter(
        el => el.node.categorie.toLowerCase() === pageContext.uid
      )
    : projets.edges

  return (
    <Layout isLarge>
      <div className="gallery-all" ref={containerRef}>
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
