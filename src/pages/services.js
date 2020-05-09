import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Service from "../components/serviceItem"
import { LayoutContext } from "../context/layoutContext"
import { SeoContext } from "../context/seoContext"

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
  const { setSeo } = useContext(SeoContext)

  useEffect(() => {
    setContainer("")
    setSeo({ title: services?.pageTitle, desc: services?.pageDescription })
  }, [setContainer, setSeo, services])

  return (
    <>
      {services.services.map((el, i) => (
        <Service key={i} index={i} {...el} />
      ))}
    </>
  )
}

Services.propTypes = {
  data: PropTypes.object,
}
Service.query = servicesQuery
export default Services
