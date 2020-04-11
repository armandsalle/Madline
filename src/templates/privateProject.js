import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../hoc/layout"
import RichText from "../components/richText"
import ProjectSlices from "../components/projectSlices"

const PrivateProject = ({
  data: {
    prismic: { privateProject },
  },
}) => {
  const [clientPassword, setPassword] = useState("")
  const [isCorrect, setCorrect] = useState(false)
  const [hasError, setError] = useState(false)

  const data = privateProject.edges.slice(0, 1).pop().node

  const handleChange = e => {
    if (hasError) {
      setError(false)
    }
    setPassword(e.target.value)
  }

  const checkPassword = () => {
    if (clientPassword === data.password) {
      setError(false)
      setCorrect(true)
    } else {
      setError(true)
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="mot de passe"
        value={clientPassword}
        onChange={e => handleChange(e)}
      />
      <button onClick={checkPassword}>Acceder</button>

      {isCorrect && (
        <Layout>
          <h1>{data.title}</h1>
          <p>{data.date}</p>
          <p>{data.place}</p>
          <img src={data.thumbnail.url} alt={data.thumbnail?.alt} width="100" />
          <RichText data={data.description} />
          <ProjectSlices slices={data.body} />
        </Layout>
      )}
    </div>
  )
}

export default PrivateProject

export const pageQuery = graphql`
  query PrivateProject($uid: String!) {
    prismic {
      privateProject: allProjets(uid: $uid) {
        edges {
          node {
            password
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
