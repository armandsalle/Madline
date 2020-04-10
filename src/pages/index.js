import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../templates/layout"
import RichText from "../components/richText"
import SEO from "../components/seo"

const IndexPage = ({
  data: {
    prismic: { home },
  },
}) => {
  console.log(home)
  return (
    <Layout>
      <SEO title="Home" />
      <RichText data={home.heroTitle} />
      <p>{home.subTitle}</p>
      {home.heroPhotos.map((el, i) => (
        <img key={i} src={el.image.url} alt={el.image?.alt} width="100" />
      ))}
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
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
