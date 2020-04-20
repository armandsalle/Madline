import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const ProjectPreview = ({ date, place, thumbnail, title, _meta: { uid } }) => {
  return (
    <div className="gallery-preview">
      <div className="infos">
        <Link to={`/gallery/${uid}`}>
          <div className="title">
            <h1>{title}</h1>
            <div className="date">{date}</div>
            <div className="place">{place}</div>
          </div>
        </Link>
      </div>

      <Link to={`/gallery/${uid}`} className="thumbnail">
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
}

export default ProjectPreview
