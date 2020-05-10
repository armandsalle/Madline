import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import PropTypes from "prop-types"
import gsap from "gsap"
import RichText from "../components/richText"

const ServiceItem = ({
  image,
  icone,
  title,
  subTitle,
  description,
  leftInfo,
  rightInfo,
}) => {
  const [inViewRef, inViewLocalisation, entry] = useInView({
    threshold: 0,
    rootMargin: "-100px",
    triggerOnce: true,
  })

  const [inViewRef2, inViewImg, entry2] = useInView({
    threshold: 0,
    rootMargin: "-100px",
    triggerOnce: true,
  })

  useEffect(() => {
    if (inViewLocalisation) {
      gsap.to(entry.target.children, {
        y: 0,
        delay: 0.4,
      })
    }

    if (inViewImg) {
      gsap.to(entry2.target.children, {
        opacity: 1,
        duration: 0.5,
        delay: 0.3,
      })
    }
  }, [inViewLocalisation, inViewImg, entry, entry2])

  return (
    <div className="service-item">
      <div className="service-item__info">
        {title && <h2 style={{ "--bg-img": `url(${icone.url})` }}>{title}</h2>}
        {subTitle && (
          <p className="localisation" ref={inViewRef}>
            <span>{subTitle}</span>
          </p>
        )}
        {description && <RichText data={description} className="description" />}
        <div className="informations">
          {leftInfo && <RichText data={leftInfo} className="leftInfo" />}
          {rightInfo && <RichText data={rightInfo} className="rightInfo" />}
        </div>
      </div>
      <div className="service-item__image" ref={inViewRef2}>
        <img src={image.url} alt={image?.alt} />
      </div>
    </div>
  )
}

const spanstexttypeShape = PropTypes.shape({
  spans: PropTypes.arrayOf(PropTypes.any),
  text: PropTypes.string,
  type: PropTypes.string,
})

const iconeShape = PropTypes.shape({
  alt: PropTypes.string,
  copyright: PropTypes.any,
  dimensions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  url: PropTypes.string,
})

ServiceItem.propTypes = {
  description: PropTypes.arrayOf(spanstexttypeShape),
  icone: iconeShape,
  image: iconeShape,
  leftInfo: PropTypes.arrayOf(spanstexttypeShape),
  rightInfo: PropTypes.arrayOf(spanstexttypeShape),
  subTitle: PropTypes.string,
  title: PropTypes.string,
}

export default ServiceItem
