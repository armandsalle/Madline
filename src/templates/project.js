import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import ProjectSlices from "../components/projectSlices"
import ProjectHeader from "../components/projectHeader"

const Project = ({
  data: {
    prismic: { project },
  },
}) => {
  const data = project.edges.slice(0, 1).pop().node

  return (
    <>
      <ProjectHeader
        seo={{ title: data?.pageTitle, desc: data?.pageDescription }}
        title={data.title}
        date={data.date}
        place={data.place}
        description={data.description}
        thumbnail={data.thumbnail}
      />
      <ProjectSlices slices={data.body} />
      <div className="next">
        <Link to="/gallery">Retour</Link>
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
                  name
                }
              }
              ... on PRISMIC_ProjetBodyDouble_images {
                type
                primary {
                  leftImage
                  leftName
                  rightImage
                  rightName
                }
              }
              ... on PRISMIC_ProjetBodyPhoto_paysage_large {
                type
                primary {
                  imageFull
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
