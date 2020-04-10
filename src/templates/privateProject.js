import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "./layout"

const PrivateProject = ({
  data: {
    prismic: { projet },
  },
}) => {
  const [clientPassword, setPassword] = useState("")
  const [isCorrect, setCorrect] = useState(false)
  const [hasError, setError] = useState(false)

  const data = projet.edges[0].node

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
          <p>Bon mdp</p>
        </Layout>
      )}
    </div>
  )
}

export default PrivateProject

export const pageQuery = graphql`
  query Projet($uid: String!) {
    prismic {
      projet: allProjets(uid: $uid) {
        edges {
          node {
            password
          }
        }
      }
    }
  }
`
