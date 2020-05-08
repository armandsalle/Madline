import React, { useContext, useEffect } from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"
import { LayoutContext } from "../context/layoutContext"

const NotFoundPage = () => {
  const { setContainer } = useContext(LayoutContext)

  useEffect(() => {
    setContainer("")
  }, [setContainer])

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* <Layout seo={{ title: "Madline Vslr - 404" }}> */}
      <div className="page-404">
        <h1>Page non trouvée</h1>
        <Link to="/">Retour à la page d'accueil</Link>
      </div>
      {/* </Layout> */}
    </>
  )
}

export default NotFoundPage
