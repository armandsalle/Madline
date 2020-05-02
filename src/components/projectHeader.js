import React from "react"
import PropTypes from "prop-types"
import Layout from "../hoc/layout"
import RichText from "../components/richText"

const ProjectHeader = ({ title, date, place, description, thumbnail, seo }) => {
  return (
    <Layout isGallery seo={seo ? seo : false}>
      <div className="gallery-all">
        <div className="gallery-preview">
          <div className="infos">
            <div className="title">
              <h1>{title}</h1>
              {date && <div className="date">{date}</div>}
              {place && <div className="place">{place}</div>}
            </div>
            <RichText data={description} />
          </div>

          <div className="thumbnail">
            <img src={thumbnail.url} alt={thumbnail?.alt} />
          </div>
        </div>
      </div>
    </Layout>
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
