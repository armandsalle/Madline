import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
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

  const data = pageContext.uid
    ? client.edges.filter(
        el => el.node.categorie.toLowerCase() === pageContext.uid
      )
    : client.edges

  useEffect(() => {
    setContainer("isGallery")
    setSeo({ title: "Madline Vslr - Galerie privée" })
  }, [setContainer, setSeo])

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="gallery-all">
        {data.map(
          (el, i) =>
            !el.node.password && (
              <ProjectPreview key={i} isPrivate {...el.node} />
            )
        )}
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
          }
        }
      }
    }
  }
`
