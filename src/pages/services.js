import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../templates/layout"

import SEO from "../components/seo"
import Service from "../components/serviceItem"

const Services = ({
  data: {
    prismic: { services },
  },
}) => {
  return (
    <Layout>
      <SEO title={services.pageTitle} />
      {services.services.map((el, i) => (
        <Service key={i} {...el} />
      ))}
    </Layout>
  )
}

Services.propTypes = {
  data: PropTypes.object,
}

export default Services

export const indexQuery = graphql`
  query Services {
    prismic {
      services(lang: "fr-fr", uid: "services") {
        pageTitle
        pageDescription
        services {
          image
          icone
          title
          subTitle
          description
          leftInfo
          rightInfo
        }
      }
    }
  }
`
