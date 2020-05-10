import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useInView } from "react-intersection-observer"

const Description = ({ fields }) => {
  const [refView, inView, entry] = useInView({
    threshold: 0.4,
    rootMargin: "-100px",
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      entry.target.classList.remove("opacity-0")
    }
  }, [inView, entry])

  if (fields.length === 0) return

  return (
    <div className="slice__description slice opacity-0" ref={refView}>
      <div className="titles">
        {fields &&
          fields.map(({ descTitle }, index) => (
            <h5 key={index} className="title">
              {descTitle}
            </h5>
          ))}
      </div>
      <div className="subtitles">
        {fields &&
          fields.map(({ descSubTitle }, index) => (
            <p key={index} className="subTitle">
              {descSubTitle}
            </p>
          ))}
      </div>
      <div className="descriptions">
        {fields &&
          fields.map(({ descText }, index) => (
            <p key={index} className="description">
              {descText}
            </p>
          ))}
      </div>
    </div>
  )
}

Description.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      descSubTitle: PropTypes.string,
      descText: PropTypes.string,
      descTitle: PropTypes.string,
    })
  ),
}

export default Description
