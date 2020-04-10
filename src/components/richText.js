import React from "react"
import PropTypes from "prop-types"

import { RichText } from "prismic-reactjs"

const CustomRichText = ({ data }) => {
  if (!data) return null

  return <>{RichText.render(data)}</>
}

CustomRichText.propTypes = {
  data: PropTypes.array,
}

export default CustomRichText
