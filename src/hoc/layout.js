import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import cn from "classnames"
import "../style/main.scss"
import About from "../components/about"
import Nav from "../components/nav"

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
  const [menuIsOpen, setMenu] = useState(false)
  const body = document.querySelector("body")

  const handleAbout = () => {
    setAbout(!aboutIsOpen)
    body.classList.toggle("modal-open")
  }

  const handleMenu = () => {
    setMenu(!menuIsOpen)
    body.classList.toggle("modal-open")
  }

  const closeModals = () => {
    setAbout(false)
    setMenu(false)
  }

  return (
    <div className="layout">
      <Link to="/" className="header__logo" onClick={closeModals}>
        <img src={layout.logo.url} alt={layout.logo?.alt} />
      </Link>

      {!menuIsOpen && (
        <button className="header__about" onClick={handleAbout}>
          {aboutIsOpen ? "Fermer" : "À propos"}
        </button>
      )}

      {!aboutIsOpen && (
        <button className="header__menu" onClick={handleMenu}>
          {menuIsOpen ? "Fermer" : "Menu"}
        </button>
      )}

      <div className={cn("container", { index: isIndex })}>{children}</div>

      <About {...layout} open={aboutIsOpen} />
      <Nav categoriesList={categoriesList} open={menuIsOpen} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
