import { useState, createContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(()=>localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")):null);
  const [authTokens, setAuthTokens] = useState(()=>localStorage.getItem("authTokens")? JSON.parse(localStorage.getItem("authTokens")):null);
  const navigate = useNavigate();
  const [loading,setLoading]=useState(true)

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("Form was submitted");
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "username": e.target.username.value, "password": e.target.password.value })
    });

    if (response.ok) {
      const data = await response.json();
      setAuthTokens(data);
      const decodedUser = jwt_decode(data.access);
      setUser(decodedUser);
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  }

  const logoutUser=()=>{
    setUser(null)
    setAuthTokens(null)
    localStorage.removeItem("authTokens")
    navigate("/login")
  }
  const updateToken= async(e)=>{

    console.log("Update token called !");
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "refresh":authTokens?.refresh})
    });    
    
    const data= await response.json();
    if (response.status === 200){
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } 
    else {
      logoutUser()
    }

    if (loading){
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    
    if (loading){
      updateToken()
    }



    let fourMinutes= 1000 *60 * 4
   let interval=setInterval(()=>{
    if(authTokens){ 
       updateToken()
    }
   },fourMinutes)
   return ()=>clearInterval(interval)
  },[authTokens,loading])

  return (
    <AuthContext.Provider value={{ user, loginUser,logoutUser,authTokens}}>
      { loading ? null: children}
    </AuthContext.Provider>
  );
}
