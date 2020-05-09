import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import cn from "classnames"
import "../style/main.scss"
import About from "../components/about"
import Nav from "../components/nav"
import Seo from "../components/seo"
import { LayoutContext } from "../context/layoutContext"

const graphRequest = graphql`
  {
    prismic {
      layout: layout(lang: "fr-fr", uid: "layout") {
        title
        logo
        aboutTitle
        aboutText
        backgroundImage
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
`

const LayoutContainer = ({ children, data, location }) => {
  const { container } = useContext(LayoutContext)
  const {
    prismic: { layout, categories },
  } = data

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
  let body

  if (typeof window !== `undefined`) {
    body = document.querySelector("body")
  }

  const handleAbout = e => {
    e.preventDefault()
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
    <>
      <Seo />
      <div className="layout">
        <Link to="/" className="header__logo" onClick={closeModals}>
          <img src={layout.logo.url} alt={layout.logo?.alt} />
        </Link>

        {!menu.clicked && (
          <button
            disabled={disableAbout}
            className="header__about"
            onClick={e => handleAbout(e)}
          >
            {about.text}
          </button>
        )}

        {!about.clicked && (
          <button
            disabled={disableMenu}
            className="header__menu"
            onClick={handleMenu}
          >
            {menu.text}
          </button>
        )}

        <div
          className={cn("container", {
            large: container === "isLarge",
            gallery: container === "isGallery",
            slice: container === "isSlice",
          })}
        >
          {children}
        </div>

        <About {...layout} state={about} />
        <Nav
          categoriesList={categoriesList}
          state={menu}
          closeModals={closeModals}
        />
      </div>
    </>
  )
}

const Layout = props => (
  <StaticQuery
    query={`${graphRequest}`}
    render={data => <LayoutContainer {...props} data={data} />}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
