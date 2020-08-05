import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import { useInView } from "react-intersection-observer"

const ImagePortrait = ({
  primary: { imagePortrait, imagePortraitSharp, name },
}) => {
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
    <div className="slice__imagePortrait slice">
      <div className="opacity-0 img-container" ref={refView}>
        <Img
          fluid={imagePortraitSharp.childImageSharp.fluid}
          alt={imagePortrait?.alt}
        />
      </div>
      {name && <div className="credit">{name}</div>}
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
