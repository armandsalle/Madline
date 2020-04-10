import React from "react"
import PropTypes from "prop-types"

import { RichText } from "prismic-reactjs"

const richText = ({ data }) => {
  if (!data) return null

  return <>{RichText.render(data)}</>
}

richText.propTypes = {
  data: PropTypes.array,
}

export default richText
