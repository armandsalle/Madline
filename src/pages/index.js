import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../hoc/layout"
import RichText from "../components/richText"

const Index = ({
  data: {
    prismic: { home },
  },
}) => {
  return (
    <Layout isLarge>
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
    </Layout>
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
