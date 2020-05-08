import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import { SeoContext } from "../context/seoContext"
import RichText from "../components/richText"

const ProjectHeader = ({ title, date, place, description, thumbnail, seo }) => {
  const { setSeo } = useContext(SeoContext)

  useEffect(() => {
    setSeo(seo ? seo : false)
  }, [setSeo, seo])

  return (
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
