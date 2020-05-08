import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

const graphRequest = graphql`
  {
    prismic {
      layout: layout(lang: "fr-fr", uid: "layout") {
        siteTitle
        siteDescription
        shareImage
      }
    }
  }
`

const Render = ({ seo, data }) => {
  const {
    prismic: { layout },
  } = data
  return (
    <Helmet>
      <html lang="fr" />
      <title>{seo?.title ? seo?.title : layout?.siteTitle}</title>
      <meta
        name="description"
        content={seo?.desc ? seo?.desc : layout?.siteDescription}
      />
      <link rel="canonical" href="madlinevslr.com" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="madlinevslr.com" />
      <meta
        property="og:title"
        content={seo?.title ? seo?.title : layout?.siteTitle}
      />
      <meta
        property="og:description"
        content={seo?.desc ? seo?.desc : layout?.siteDescription}
      />
      <meta property="og:image" content="/image-1200x630.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta http-equiv="imagetoolbar" content="no" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </Helmet>
  )
}

const Seo = props => (
  <StaticQuery
    query={`${graphRequest}`}
    render={data => <Render {...props} data={data} />}
  />
)

export default Seo
