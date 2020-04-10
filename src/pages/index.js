import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Article from "../components/article"

const IndexPage = ({
  data: {
    prismic: { home },
  },
}) => {
  console.log(home)
  return (
    <Layout>
      <SEO title="Home" />
      <h1>{home.subTitle}</h1>
      <Article />
    </Layout>
  )
}

export default IndexPage

export const indexQuery = graphql`
  query Home {
    prismic {
      home: accueil(lang: "fr-fr", uid: "home") {
        heroTitle
        subTitle
        heroPhotos {
          image
        }
      }
    }
  }
`
