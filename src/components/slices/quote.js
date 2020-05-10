import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useInView } from "react-intersection-observer"
import RichText from "../richText"

const Quote = ({ primary: { author, quote } }) => {
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
    <div className="slice__quote slice opacity-0" ref={refView}>
      <RichText data={quote} className="content" />
      {author && <p className="author">{author}</p>}
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
