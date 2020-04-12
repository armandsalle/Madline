import React from "react"
import { Link } from "gatsby"
import cn from "classnames"

const Nav = ({ categoriesList, open }) => {
  return (
    <nav className={cn("nav", { visible: open })}>
      <ul className="nav__list">
        <li className="nav__gallery">
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
  )
}

export default Nav
