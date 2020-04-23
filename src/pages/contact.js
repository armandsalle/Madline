import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../hoc/layout"
import RichText from "../components/richText"
import facebook from "../images/facebook.webp"
import instagram from "../images/insta.webp"
import pinterest from "../images/pinterest.webp"

const Contact = ({
  data: {
    prismic: { contact },
  },
}) => {
  return (
    <Layout seo={{ title: contact?.pageTitle, desc: contact?.pageDescription }}>
      <div className="contact">
        <div className="content">
          <img
            src={pinterest}
            alt="Pinterest logo"
            className="icone icone-pin"
          />
          <img src={facebook} alt="Facebook logo" className="icone icone-fb" />
          <img
            src={instagram}
            alt="Instagram logo"
            className="icone icone-insta"
          />
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
  data: PropTypes.object,
}

export default Contact

export const contactQuery = graphql`
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
