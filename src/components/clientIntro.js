import React from "react"
import PropTypes from "prop-types"

const ClientIntro = ({ title, date, place, downloadLink }) => {
  return (
    <div className="intro">
      <div className="title">
        <h1>{title}</h1>
        {date && <p className="date">{date}</p>}
        {place && <p className="place">{place}</p>}
      </div>
      {downloadLink?.url && (
        <a href={downloadLink.url} target="_blank" rel="noopener noreferrer">
          Télécharger toutes les photos
        </a>
      )}
    </div>
  )
}

ClientIntro.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  place: PropTypes.string,
  downloadLink: PropTypes.shape({
    __typename: PropTypes.string,
    _linkType: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    url: PropTypes.string,
  }),
}

export default ClientIntro
