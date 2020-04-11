/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const { registerLinkResolver } = require("gatsby-source-prismic-graphql")
const { linkResolver } = require("./src/utils/linkResolver")
const React = require("react")

registerLinkResolver(linkResolver)

exports.onInitialClientRender = () => {
  console.log("ok")
  setTimeout(() => {
    const el = document.querySelector(".transition")
    el.style.top = "100vh"
  }, 850)
}

exports.onClientEntry = () => {
  console.log("We've started!")
}

exports.wrapRootElement = ({ element }) => {
  return (
    <>
      <div
        className="transition"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: "999",
          backgroundColor: "black",
          transition: "all .85s ease",
        }}
      ></div>
      {element}
    </>
  )
}
