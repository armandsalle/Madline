import React from "react"
import { registerLinkResolver } from "gatsby-source-prismic-graphql"
import { linkResolver } from "./src/utils/linkResolver"
import Layout from "./src/hoc/layout"
import { LayoutProvider } from "./src/context/layoutContext"
import { SeoProvider } from "./src/context/seoContext"

registerLinkResolver(linkResolver)

export const onRouteUpdate = ({ location, prevLocation }) => {
  document.querySelector("body").classList.remove("modal-open")
}

export const wrapRootElement = ({ element }) => {
  return (
    <SeoProvider>
      <LayoutProvider>{element}</LayoutProvider>
    </SeoProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout location={props.location}>{element}</Layout>
}
