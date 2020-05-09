import React from "react"
import PropTypes from "prop-types"
import cn from "classnames"

const ClientGridPhotos = ({ photos }) => {
  return (
    <div className="photos">
      {photos.map((photo, index) => {
        return (
          <div
            className={cn({
              large:
                photo.image.dimensions.width > photo.image.dimensions.height,
            })}
            key={index}
          >
            <img src={photo.image.url} alt={photo.image?.alt} />
          </div>
        )
      })}
    </div>
  )
}

ClientGridPhotos.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.any,
      copyright: PropTypes.any,
      dimensions: PropTypes.shape({
        height: PropTypes.number,
        width: PropTypes.number,
      }),
      url: PropTypes.string,
    })
  ),
}

export default ClientGridPhotos
