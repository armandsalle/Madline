import React from "react"
import PropTypes from "prop-types"
import RichText from "../richText"

const Quote = ({ primary: { author, quote } }) => {
  return (
    <div className="container slice">
      <div className="slice__quote">
        <RichText data={quote} className="content" />
        {author && <p className="author">{author}</p>}
      </div>
    </div>
  )
}

Quote.propTypes = {
  primary: PropTypes.shape({
    author: PropTypes.string,
    quote: PropTypes.arrayOf(
      PropTypes.shape({
        spans: PropTypes.arrayOf(PropTypes.any),
        text: PropTypes.string,
        type: PropTypes.string,
      })
    ),
  }),
}

export default Quote
