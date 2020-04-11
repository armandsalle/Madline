import React from "react"
import PropTypes from "prop-types"

const ImagePortrait = ({ primary: { imagePortrait, name } }) => {
  return (
    <div className="slice__imagePortrait">
      <img src={imagePortrait.url} alt={imagePortrait?.alt} width="200" />
      <div>{name}</div>
    </div>
  )
}

ImagePortrait.propTypes = {
  primary: PropTypes.shape({
    imagePortrait: PropTypes.shape({
      alt: PropTypes.any,
      copyright: PropTypes.any,
      dimensions: PropTypes.shape({
        height: PropTypes.number,
        width: PropTypes.number,
      }),
      url: PropTypes.string,
    }),
    name: PropTypes.string,
  }),
}

export default ImagePortrait
