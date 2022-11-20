const Login = ({username, password, handleChangeUserName, handleChangePassword, handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        <div>
        username: <input value={username} onChange={handleChangeUserName}/>
        </div>
        <div>
        password: <input value={password} onChange={handleChangePassword}/>
        </div>
        <div>
        <button type="submit">login</button>
        </div>
    </form> 
  )
  
export default Login