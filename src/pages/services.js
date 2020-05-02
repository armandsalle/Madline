import React from "react"
import PropTypes from "prop-types"
import { withPrismicPreview } from "gatsby-plugin-prismic-preview"
import { graphql } from "gatsby"
import Layout from "../hoc/layout"
import Service from "../components/serviceItem"

const Services = ({
  data: {
    prismic: { services },
  },
}) => {
  return (
    <Layout
      seo={{ title: services?.pageTitle, desc: services?.pageDescription }}
    >
      {services.services.map((el, i) => (
        <Service key={i} {...el} />
      ))}
    </Layout>
  )
}

Services.propTypes = {
  data: PropTypes.object,
}

export default withPrismicPreview()(Services)

export const servicesQuery = graphql`
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
