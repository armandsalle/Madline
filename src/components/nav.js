import React, { useRef, useState, useEffect } from "react"
import { Link } from "gatsby"
import gsap from "gsap"

const Nav = ({ categoriesList, state }) => {
  const nav = useRef(null)
  const categoriesUl = useRef(null)

  const [hasCategoriesVisible, setCategoriesVisible] = useState(false)

  useEffect(() => {
    if (state.clicked === false) {
      if (hasCategoriesVisible) {
        const tl = gsap.timeline()

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
        setCategoriesVisible(false)
      }
      const tl = gsap.timeline()
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
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      gsap.set(".nav", { display: "flex", opacity: 0 })
      gsap.set([".nav__list li p", ".nav__list li a"], {
        opacity: 0,
        y: 100,
      })

      const tl = gsap.timeline()
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
    }
  }, [state.clicked, state.initial])

  const handleCategories = () => {
    if (hasCategoriesVisible) {
      const tl = gsap.timeline()

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
      setCategoriesVisible(false)
    } else {
      const v = +(
        document.querySelector(".nav__gallery").clientWidth -
        document.querySelector(".gallery-titre").clientWidth
      )

      const tl = gsap.timeline()

      tl.set(categoriesUl.current, {
        display: "block",
      })
        .set(categoriesUl.current.children, {
          x: -100,
          opacity: 0,
        })
        .to(".nav__gallery p", {
          x: `${v}px`,
        })
        .to(
          categoriesUl.current.children,
          {
            opacity: 1,
            x: 0,
            stagger: {
              amount: 0.05,
            },
            duration: 0.35,
          },
          "-=0.35"
        )

      setCategoriesVisible(true)
    }
  }

  return (
    <nav ref={nav} className="nav">
      <ul className="nav__list">
        <li className="nav__gallery" onClick={handleCategories}>
          <p className="gallery-titre">Galerie</p>
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
