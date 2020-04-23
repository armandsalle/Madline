import React from "react"
import PropTypes from "prop-types"

const Login = ({ onSubmit, onChange, isDisabled, clientPassword }) => {
  return (
    <div className="login">
      <h1>Connectez-vous</h1>
      <form className="login__form" onSubmit={e => onSubmit(e)}>
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
      </form>
    </div>
  )
}

Login.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  clientPassword: PropTypes.string,
}

export default Login
