import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import cn from "classnames"
import "../style/main.scss"
import About from "../components/about"

const Layout = ({ children, isIndex }) => {
  const {
    prismic: { layout, categories },
  } = useStaticQuery(graphql`
    query Layout {
      prismic {
        layout(lang: "fr-fr", uid: "layout") {
          title
          logo
          aboutTitle
          aboutText
          backgroundImage
          siteTitle
          siteDescription
          shareImage
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

  const categoriesList = [
    ...new Set(categories.edges.map(el => el.node.categorie)),
  ]

  const [aboutIsOpen, setAbout] = useState(false)

  return (
    <div className="layout">
      <header className="header">
        <div className="header__left">
          <Link to="/">
            <img
              src={layout.logo.url}
              alt={layout.logo?.alt}
              className="header__logo"
            />
          </Link>
          <button
            className="header__about"
            onClick={() => setAbout(!aboutIsOpen)}
          >
            A propos
          </button>
        </div>

        <div className="header__right">
          <p className="header__menu">Menu</p>
        </div>
      </header>

      <div className={cn("container", { home: isIndex })}>{children}</div>

      <About {...layout} open={aboutIsOpen} />

      <nav className="nav">
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
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
