import React, { useState ,} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import { registerRoute } from '../utils/APIRoutes';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import "../index.css"
import "./Register.css"

function Register() {

  const navigate=useNavigate();

  const [values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  });

  const errorMessage=(message)=>{
    toast.error(message,{
      position:"top-center",
      autoClose:8000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark"
    });
  }

  const handleValidation=()=>{
    const {password,confirmPassword,username,email}=values;
    if(password!==confirmPassword){
      errorMessage("Passwords dosen't match")
      return false;
    }
    else if(username.length<3){
      errorMessage("Username should be of more than 3 characters")
      return false;
    }
    else if(password.length<6){
      errorMessage("Password should be of more than 6 characters")
      return false;
    }
    else if(!email.includes(".com")){
      errorMessage("Invalid Email ID");
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {password,username,email}=values;

    
    if(handleValidation()){
      const {data}=await axios.post(registerRoute,{
        username,
        email,
        password
      })
      if(data.status===false){
        errorMessage(data.msg);
      }
      else if(data.status===true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.User))
        navigate("/setAvatar")
      }
    }
  }

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  }

  return (
    <div className='register_page'>
      <div className='register_conatiner'>
        <div className='register_conatiner_left flex'>
          <div className='brandName'>
            Viberz
          </div>
        </div>
        <div className='register_conatiner_right flex'>
          <form onSubmit={(event) => { handleSubmit(event) }} className="register_form">
            <input
              type="text"
              placeholder='Username'
              name="username"
              onChange={(e) => handleChange(e)}>
            </input>
            <br></br>
            <br></br>
            <input
              type="email"
              placeholder='Email'
              name="email"
              onChange={(e) => handleChange(e)}>
            </input>
            <br></br>
            <br></br>
            <input
              type="password"
              placeholder='Password'
              name="password"
              onChange={(e) => handleChange(e)}>
            </input>
            <br></br>
            <br></br>
            <input
              type="password"
              placeholder='Confirm Password'
              name="confirmPassword"
              onChange={(e) => handleChange(e)}>
            </input>
            <br></br>
            <br></br>
            <button type='submit' className='submit_registration'>Create User</button>
            <br></br>
            <br></br>
              <span className='regToLogin'>Already Signed up ? <Link to="/login" className='regToLoginLink'> Login</Link>
              </span>
          </form>
        </div>
      </div>
      <ToastContainer>       
      </ToastContainer>
    </div>
  )
}
export default Register