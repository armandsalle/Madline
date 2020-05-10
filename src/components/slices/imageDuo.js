import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useInView } from "react-intersection-observer"

const ImageDuo = ({
  primary: { leftImage, leftName, rightImage, rightName },
}) => {
  const [refView, inView, entry] = useInView({
    threshold: 0.1,
    rootMargin: "-100px",
    triggerOnce: true,
  })

  const [refView2, inView2, entry2] = useInView({
    threshold: 0.1,
    rootMargin: "-100px",
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      entry.target.classList.remove("opacity-0")
    }
    if (inView2) {
      entry2.target.classList.remove("opacity-0")
    }
  }, [inView, inView2, entry2, entry])

  return (
    <div className="slice__imageDuo slice">
      <div className="slice__imageDuo--left opacity-0" ref={refView}>
        <img src={leftImage.url} alt={leftImage?.alt} />
        {leftName && <div className="credit">{leftName}</div>}
      </div>
      <div className="slice__imageDuo--right opacity-0" ref={refView2}>
        <img src={rightImage.url} alt={rightImage?.alt} />
        {rightName && <div className="credit">{rightName}</div>}
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
