import React, { useState } from "react"

const defaultState = {
  cursor: false,
  setCursor: () => {},
}

export const CursorContext = React.createContext(defaultState)

export const CursorProvider = ({ children }) => {
  const [cursor, setCursor] = useState(false)

  return (
    <CursorContext.Provider
      value={{
        cursor,
        setCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  )
}
