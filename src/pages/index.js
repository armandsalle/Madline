import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import RichText from "../components/richText"
import { LayoutContext } from "../context/layoutContext"

const Index = ({
  data: {
    prismic: { home },
  },
}) => {
  const { setContainer } = useContext(LayoutContext)

  useEffect(() => {
    setContainer("isLarge")
  }, [setContainer])

  return (
    <div className="home">
      <div className="grid-img">
        {home.heroPhotos.map((el, i) => {
          return i === 0 ? (
            <img key={i} src={el.image.url} alt={el.image?.alt} />
          ) : null
        })}
        <div className="col-left">
          {home.heroPhotos.map((el, i) => {
            return i !== 0 ? (
              <img src={el.image.url} alt={el.image?.alt} key={i} />
            ) : null
          })}
        </div>
      </div>
      <div className="home-title">
        <RichText data={home.heroTitle} />
        {home.subTitle && <p className="home-subTitle">{home.subTitle}</p>}
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
