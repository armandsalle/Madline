import React, { useEffect } from "react"
import PropTypes from "prop-types"
import gsap from "gsap"
import { useInView } from "react-intersection-observer"
import { Link } from "gatsby"
import lock from "../images/lock.svg"

const ProjectPreview = ({
  isPrivate,
  date,
  place,
  thumbnail,
  title,
  _meta: { uid },
  index,
}) => {
  const [refView, inViewText] = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inViewText) {
      gsap.to(`.place-${index}`, {
        opacity: 1,
        delay: 0.2,
        ease: "Power2.easeOut",
      })
      gsap.to(`.date-${index}`, {
        opacity: 1,
        delay: 0.34,
        ease: "Power2.easeOut",
      })
    } else {
      gsap.to(`.place-${index}`, {
        opacity: 0,
        delay: 0.2,
        ease: "Power2.easeOut",
      })
      gsap.to(`.date-${index}`, {
        opacity: 0,
        delay: 0.34,
        ease: "Power2.easeOut",
      })
    }
  }, [inViewText, index])

  return (
    <div className="gallery-preview">
      <div className="infos">
        <Link to={isPrivate ? `/gallery/private/${uid}` : `/gallery/${uid}`}>
          <div className="title" ref={refView}>
            {isPrivate && <img src={lock} alt="Lock icon" className="lock" />}
            <h1 className="title-animate">{title}</h1>
            {date && (
              <div className={`date animate-opacity date-${index}`}>
                <span>{date}</span>
              </div>
            )}
            {place && (
              <div className={`place animate-opacity place-${index}`}>
                {place}
              </div>
            )}
          </div>
        </Link>
      </div>

      <Link
        to={isPrivate ? `/gallery/private/${uid}` : `/gallery/${uid}`}
        className="thumbnail"
      >
        <img src={thumbnail.url} alt={thumbnail?.alt} />
      </Link>
    </div>
  )
}

ProjectPreview.propTypes = {
  _meta: PropTypes.shape({
    uid: PropTypes.string,
  }),
  categorie: PropTypes.string,
  date: PropTypes.string,
  place: PropTypes.string,
  thumbnail: PropTypes.shape({
    alt: PropTypes.any,
    copyright: PropTypes.any,
    dimensions: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
    }),
    url: PropTypes.string,
  }),
  title: PropTypes.string,
  index: PropTypes.number,
}

export default ProjectPreview
