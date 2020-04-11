import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import RichText from "../components/richText"

const Layout = ({ children }) => {
  const {
    prismic: { layout, categories },
  } = useStaticQuery(graphql`
    query Layout {
      prismic {
        layout: allLayouts(uid: "layout") {
          edges {
            node {
              title
              logo
              aboutTitle
              aboutText
              backgroundImage
              siteTitle
              siteDescription
              shareImage
              _linkType
            }
          }
        }
        categories: allProjets {
          edges {
            node {
              categorie
            }
          }
        }
      }
    }
  `)

  const data = layout.edges[0].node

  const categoriesList = [
    ...new Set(categories.edges.map(el => el.node.categorie)),
  ]

  return (
    <>
      <Link to="/">
        <img src={data.logo.url} alt={data.logo?.alt} width="100" />
      </Link>
      <p>Menu</p>
      <p>A propos</p>
      <nav>
        <ul>
          <li>
            Galerie
            <ul>
              {categoriesList.map(cat => (
                <li key={cat}>
                  <Link to={`/gallery/${cat.toLowerCase()}`} state={{ cat }}>
                    {cat}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/gallery">Tout</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      {children}
      <h2>{data.aboutTitle}</h2>
      <RichText data={data.aboutText} />
      <img
        src={data.backgroundImage.url}
        alt={data.backgroundImage?.alt}
        width="100"
      />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
