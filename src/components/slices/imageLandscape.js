import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useInView } from "react-intersection-observer"

const ImageLandscape = ({ primary: { imageLandscape, name } }) => {
  const [refView, inView, entry] = useInView({
    threshold: 0.1,
    rootMargin: "-100px",
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      entry.target.classList.remove("opacity-0")
    }
  }, [inView, entry])

  return (
    <div className="slice__imageLandscape slice">
      <img
        src={imageLandscape.url}
        alt={imageLandscape?.alt}
        className="opacity-0"
        ref={refView}
      />
      {name && <div className="credit">{name}</div>}
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
