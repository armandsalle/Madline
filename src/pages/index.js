import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import gsap from "gsap"
import { graphql } from "gatsby"
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
    gsap.to(".animate-text *", {
      y: 0,
      opacity: 1,
      delay: 0.4,
      duration: 0.3,
    })
    gsap.to([".volet-img"], {
      width: "0",
      stagger: {
        amount: 0.2,
      },
      ease: "Sine.easeOut",
      duration: 0.3,
    })
  }, [])

  return (
    <div className="home">
      <div className="grid-img">
        {home.heroPhotos.map((el, i) => {
          return i === 0 ? (
            <div className="img-block" key={i}>
              <img src={el.image.url} alt={el.image?.alt} />
              <div className="volet-img"></div>
            </div>
          ) : null
        })}
        <div className="col-left">
          {home.heroPhotos.map((el, i) => {
            return i !== 0 ? (
              <div className="img-block" key={i}>
                <img src={el.image.url} alt={el.image?.alt} />
                <div className="volet-img"></div>
              </div>
            ) : null
          })}
        </div>
      </div>
      <div className="home-title overflow-hidden">
        <RichText data={home.heroTitle} />
        {home.subTitle && (
          <p className="home-subTitle animate-text appear-y">
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
        }
      }
    }
  }
`
