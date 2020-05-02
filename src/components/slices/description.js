import React from "react"
import PropTypes from "prop-types"

const Description = ({ fields }) => {
  if (fields.length === 0) return

  return (
    <div className="container slice">
      <div className="slice__description">
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
