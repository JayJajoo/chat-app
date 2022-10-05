import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { loginRoute } from '../utils/APIRoutes';
import axios from 'axios'
import "./Login.css"
import "../index.css"

function Login() {


  const navigate=useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate("/chat");
    }
  },[])

  const [values,setValues]=useState({
    username:"",
    password:""
  })
  
  const errorMessage=(message)=>{
    toast.error(message,{
      position:"top-center",
      autoClose:8000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark"
    });
  }

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  }

  const handleSubmit=async (event)=>{
    event.preventDefault();
    const {username,password}=values;
    console.log(password)
    try{
      const {data} = await axios.post(loginRoute,{
        username,
        password
      })
      if(data.status===true){
        localStorage.setItem("chat-app-user",JSON.stringify(data.person));
        navigate("/chat")
      }
      else{
        errorMessage(data.msg);
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='loginPage'>
      <div className='login_container'>
        <div className='login_left flex'>
          <div className='brand'>
            Viberz
          </div>
        </div>
        <div className='login_right flex'>
          <div className='login_right_content'>
            <div class="login_title">Login</div>
            <br />
            <form onSubmit={(event)=>handleSubmit(event)}>
              <input 
                name="username"
                type="text"
                placeholder='Username'
                onChange={(e)=>handleChange(e)}
              ></input>
              <br /><br />
              <input 
                name="password"
                type="password"
                placeholder='Password'
                onChange={(e)=>handleChange(e)}
              ></input>
              <br /><br />
              <button type="submit"
                className='submit_login'
              >Login</button>
              <br /><br />
            </form>
            <Link to="/login">Forgot Password </Link>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default Login