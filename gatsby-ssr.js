const React = require("react")
const Layout = require("./src/hoc/layout").default
const { LayoutProvider } = require("./src/context/layoutContext")
const { SeoProvider } = require("./src/context/seoContext")

exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout location={props.location}>{element}</Layout>
}

exports.wrapRootElement = ({ element }) => {
  return (
    <SeoProvider>
      <LayoutProvider>{element}</LayoutProvider>
    </SeoProvider>
  )
}
