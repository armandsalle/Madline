import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import cn from "classnames"
import "../style/main.scss"
import About from "../components/about"
import Nav from "../components/nav"
import Helmet from "react-helmet"

const Layout = ({ children, isLarge, isGallery, isSlice, seo }) => {
  const data = useStaticQuery(graphql`
    {
      prismic {
        layout: layout(uid: "layout", lang: "fr-fr") {
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

  const {
    prismic: { layout, categories },
  } = data

  console.log(layout)

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
    <>
      <Helmet>
        <title>{seo?.title ? seo?.title : layout?.siteTitle}</title>
        <meta
          name="description"
          content={
            seo?.description ? seo?.description : layout?.siteDescription
          }
        />
        <meta property="og:image" content="/og/image-1200x630.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <div className="layout">
        <Link to="/" className="header__logo" onClick={closeModals}>
          <img src={layout.logo.url} alt={layout.logo?.alt} />
        </Link>

        {!menu.clicked && (
          <button
            disabled={disableAbout}
            className="header__about"
            onClick={handleAbout}
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
            large: isLarge,
            gallery: isGallery,
            slice: isSlice,
          })}
        >
          {children}
        </div>

        <About {...layout} state={about} />
        <Nav categoriesList={categoriesList} state={menu} />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
