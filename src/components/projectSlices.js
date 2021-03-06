import React from "react"
import PropTypes from "prop-types"
import ImageLandscape from "./slices/imageLandscape"
import ImageLandscapeFull from "./slices/imageLandscapeFull"
import Description from "./slices/description"
import ImageDuo from "./slices/imageDuo"
import Quote from "./slices/quote"
import ImagePortrait from "./slices/imagePortrait"

const ProjectSlices = ({ slices }) => {
  return (
    slices &&
    slices.map((slice, index) => {
      const res = (() => {
        switch (slice.type) {
          case "image_portrait":
            return <ImagePortrait key={index} {...slice} />
          case "image_paysage":
            return <ImageLandscape key={index} {...slice} />
          case "double_images":
            return <ImageDuo key={index} {...slice} />
          case "citation":
            return <Quote key={index} {...slice} />
          case "photo_paysage_large":
            return <ImageLandscapeFull key={index} {...slice} />
          case "description":
            return <Description key={index} {...slice} />
          default:
            return
        }
      })()
      return res
    })
  )
}

ProjectSlices.propTypes = {
  slices: PropTypes.array,
}

export default ProjectSlices
