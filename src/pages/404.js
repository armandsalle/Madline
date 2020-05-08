import React, { useContext, useEffect } from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"
import { LayoutContext } from "../context/layoutContext"
import { SeoContext } from "../context/seoContext"

const NotFoundPage = () => {
  const { setContainer } = useContext(LayoutContext)
  const { setSeo } = useContext(SeoContext)

  useEffect(() => {
    setContainer("")
    setSeo({ title: "Madline Vslr - 404" })
  }, [setContainer, setSeo])

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="page-404">
        <h1>Page non trouvée</h1>
        <Link to="/">Retour à la page d'accueil</Link>
      </div>
    </>
  )
}

export default NotFoundPage
