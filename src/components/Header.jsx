import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { useContext } from "react"


const Header = () => {
  const {user,logoutUser}= useContext(AuthContext)
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <span>  |  </span>
      {user ?( <a onClick={logoutUser}>Logout</a>):
      (
        <Link to={"/login"}>Login</Link>
      )
      }
  
      {user && <p>Hello, {user.username} </p>}
    
    </div>
  )
}

export default Header
