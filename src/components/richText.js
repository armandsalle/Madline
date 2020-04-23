import React from "react"
import PropTypes from "prop-types"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../utils/linkResolver"
import cn from "classnames"

const CustomRichText = ({ data, className }) => {
  if (!data) return null

  return (
    <div className={cn("richtext", className)}>
      {RichText.render(data, linkResolver)}
    </div>
  )
}

CustomRichText.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
}

export default CustomRichText
