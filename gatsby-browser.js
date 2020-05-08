const React = require("react")
const { registerLinkResolver } = require("gatsby-source-prismic-graphql")
const { linkResolver } = require("./src/utils/linkResolver")
const Layout = require("./src/hoc/layout").default
const { LayoutProvider } = require("./src/context/layoutContext")
const { SeoProvider } = require("./src/context/seoContext")

registerLinkResolver(linkResolver)

exports.onRouteUpdate = ({ location, prevLocation }) => {
  document.querySelector("body").classList.remove("modal-open")
}

exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <SeoProvider>
      <LayoutProvider>
        <Layout>{element}</Layout>
      </LayoutProvider>
    </SeoProvider>
  )
}
