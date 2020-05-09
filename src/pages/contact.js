import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { LayoutContext } from "../context/layoutContext"
import { SeoContext } from "../context/seoContext"
import RichText from "../components/richText"
import facebook from "../images/facebook.webp"
import instagram from "../images/insta.webp"
import pinterest from "../images/pinterest.webp"
import facebookPng from "../images/facebook.png"
import instagramPng from "../images/insta.png"
import pinterestPng from "../images/pinterest.png"
import gsap from "gsap"

const Contact = ({
  data: {
    prismic: { contact },
  },
}) => {
  const { setContainer } = useContext(LayoutContext)
  const { setSeo } = useContext(SeoContext)

  useEffect(() => {
    setContainer("isLarge")
    setSeo({ title: contact?.pageTitle, desc: contact?.pageDescription })
  }, [setContainer, setSeo, contact])

  useEffect(() => {
    gsap.to([".icone"], {
      opacity: 1,
      scale: 1,
      stagger: {
        amount: 0.2,
      },
      duration: 0.6,
    })

    gsap.to(".description", {
      opacity: 1,
      delay: 0.2,
    })
  }, [])

  return (
    <div className="contact">
      <div className="content">
        <picture>
          <source
            type="image/webp"
            srcSet={pinterest}
            alt="Pinterest logo"
            className="icone icone-pin"
          />
          <img
            src={pinterestPng}
            alt="Pinterest logo"
            className="icone icone-pin"
          />
        </picture>

        <picture>
          <source
            type="image/webp"
            srcSet={facebook}
            alt="Facebook logo"
            className="icone icone-fb"
          />
          <img
            src={facebookPng}
            alt="Facebook logo"
            className="icone icone-fb"
          />
        </picture>

        <picture>
          <source
            type="image/webp"
            srcSet={instagram}
            alt="Instagram logo"
            className="icone icone-insta"
          />
          <img
            src={instagramPng}
            alt="Instagram logo"
            className="icone icone-insta"
          />
        </picture>

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
