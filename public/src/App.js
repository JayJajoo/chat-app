import React from 'react'
import {BrowserRouter,Route, Routes} from "react-router-dom"
import Register from "./pages/Register"
import Chat  from "./pages/Chat"
import Login from "./pages/Login"
import Home from "./pages/Home"
import SetAvatar from './components/SetAvatar'

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path="/setAvatar" element={<SetAvatar/>}></Route>
      <Route path='/chat' element={<Chat/>}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App