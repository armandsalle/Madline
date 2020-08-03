import React, { useContext, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import ScrollSnap from "scroll-snap"
import { LayoutContext } from "../../context/layoutContext"
import { SeoContext } from "../../context/seoContext"
import ProjectPreview from "../../components/projectPreview"

const Private = ({
  data: {
    prismic: { client },
  },
  pageContext,
}) => {
  const { setContainer } = useContext(LayoutContext)
  const { setSeo } = useContext(SeoContext)
  const scrollRef = useRef()

  const data = pageContext.uid
    ? client.edges.filter(
        el => el.node.categorie.toLowerCase() === pageContext.uid
      )
    : client.edges

  useEffect(() => {
    setContainer("isGallery")
    setSeo({ title: "Madline Vslr - Galerie privée" })
  }, [setContainer, setSeo])

  useEffect(() => {
    if (window.innerWidth >= 1000) {
      bindScrollSnap()
    }
  }, [])

  const bindScrollSnap = () => {
    const element = scrollRef.current
    const snapElement = new ScrollSnap(element, {
      snapDestinationY: "90vh",
      time: true,
    })

    snapElement.bind()
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="gallery-all list" ref={scrollRef}>
        {data.map((el, i) => (
          <ProjectPreview key={i} index={i} isPrivate {...el.node} />
        ))}
      </div>
    </>
  )
}

Private.propTypes = {
  data: PropTypes.object,
}

export default Private

export const privateQuery = graphql`
  query Private {
    prismic {
      client: allPrivees(sortBy: order_ASC) {
        edges {
          node {
            _meta {
              uid
            }
            date
            place
            title
            thumbnail
            thumbnailSharp {
              childImageSharp {
                fluid(maxWidth: 500, quality: 100) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
