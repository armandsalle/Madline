import React from "react"
import PropTypes from "prop-types"

const ImagePortrait = ({ primary: { imagePortrait, name } }) => {
  return (
    <div className="container slice">
      <div className="slice__imagePortrait">
        <img src={imagePortrait.url} alt={imagePortrait?.alt} />
        {name && <div className="credit">{name}</div>}
      </div>
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
