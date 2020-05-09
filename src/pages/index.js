import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import gsap from "gsap"
import { graphql } from "gatsby"
import { useInView } from "react-intersection-observer"
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

  const [anime, inView] = useInView({
    threshold: 0,
  })

  const [volet, voletInView] = useInView({
    threshold: 0,
  })

  useEffect(() => {
    setContainer("isLarge")
    setSeo({})
  }, [setContainer, setSeo])

  useEffect(() => {
    if (inView) {
      gsap.to(".animate-text *", {
        y: 0,
        opacity: 1,
        delay: 0.4,
        duration: 0.3,
      })
    }

    if (voletInView) {
      gsap.to([".volet-img"], {
        width: "0",
        stagger: {
          amount: 0.2,
        },
        ease: "Power3.easeIn",
        duration: 0.3,
      })
    }
  }, [inView, voletInView])

  return (
    <div className="home">
      <div className="grid-img">
        {home.heroPhotos.map((el, i) => {
          return i === 0 ? (
            <div className="img-block" key={i}>
              <img src={el.image.url} alt={el.image?.alt} />
              <div className="volet-img" ref={volet}></div>
            </div>
          ) : null
        })}
        <div className="col-left">
          {home.heroPhotos.map((el, i) => {
            return i !== 0 ? (
              <div className="img-block" key={i}>
                <img src={el.image.url} alt={el.image?.alt} />
                <div className="volet-img" ref={volet}></div>
              </div>
            ) : null
          })}
        </div>
      </div>
      <div className="home-title overflow-hidden " ref={anime}>
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
