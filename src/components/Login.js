import PropTypes from 'prop-types'

const Login = ({ username, password, handleChangeUserName, handleChangePassword, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      username: <input id='username' value={username} onChange={handleChangeUserName} />
    </div>
    <div>
      password: <input id='password' value={password} onChange={handleChangePassword} />
    </div>
    <div>
      <button id='login-button' type='submit'>login</button>
    </div>
  </form>
)

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeUserName: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login
