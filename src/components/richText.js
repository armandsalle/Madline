import React from "react"
import PropTypes from "prop-types"

import { RichText } from "prismic-reactjs"
import { linkResolver } from "../utils/linkResolver"

const CustomRichText = ({ data }) => {
  if (!data) return null

  return <>{RichText.render(data, linkResolver)}</>
}

CustomRichText.propTypes = {
  data: PropTypes.array,
}

export default CustomRichText
