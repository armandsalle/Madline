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

export const onInitialClientRender = () => {
  const images = Array.from(document.querySelectorAll("img"))
  const laoder = document.querySelector(".loading")

  let time = 0

  let stateCheck = setInterval(() => {
    const imagesCompleted = [...images].reduce((acc, img) => {
      return img.complete ? (acc = acc - 1) : acc
    }, images.length)

    if (
      (document.readyState === "complete" && imagesCompleted === 0) ||
      time >= 15
    ) {
      clearInterval(stateCheck)
      laoder.style.opacity = "0"
      laoder.addEventListener("animationend", () => {
        laoder.style.display = "none"
      })
    }
    time++
  }, 100)
}
