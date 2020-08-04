import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import gsap from "gsap"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import RichText from "../components/richText"
import { LayoutContext } from "../context/layoutContext"
import { SeoContext } from "../context/seoContext"

const Index = ({
  data: {
    prismic: { home },
  },
}) => {
  const { setContainer } = useContext(LayoutContext)
  const { setSeo } = useContext(SeoContext)

  useEffect(() => {
    setContainer("isLarge")
    setSeo({})
  }, [setContainer, setSeo])

  useEffect(() => {
    gsap.to([".img-block img"], {
      opacity: 1,
      stagger: {
        amount: 0.15,
      },
      ease: "Sine.easeOut",
      duration: 0.4,
    })

    gsap.to(".home-subTitle span", {
      y: 0,
      opacity: 1,
      delay: 0.5,
      duration: 0.3,
    })
  }, [])

  return (
    <div className="home">
      <div className="grid-img">
        {home.heroPhotos.map((el, i) => {
          return i === 0 ? (
            <div className="img-block" key={i}>
              <Img
                fluid={el.imageSharp.childImageSharp.fluid}
                objectFit="cover"
                objectPosition="50% 50%"
                alt={el.image?.alt}
              />
            </div>
          ) : null
        })}
        <div className="col-left">
          {home.heroPhotos.map((el, i) => {
            return i !== 0 ? (
              <div className="img-block" key={i}>
                <Img
                  fluid={el.imageSharp.childImageSharp.fluid}
                  objectFit="cover"
                  objectPosition="50% 50%"
                  alt={el.image?.alt}
                />
              </div>
            ) : null
          })}
        </div>
      </div>
      <div className="home-title overflow-hidden">
        <RichText data={home.heroTitle} />
        {home.subTitle && (
          <p className="home-subTitle">
            <span>{home.subTitle}</span>
          </p>
        )}
      </div>
    </div>
  )
}

Index.propTypes = {
  data: PropTypes.object,
}

export default Index

export const indexQuery = graphql`
  query Home {
    prismic {
      home: accueil(lang: "fr-fr", uid: "home") {
        heroTitle
        subTitle
        heroPhotos {
          image
          imageSharp {
            childImageSharp {
              fluid(maxWidth: 250, quality: 70) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
