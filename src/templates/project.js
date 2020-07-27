import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import { useInView } from "react-intersection-observer"
import { LayoutContext } from "../context/layoutContext"
import ProjectSlices from "../components/projectSlices"
import ProjectHeader from "../components/projectHeader"

const Project = ({
  data: {
    prismic: { project },
  },
}) => {
  const { setContainer } = useContext(LayoutContext)
  const data = project.edges.slice(0, 1).pop().node
  const [refView, inView, entry] = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  useEffect(() => {
    setContainer("isGallery")
  }, [setContainer])

  useEffect(() => {
    if (inView) {
      entry.target.classList.remove("appear-y", "opacity-0")
    }
  }, [inView, entry])

  return (
    <>
      <ProjectHeader
        seo={{ title: data?.pageTitle, desc: data?.pageDescription }}
        title={data.title}
        date={data.date}
        place={data.place}
        description={data.description}
        thumbnail={data.thumbnail}
        thumbnailSharp={data.thumbnailSharp}
        fullHeight={true}
      />
      <ProjectSlices slices={data.body} />
      <div className="next">
        <Link to="/gallery" className="appear-y opacity-0" ref={refView}>
          Retour
        </Link>
      </div>
    </>
  )
}

Project.propTypes = {
  data: PropTypes.object,
}

export default Project

export const projectQuery = graphql`
  query Project($uid: String!) {
    prismic {
      project: allProjets(uid: $uid) {
        edges {
          node {
            title
            date
            place
            thumbnail
            thumbnailSharp {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            categorie
            description
            pageTitle
            pageDescription
            _meta {
              uid
            }
            body {
              __typename
              ... on PRISMIC_ProjetBodyImage_portrait {
                type
                primary {
                  imagePortrait
                  imagePortraitSharp {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  name
                }
              }
              ... on PRISMIC_ProjetBodyCitation {
                type
                primary {
                  quote
                  author
                }
              }
              ... on PRISMIC_ProjetBodyImage_paysage {
                type
                primary {
                  imageLandscape
                  imageLandscapeSharp {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  name
                }
              }
              ... on PRISMIC_ProjetBodyDouble_images {
                type
                primary {
                  leftImage
                  leftImageSharp {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  leftName
                  rightImage
                  rightImageSharp {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  rightName
                }
              }
              ... on PRISMIC_ProjetBodyPhoto_paysage_large {
                type
                primary {
                  imageFull
                  imageFullSharp {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  name
                }
              }
              ... on PRISMIC_ProjetBodyDescription {
                type
                fields {
                  descTitle
                  descSubTitle
                  descText
                }
              }
            }
          }
        }
      }
    }
  }
`
