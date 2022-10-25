import React from 'react'
import styled from "styled-components"
import { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import {allUsersRoute} from "../utils/APIRoutes"
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
function Chat() {

  const navigate=useNavigate();

  const [contacts,setConatcts]=useState([])
  const [currentUser,setCurrentUser]=useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded,setIsLoaded]=useState(false)
  const [currentChatIsLoaded,setCurrentChatIsLoaded]=useState(false)
  const handleChatChange=(chat)=>{
    setCurrentChat(chat)
    setCurrentChatIsLoaded(true)
  }

  useEffect(()=>{
    try{
      const checkCurrentUser=async()=>{
        if(!localStorage.getItem("chat-app-user")){
          navigate("/login") 
        }
        else{
          setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")))
          setIsLoaded(true)
        }
      }
      checkCurrentUser();
    }catch(err){
      console.log(err)
    }
  },[])

  useEffect(()=>{
    try {
      const fetchUsers=async()=>{
        if(currentUser){
          if(currentUser.isAvatarPhotoSet){
            const data=await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setConatcts(data.data) 
          }
          else{
            navigate("/setAvatar")
          }
        }
      }
      fetchUsers();
    } catch (error) {
      console.log(error)
    }
  },[currentUser])

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}></Contacts>
        {isLoaded && currentChat===undefined ?
          <Welcome currentUser={currentUser}></Welcome> 
          :
          currentChatIsLoaded && <ChatContainer currentChat={currentChat}></ChatContainer>
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat