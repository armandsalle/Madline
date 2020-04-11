import React, { useState } from "react"
import { graphql, Link } from "gatsby"

const Client = ({
  data: {
    prismic: { client, layout },
  },
}) => {
  const [clientPassword, setPassword] = useState("")
  const [isCorrect, setCorrect] = useState(false)
  const [hasError, setError] = useState(false)

  const data = client.edges.slice(0, 1).pop().node

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
      {!isCorrect && (
        <>
          <input
            type="text"
            placeholder="mot de passe"
            value={clientPassword}
            onChange={e => handleChange(e)}
          />
          <button onClick={checkPassword}>Acceder</button>
        </>
      )}

      {isCorrect && (
        <>
          <nav>
            <Link to="/">
              <img src={layout.logo.url} alt={layout?.alt} width="100" />
            </Link>
          </nav>
          <h1>{data.title}</h1>
          <p>{data.date}</p>
          <p>{data.place}</p>
          {data.photos.map((photo, index) => (
            <img key={index} src={photo.image.url} alt={photo.image?.alt} />
          ))}
        </>
      )}
    </div>
  )
}

export default Client

export const pageQuery = graphql`
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
