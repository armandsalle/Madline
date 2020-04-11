import React from "react"
import PropTypes from "prop-types"

const Description = ({ fields }) => {
  if (fields.length === 0) return

  return fields.map(({ descTitle, descSubTitle, descText }, index) => (
    <div key={index} className="slice__description">
      <h5>{descTitle}</h5>
      <p>
        <b>{descSubTitle}</b>
      </p>
      <p>
        <i>{descText}</i>
      </p>
    </div>
  ))
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
