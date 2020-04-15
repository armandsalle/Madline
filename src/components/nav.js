import React, { useRef, useState, useEffect } from "react"
import { Link } from "gatsby"
import gsap from "gsap"

const Nav = ({ categoriesList, state }) => {
  const nav = useRef(null)
  const categoriesUl = useRef(null)

  const [hasCategoriesVisible, setCategoriesVisible] = useState(false)

  const showMenu = () => {
    gsap.set(".nav", { display: "flex", opacity: 0 })
    gsap.set([".nav__list li p", ".nav__list li a"], {
      opacity: 0,
      y: 100,
    })

    const tl = gsap.timeline({ paused: true })
    tl.to(".nav", { opacity: 1, duration: 0.2, ease: "power3.inOut" }).to(
      [".nav__list li p", ".nav__list li a"],
      {
        opacity: 1,
        y: 0,
        stagger: {
          amount: 0.15,
        },
        ease: "power3.inOut",
        duration: 0.5,
      }
    )

    return tl
  }

  const hideMenu = () => {
    const tl = gsap.timeline({ paused: true })
    tl.to([".nav__list li p", ".nav__list li a"], {
      opacity: 0,
      stagger: {
        amount: 0.15,
      },
      ease: "power3.inOut",
      duration: 0.3,
    })
      .to(".nav", { opacity: 0, duration: 0.2, ease: "power3.inOut" })
      .set(".nav", { display: "none" })

    return tl
  }

  const hideCat = () => {
    const tl = gsap.timeline({ paused: true })
    tl.to(categoriesUl.current.children, {
      opacity: 0,
      x: -50,
      stagger: {
        amount: 0.05,
      },
      duration: 0.35,
    })
      .to(
        ".nav__gallery p",
        {
          x: 0,
        },
        "-=0.3"
      )
      .set(categoriesUl.current, {
        display: "none",
      })
    tl.set(categoriesUl.current.children, {
      opacity: 1,
      x: 0,
    })

    return tl
  }

  const showCat = () => {
    const v = +(
      document.querySelector(".nav__gallery").clientWidth -
      document.querySelector(".gallery-titre").clientWidth
    )

    const tl = gsap.timeline({ paused: true })
    tl.to(categoriesUl.current, {
      display: "block",
      opacity: 1,
      duration: 0,
    })
      .to(".nav__gallery p", {
        x: `${v}px`,
      })
      .from(
        categoriesUl.current.children,
        {
          x: -100,
          opacity: 0,
          stagger: {
            amount: 0.05,
          },
          duration: 0.35,
        },
        "-=0.35"
      )

    return tl
  }

  useEffect(() => {
    if (state.clicked === false) {
      if (hasCategoriesVisible) {
        if (window.innerWidth >= 700) {
          hideCat().play()
        }

        setCategoriesVisible(false)
      }
      hideMenu().play()
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      showMenu().play()
    }
  }, [state.clicked, state.initial])

  const handleCategories = () => {
    if (hasCategoriesVisible) {
      return
    } else {
      if (window.innerWidth >= 700) {
        showCat().play()
      }
    }
    setCategoriesVisible(true)
  }

  return (
    <nav ref={nav} className="nav">
      <ul className="nav__list">
        <li className="nav__gallery">
          <p className="gallery-titre" onMouseEnter={handleCategories}>
            Galerie
          </p>
          <ul ref={categoriesUl}>
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
  )
}

export default Nav
