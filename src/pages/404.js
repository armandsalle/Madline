import React from "react"
import Layout from "../hoc/layout"
import { Link } from "gatsby"
import Helmet from "react-helmet"

const NotFoundPage = () => (
  <>
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <Layout seo={{ title: "Madline Vslr - 404" }}>
      <div className="page-404">
        <h1>Page non trouvée</h1>
        <Link to="/">Retour à la page d'accueil</Link>
      </div>
    </Layout>
  </>
)

export default NotFoundPage
