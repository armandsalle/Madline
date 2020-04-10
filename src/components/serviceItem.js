import React from "react"
import PropTypes from "prop-types"
import RichText from "../components/richText"

const serviceItem = ({
  image,
  icone,
  title,
  subTitle,
  description,
  leftInfo,
  rightInfo,
}) => {
  return (
    <>
      <h2>
        <span>
          <img src={icone.url} alt={icone?.alt} width="50" />
        </span>
        {title}
      </h2>
      <p>{subTitle}</p>
      <RichText data={description} />
      <RichText data={leftInfo} />
      <RichText data={rightInfo} />
      <img src={image.url} alt={image?.alt} width="200" />
    </>
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

serviceItem.propTypes = {
  description: PropTypes.arrayOf(spanstexttypeShape),
  icone: iconeShape,
  image: iconeShape,
  leftInfo: PropTypes.arrayOf(spanstexttypeShape),
  rightInfo: PropTypes.arrayOf(spanstexttypeShape),
  subTitle: PropTypes.string,
  title: PropTypes.string,
}

export default serviceItem
