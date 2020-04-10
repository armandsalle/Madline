import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const ProjectPreview = ({ date, place, thumbnail, title, _meta: { uid } }) => {
  return (
    <div>
      <Link to={`/gallery/${uid}`}>
        <h1>{title}</h1>
        <p>{date}</p>
        <p>{place}</p>
      </Link>
      <img src={thumbnail.url} alt={thumbnail?.alt} width="100" />
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
}

export default ProjectPreview
