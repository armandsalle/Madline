import React, { useState } from "react"

const defaultState = {
  seo: {},
  setSeo: () => {},
}

export const SeoContext = React.createContext(defaultState)

export const SeoProvider = ({ children }) => {
  const [seo, setSeo] = useState({})

  return (
    <SeoContext.Provider
      value={{
        seo,
        setSeo,
      }}
    >
      {children}
    </SeoContext.Provider>
  )
}
