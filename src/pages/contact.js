import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../hoc/layout"
import RichText from "../components/richText"

const Contact = ({
  data: {
    prismic: { contact },
  },
}) => {
  return (
    <Layout>
      <div className="contact">
        <div className="content">
          <div className="title">
            <h1>{contact.title}</h1>
          </div>
          <RichText data={contact.description} className="description" />
          <img
            src={contact.backgroundImage.url}
            alt={contact.backgroundImage?.alt}
            className="bg-image"
          />
        </div>
      </div>
    </Layout>
  )
}

Contact.propTypes = {
  backgroundImage: PropTypes.shape({
    alt: PropTypes.any,
    copyright: PropTypes.any,
    dimensions: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
    }),
    url: PropTypes.string,
  }),
  description: PropTypes.arrayOf(
    PropTypes.shape({
      spans: PropTypes.arrayOf(
        PropTypes.shape({
          data: PropTypes.shape({
            link_type: PropTypes.string,
            target: PropTypes.string,
            url: PropTypes.string,
          }),
          end: PropTypes.number,
          start: PropTypes.number,
          type: PropTypes.string,
        })
      ),
      text: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  pageDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  title: PropTypes.string,
}

export default Contact

export const indexQuery = graphql`
  query Contact {
    prismic {
      contact(lang: "fr-fr", uid: "contact") {
        title
        description
        backgroundImage
        pageTitle
        pageDescription
      }
    }
  }
`
