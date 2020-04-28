import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import cn from "classnames"
import Helmet from "react-helmet"
import Login from "../components/login"
import "../style/main.scss"

const Client = ({
  data: {
    prismic: { client, layout },
  },
}) => {
  const [clientPassword, setPassword] = useState("")
  const [isCorrect, setCorrect] = useState(false)
  const [hasError, setError] = useState(false)
  const [isDisabled, setDisabled] = useState(true)

  const data = client.edges.slice(0, 1).pop().node

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
        <title>{data.title}</title>
      </Helmet>
      <div>
        {!isCorrect && (
          <Login
            onSubmit={checkPassword}
            onChange={handleChange}
            isDisabled={isDisabled}
            clientPassword={clientPassword}
          />
        )}

        {isCorrect && (
          <div className="contianer">
            <div className="client-page">
              <nav>
                <Link to="/">
                  <img src={layout.logo.url} alt={layout?.alt} width="100" />
                </Link>
              </nav>
              <div className="intro">
                <div className="title">
                  <h1>{data.title}</h1>
                  <p className="date">{data.date}</p>
                  <p className="place">{data.place}</p>
                </div>
                <a
                  href={data.downloadLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Télécharger toutes les photos
                </a>
              </div>
              <div className="photos">
                {data.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo.image.url}
                    alt={photo.image?.alt}
                    className={cn(
                      {
                        portrait:
                          photo.image.dimensions.width <
                          photo.image.dimensions.height,
                      },
                      {
                        landscape:
                          photo.image.dimensions.width >
                          photo.image.dimensions.height,
                      }
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

Client.propTypes = {
  data: PropTypes.object,
}

export default Client

export const clienteQuery = graphql`
  query Client($uid: String!) {
    prismic {
      client: allPrivees(uid: $uid) {
        edges {
          node {
            password
            downloadLink {
              _linkType
              ... on PRISMIC__ExternalLink {
                url
              }
            }
            title
            date
            place
            photos {
              image
            }
          }
        }
      }
      layout(lang: "fr-fr", uid: "layout") {
        logo
      }
    }
  }
`
