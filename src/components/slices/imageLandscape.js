import React from "react"
import PropTypes from "prop-types"

const ImageLandscape = ({ primary: { imageLandscape, name } }) => {
  return (
    <div className="container slice">
      <div className="slice__imageLandscape">
        <img src={imageLandscape.url} alt={imageLandscape?.alt} />
        {name && <div className="credit">{name}</div>}
      </div>
    </div>
  )
}

ImageLandscape.propTypes = {
  primary: PropTypes.shape({
    imageLandscape: PropTypes.shape({
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

export default ImageLandscape
