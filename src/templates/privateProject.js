import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import ProjectHeader from "../components/projectHeader"
import ProjectSlices from "../components/projectSlices"
import Helmet from "react-helmet"
import Login from "../components/login"

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
        <Login
          onSubmit={checkPassword}
          onChange={handleChange}
          isDisabled={isDisabled}
          clientPassword={clientPassword}
        />
      )}

      {isCorrect && (
        <>
          <ProjectHeader
            title={data.title}
            date={data.date}
            place={data.place}
            description={data.description}
            thumbnail={data.thumbnail}
          />
          <ProjectSlices slices={data.body} />
          <div className="next"></div>
        </>
      )}
    </>
  )
}

PrivateProject.propTypes = {
  data: PropTypes.object,
}

export default PrivateProject

export const clientQuery = graphql`
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
