import React, { useEffect } from "react"
import PropTypes from "prop-types"
import gsap from "gsap"

const Login = ({
  onSubmit,
  onChange,
  isDisabled,
  clientPassword,
  hasError,
}) => {
  useEffect(() => {
    gsap.to(".login h1", {
      opacity: 1,
      duration: 0.4,
    })
    gsap.to([".login__form input", ".login__form button"], {
      y: 0,
      stagger: {
        amount: 0.1,
      },
      duration: 0.4,
    })
  }, [])

  return (
    <div className="login">
      <h1>Connectez-vous</h1>
      <form className="login__form overflow-hidden" onSubmit={e => onSubmit(e)}>
        <input
          type="password"
          placeholder="Mot de passe"
          value={clientPassword}
          onChange={e => onChange(e)}
        />
        <button disabled={isDisabled}>
          <svg
            width="7"
            height="13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs />
            <path d="M1 1l5 5.5L1 12" stroke="#24211C" />
          </svg>
        </button>
        {hasError && <div>Mot de passe incorrect</div>}
      </form>
    </div>
  )
}

Login.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  clientPassword: PropTypes.string,
  hasError: PropTypes.bool,
}

export default Login
