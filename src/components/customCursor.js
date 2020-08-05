import React, { useEffect, useRef, useContext } from "react"
import cn from "classnames"
import { CursorContext } from "../context/cursorContext"

const followCursor = ({ clientX, clientY }, el) => {
  el.style.transform = `translate(${clientX - 15}px, ${clientY - 17.5}px )`
}

const CustomCursor = () => {
  const { cursor } = useContext(CursorContext)
  const cursorTag = useRef(null)

  useEffect(() => {
    const el = cursorTag.current
    document.addEventListener("mousemove", e => followCursor(e, el))
    return () => {
      document.removeEventListener("mousemove", e => followCursor(e, el))
    }
  }, [cursorTag])

  return (
    <div className="cursor-wrapper">
      <svg
        ref={cursorTag}
        className={cn("custom-cursor", !!cursor && "active")}
        width="30"
        height="35"
        viewBox="0 0 305 355"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M127.143 3.08968e-05L127.143 253.571L38.3932 164.821L0.357766 202.857L152.5 355L304.643 202.857L266.608 164.822L177.857 253.571L177.857 2.868e-05L127.143 3.08968e-05Z"
          fill="#24211C"
        />
      </svg>
    </div>
  )
}

export default CustomCursor
