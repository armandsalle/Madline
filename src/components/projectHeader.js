import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import gsap from "gsap"
import { useInView } from "react-intersection-observer"
import { SeoContext } from "../context/seoContext"
import RichText from "../components/richText"
import cn from "classnames"

const ProjectHeader = ({
  title,
  date,
  place,
  description,
  thumbnail,
  seo,
  fullHeight,
}) => {
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
      gsap.to(`.project-title span`, {
        opacity: 1,
        y: 0,
        ease: "Power2.easeOut",
      })
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
      gsap.to(".preview-img", {
        scale: 1,
        ease: "Power2.easeOut",
      })
    }
  }, [inView])

  return (
    <div className="gallery-all position-relative" ref={refView}>
      <div className={cn("gallery-preview", { fullHeight: !!fullHeight })}>
        <div className="infos">
          <div className="title">
            <h1 className="project-title">
              <span>{title}</span>
            </h1>
            {date && <div className="date opacity-0">{date}</div>}
            {place && <div className="place opacity-0">{place}</div>}
          </div>
          <div className="description-header opacity-0">
            <RichText data={description} />
          </div>
        </div>

        <div className="thumbnail">
          <img
            src={thumbnail.url}
            alt={thumbnail?.alt}
            className="preview-img"
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
  fullHeight: PropTypes.bool,
}

export default ProjectHeader
