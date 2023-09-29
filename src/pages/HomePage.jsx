import {useState,useEffect,useContext} from 'react'
import AutContext from '../context/AuthContext'

const HomePage = () => {
  const [notes,setNotes]=useState([])
  const {authTokens,logoutUser}=useContext(AutContext)

  const getNotes=async()=>{

    const response=await fetch("http://localhost:8000/api/notes/",{
      method:"GET",
      headers:{
         "Content-Type":"application/json",
         "Authorization":`Bearer ${authTokens.access}`
      }
    })
    const data= await response.json()
    if (response.status === 200){

      setNotes(data)
    }
    else if (response.statusText ==="Unauthorized"){
   logoutUser()
    }
  }

  useEffect(()=>{
    
   getNotes()
  },[])

  return (
    <div>
      <p>Hello you are logged in to the home page</p>

     <ul>

      {notes.map((note)=>(
        <li key={note.id}>{note.body}</li>
      ))}
     </ul>
    </div>
  )
}

export default HomePage
