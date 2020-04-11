import React from "react"
import PropTypes from "prop-types"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../utils/linkResolver"

const CustomRichText = ({ data }) => {
  if (!data) return null

  return <div className="richtext">{RichText.render(data, linkResolver)}</div>
}

CustomRichText.propTypes = {
  data: PropTypes.array,
}

export default CustomRichText
