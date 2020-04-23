import React from "react"
import PropTypes from "prop-types"

const ImageDuo = ({
  primary: { leftImage, leftName, rightImage, rightName },
}) => {
  return (
    <div className="container slice">
      <div className="slice__imageDuo">
        <div className="slice__imageDuo--left">
          <img src={leftImage.url} alt={leftImage?.alt} />
          {leftName && <div className="credit">{leftName}</div>}
        </div>
        <div className="slice__imageDuo--right">
          <img src={rightImage.url} alt={rightImage?.alt} />
          {rightName && <div className="credit">{rightName}</div>}
        </div>
      </div>
    </div>
  )
}

const leftImageShape = PropTypes.shape({
  alt: PropTypes.any,
  copyright: PropTypes.any,
  dimensions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  url: PropTypes.string,
})

ImageDuo.propTypes = {
  primary: PropTypes.shape({
    leftImage: leftImageShape,
    leftName: PropTypes.string,
    rightImage: leftImageShape,
    rightName: PropTypes.string,
  }),
}
export default ImageDuo
