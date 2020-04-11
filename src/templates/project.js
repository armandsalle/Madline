import React from "react"
import { graphql } from "gatsby"
import Layout from "../hoc/layout"
import RichText from "../components/richText"
import ProjectSlices from "../components/projectSlices"

const Project = ({
  data: {
    prismic: { project },
  },
}) => {
  const data = project.edges[0].node
  console.log(data)
  return (
    <Layout>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <p>{data.place}</p>
      <img src={data.thumbnail.url} alt={data.thumbnail?.alt} width="100" />
      <RichText data={data.description} />
      <ProjectSlices slices={data.body} />
    </Layout>
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
