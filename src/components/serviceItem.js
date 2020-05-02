import React from "react"
import PropTypes from "prop-types"
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
  return (
    <div className="service-item">
      <div className="service-item__info">
        {title && <h2 style={{ "--bg-img": `url(${icone.url})` }}>{title}</h2>}
        {subTitle && <p className="localisation">{subTitle}</p>}
        {description && <RichText data={description} className="description" />}
        <div className="informations">
          {leftInfo && <RichText data={leftInfo} className="leftInfo" />}
          {rightInfo && <RichText data={rightInfo} className="rightInfo" />}
        </div>
      </div>
      <img src={image.url} alt={image?.alt} className="service-item__image" />
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
