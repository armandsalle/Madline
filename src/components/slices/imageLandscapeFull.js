import React from "react"
import PropTypes from "prop-types"

const ImageLandscapeFull = ({ primary: { imageFull, name } }) => {
  return (
    <div className="slice__imageLandscapeFull">
      <img src={imageFull.url} alt={imageFull?.alt} style={{ width: "90vw" }} />
      <div>{name}</div>
    </div>
  )
}

ImageLandscapeFull.propTypes = {
  primary: PropTypes.shape({
    imageFull: PropTypes.shape({
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
export default ImageLandscapeFull
