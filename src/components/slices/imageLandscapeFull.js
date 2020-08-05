import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useInView } from "react-intersection-observer"
import Img from "gatsby-image"

const ImageLandscapeFull = ({
  primary: { imageFull, imageFullSharp, name },
}) => {
  const [refView, inView, entry] = useInView({
    threshold: 0,
    rootMargin: "-100px",
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      entry.target.classList.remove("opacity-0")
    }
  }, [inView, entry])
  return (
    <div className="slice__imageLandscapeFull slice">
      <div className="opacity-0" ref={refView}>
        <Img
          fluid={imageFullSharp.childImageSharp.fluid}
          alt={imageFull?.alt}
        />
      </div>
      {name && <div className="credit">{name}</div>}
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
