import React from "react"
import { graphql } from "gatsby"
import Layout from "../hoc/layout"
import RichText from "../components/richText"
import ProjectSlices from "../components/projectSlices"
import { Link } from "gatsby"

const Project = ({
  data: {
    prismic: { project },
  },
}) => {
  const data = project.edges.slice(0, 1).pop().node

  return (
    <>
      <Layout
        isGallery
        seo={{ title: data?.pageTitle, desc: data?.pageDescription }}
      >
        <div className="gallery-all">
          <div className="gallery-preview">
            <div className="infos">
              <div className="title">
                <h1>{data.title}</h1>
                <div className="date">{data.date}</div>
                <div className="place">{data.place}</div>
              </div>
              <RichText data={data.description} />
            </div>

            <div className="thumbnail">
              <img src={data.thumbnail.url} alt={data.thumbnail?.alt} />
            </div>
          </div>
        </div>
      </Layout>
      <ProjectSlices slices={data.body} />
      <div className="next">
        <Link to="/gallery">Retour</Link>
      </div>
    </>
  )
}

export default Project

export const indexQuery = graphql`
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
