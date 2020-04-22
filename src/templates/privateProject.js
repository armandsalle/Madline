import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../hoc/layout"
import RichText from "../components/richText"
import ProjectSlices from "../components/projectSlices"
import Helmet from "react-helmet"

const PrivateProject = ({
  data: {
    prismic: { privateProject },
  },
}) => {
  const [clientPassword, setPassword] = useState("")
  const [isCorrect, setCorrect] = useState(false)
  const [hasError, setError] = useState(false)
  const [isDisabled, setDisabled] = useState(true)

  const data = privateProject.edges.slice(0, 1).pop().node

  const handleChange = e => {
    if (hasError) {
      setError(false)
    }

    setPassword(e.target.value)

    if (e.target.value.length >= 1) {
      setDisabled(false)
    } else if (e.target.value.length === 0) {
      setDisabled(true)
    }
  }

  const checkPassword = e => {
    e.preventDefault()
    if (clientPassword === data.password) {
      setError(false)
      setCorrect(true)
    } else {
      setError(true)
    }
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {!isCorrect && (
        <div className="login">
          <h1>Connectez-vous</h1>
          <form className="login__form" onSubmit={e => checkPassword(e)}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={clientPassword}
              onChange={e => handleChange(e)}
            />
            <button disabled={isDisabled}>
              <svg
                width="7"
                height="13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs />
                <path d="M1 1l5 5.5L1 12" stroke="#24211C" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {isCorrect && (
        <>
          <Layout isGallery>
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
          <div className="next"></div>
        </>
      )}
    </>
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
