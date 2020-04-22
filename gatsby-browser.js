const { registerLinkResolver } = require("gatsby-source-prismic-graphql")
const { linkResolver } = require("./src/utils/linkResolver")

registerLinkResolver(linkResolver)

exports.onRouteUpdate = ({ location, prevLocation }) => {
  document.querySelector("body").classList.remove("modal-open")
}
