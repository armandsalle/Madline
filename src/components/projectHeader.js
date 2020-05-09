import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import gsap from "gsap"
import { useInView } from "react-intersection-observer"
import { SeoContext } from "../context/seoContext"
import RichText from "../components/richText"

const ProjectHeader = ({ title, date, place, description, thumbnail, seo }) => {
  const { setSeo } = useContext(SeoContext)
  const [refView, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  useEffect(() => {
    setSeo(seo ? seo : false)
  }, [setSeo, seo])

  useEffect(() => {
    if (inView) {
      gsap.to(`.place`, {
        opacity: 1,
        delay: 0.2,
        ease: "Power2.easeOut",
      })
      gsap.to(`.date`, {
        opacity: 1,
        delay: 0.34,
        ease: "Power2.easeOut",
      })
      gsap.to(`.description-header`, {
        opacity: 1,
        delay: 0.3,
        ease: "Power2.easeOut",
      })
    }
  }, [inView])

  return (
    <div className="gallery-all" ref={refView}>
      <div className="gallery-preview">
        <div className="infos">
          <div className="title">
            <h1>{title}</h1>
            {date && <div className={`date animate-opacity`}>{date}</div>}
            {place && <div className={`place animate-opacity`}>{place}</div>}
          </div>
          <div className="description-header animate-opacity">
            <RichText data={description} />
          </div>
        </div>

        <div className="thumbnail">
          <img
            src={thumbnail.url}
            alt={thumbnail?.alt}
            className={`preview-img`}
          />
        </div>
      </div>
    </div>
  )
}

ProjectHeader.propTypes = {
  title: PropTypes.string,
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
  description: PropTypes.array,
  seo: PropTypes.object,
}

export default ProjectHeader
