import React from "react"
import PropTypes from "prop-types"
import cn from "classnames"

const ClientGridPhotos = ({ photos }) => {
  return (
    <div className="photos">
      {photos.map((photo, index) => (
        <img
          key={index}
          src={photo.image.url}
          alt={photo.image?.alt}
          className={cn(
            {
              portrait:
                photo.image.dimensions.width < photo.image.dimensions.height,
            },
            {
              landscape:
                photo.image.dimensions.width > photo.image.dimensions.height,
            }
          )}
        />
      ))}
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
