import { useContext } from "react"
import AuthContext from "../context/AuthContext"
const LoginPage = () => {
  const {loginUser}= useContext(AuthContext)
  return (
    <div>
      <form onSubmit={loginUser}>

        <input type="text" name="username" placeholder='Enter your Username ...'/>
        <input type="password" name="password" placeholder='Enter a corresponding password ...'/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default LoginPage
