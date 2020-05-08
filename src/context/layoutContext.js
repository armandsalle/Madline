import React, { useState } from "react"

const defaultState = {
  container: "",
  setContainer: () => {},
}

export const LayoutContext = React.createContext(defaultState)

export const LayoutProvider = ({ children }) => {
  const [container, setContainer] = useState("")

  return (
    <LayoutContext.Provider
      value={{
        container,
        setContainer,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
