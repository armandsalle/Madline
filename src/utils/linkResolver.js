export const linkResolver = doc => {
  // URL for a category type
  if (doc.type === "accueil") {
    return `/`
  }

  // URL for a page type
  if (doc.type === "galerie") {
    return `/gallery`
  }

  // URL for a page type
  if (doc.type === "services") {
    return `/services`
  }

  // URL for a page type
  if (doc.type === "contact") {
    return `/contact`
  }

  // URL for a product type
  if (doc.type === "projet") {
    return `/gallery/${doc.uid}`
  }

  // URL for a product type
  if (doc.type === "privee") {
    return `/private/${doc.uid}`
  }

  // Backup for all other types
  return "/"
}
