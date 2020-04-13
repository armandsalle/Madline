import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import cn from "classnames"
import "../style/main.scss"
import About from "../components/about"
import Nav from "../components/nav"
// import { globalHistory } from "@reach/router/lib/history"

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

  // State
  const [about, setAbout] = useState({
    initial: false,
    clicked: null,
    text: "À propos",
  })
  const [menu, setMenu] = useState({
    initial: false,
    clicked: null,
    text: "Menu",
  })

  const [disableAbout, setDisableAbout] = useState(false)
  const [disableMenu, setDisableMenu] = useState(false)

  // Methods
  const body = document.querySelector("body")

  const handleAbout = () => {
    handleDisableAbout()

    if (about.initial === false) {
      body.classList.add("modal-open")
      setAbout({
        initial: null,
        clicked: true,
        text: "Fermer",
      })
    } else if (about.clicked === true) {
      setAbout({
        clicked: !about.clicked,
        text: "À propos",
      })
      body.classList.remove("modal-open")
    } else if (about.clicked === false) {
      setAbout({
        clicked: !about.clicked,
        text: "Fermer",
      })
      body.classList.add("modal-open")
    }
  }

  const handleMenu = () => {
    handleDisableMenu()

    if (menu.initial === false) {
      body.classList.add("modal-open")
      setMenu({
        initial: null,
        clicked: true,
        text: "Fermer",
      })
    } else if (menu.clicked === true) {
      setMenu({
        clicked: !menu.clicked,
        text: "Menu",
      })
      body.classList.remove("modal-open")
    } else if (menu.clicked === false) {
      setMenu({
        clicked: !menu.clicked,
        text: "Fermer",
      })
      body.classList.add("modal-open")
    }
  }

  const closeModals = () => {
    body.classList.remove("modal-open")
    setAbout({ clicked: false, text: "À propos" })
    setMenu({ clicked: false, text: "Menu" })
  }

  const handleDisableAbout = () => {
    setDisableAbout(true)
    setTimeout(() => {
      setDisableAbout(false)
    }, 1000)
  }

  const handleDisableMenu = () => {
    setDisableMenu(true)
    setTimeout(() => {
      setDisableMenu(false)
    }, 1000)
  }

  return (
    <div className="layout">
      <Link to="/" className="header__logo" onClick={closeModals}>
        <img src={layout.logo.url} alt={layout.logo?.alt} />
      </Link>

      <button
        disabled={disableAbout}
        className="header__about"
        onClick={handleAbout}
      >
        {about.text}
      </button>

      <button
        disabled={disableMenu}
        className="header__menu"
        onClick={handleMenu}
      >
        {menu.text}
      </button>

      <div className={cn("container", { index: isIndex })}>{children}</div>

      <About {...layout} state={about} />
      <Nav categoriesList={categoriesList} state={menu} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
