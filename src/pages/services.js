import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Service from "../components/serviceItem"
import { LayoutContext } from "../context/layoutContext"

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

const Services = ({
  data: {
    prismic: { services },
  },
}) => {
  const { setContainer } = useContext(LayoutContext)

  useEffect(() => {
    setContainer("")
  }, [setContainer])

  return (
    // <Layout
    //   seo={{ title: services?.pageTitle, desc: services?.pageDescription }}
    // >
    <>
      {services.services.map((el, i) => (
        <Service key={i} {...el} />
      ))}
    </>
    // </Layout>
  )
}

Services.propTypes = {
  data: PropTypes.object,
}
Service.query = servicesQuery
export default Services
