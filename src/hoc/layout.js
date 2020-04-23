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
        layout: layout(lang: "fr-fr", uid: "layout") {
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
    console.log("clicker")
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
        <html lang="fr" />
        <title>{seo?.title ? seo?.title : layout?.siteTitle}</title>
        <meta
          name="description"
          content={seo?.desc ? seo?.desc : layout?.siteDescription}
        />
        <link rel="canonical" href="madlinevslr.com" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="madlinevslr.com" />
        <meta
          property="og:title"
          content={seo?.title ? seo?.title : layout?.siteTitle}
        />
        <meta
          property="og:description"
          content={seo?.desc ? seo?.desc : layout?.siteDescription}
        />
        <meta property="og:image" content="/image-1200x630.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Helmet>

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
  isLarge: PropTypes.bool,
  isGallery: PropTypes.bool,
  isSlice: PropTypes.bool,
  seo: PropTypes.object,
}

export default Layout
