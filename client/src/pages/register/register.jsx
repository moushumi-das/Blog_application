import "./register.css";
import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";


export default function Register() {
  const [username,setUser]=useState({})
  const [email,setEmail]=useState({})
  const [password,setPassword]=useState({})
  const [error,setError]=useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    try{
      const response= await axios.post("auth/register", {
        username,
        email,
        password,
      });
      response.data && window.location.replace("/login")
    } catch (error){
      setError(true);
      console.log(error)
    }
   
    
  };
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="namedInput">Username</label>
        <input name="username" onChange={e => setUser(e.target.value)}  className="InputDetails" type="text" placeholder="Enter your username..." />
        <label htmlFor="emailInput">Email</label>
        <input name="email" onChange={e => setEmail(e.target.value)}  className="InputDetails" type="text" placeholder="Enter your email..." />
        <label htmlFor="passwordInput">Password</label>
        <input name="password" onChange={e => setPassword(e.target.value)} className="InputDetails" type="password" placeholder="Enter your password..." />
        <button className="registerButton" type="submit">Register</button>
      </form>
        <button className="registerLoginButton">
          <Link className="link" to="/login">
               LOGIN
          </Link>
        </button>
        {error && <span style={{marginTop:"10px"}}>User might already existed</span>}

    </div>
    )
}