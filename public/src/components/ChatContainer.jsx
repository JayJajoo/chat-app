import React,{useState,useEffect, useRef} from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import Input from './Input';
import axios from "axios"
import {sendMessageRoute,getMessagesRoute,delMessagesRoute} from "../utils/APIRoutes"
import {v4 as uuidv4} from "uuid"

function ChatContainer({currentChat,currentUser,socket}) {
  const scrollRef=useRef()
  const [messages,setMessages] = useState([])
  const [arrivalMessage,setArrivalMessage]=useState(null)
  const [isClickedDel,setIsClickedDel]=useState(false)
  const [delMsg,setDelMsg]=useState({
    id:undefined,
  });
  useEffect(()=>{
    const onChanegCurrentChat=async()=>{
      if(currentChat){
        const response=await axios.post(`${getMessagesRoute}`,{
          from:currentUser._id,
          to:currentChat._id,
        })
        setMessages(response.data)
      }
    }
    onChanegCurrentChat();
  },[currentChat])

  useEffect(()=>{
    const deleteMsg=async()=>{
      if(isClickedDel && delMsg.id!==undefined){
        const data=await axios.delete(`${delMessagesRoute}/${delMsg.id}`)
        if(data.data.msg){
          console.log("messages deleted")
          console.log(data.data.data)
        }
        else{
          console.log("unable to delete the message")
        }
        const newMsgs=messages.filter((msg)=>{
          if(msg.id!==delMsg.id){
            return msg
          }
        })
        setMessages(newMsgs)
        setDelMsg({
          id:undefined,
        })
      }
    }
    deleteMsg();
  },[isClickedDel,delMsg])

  const handleDelete=async(msg)=>{
    console.log(msg)
    setIsClickedDel(true);
    setDelMsg({
      id:msg.id,
    })
  }

  const handleSendMsg=async(msg)=>{
    await axios.post(`${sendMessageRoute}`,{
      from:currentUser._id,
      to:currentChat._id,
      message:msg,
    })
    socket.current.emit("send-msg",{
      to:currentChat._id,
      from:currentUser._id,
      message:msg
    })
    const msgs=[...messages]
    msgs.push({fromSelf:true,message:msg})
    setMessages(msgs)
  }

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
        setArrivalMessage({fromSelf:false,message:msg})
      })
    }
  },[])

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentChat.avatarPhoto}`} alt="avatar" />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout></Logout>
      </div>
        <div className="chat-messages">
          {
            messages.map((message)=>{
              return(
                <div ref={scrollRef} key={uuidv4()}>
                  <div className={`message ${message.fromSelf ? 'sended' : 'recieved'}`}>
                    <div className="content">
                      <p>
                        {message.message}
                      </p>
                      <div className={`del_button ${message.fromSelf ? 'visible' : 'disable'}`}>
                        <button type='button' onClick={()=>handleDelete(message)}>Del</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <Input handleSendMsg={handleSendMsg}></Input>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    height:75vh;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        display:flex;
        max-width: max-content;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
        .del_button{
          margin-left:1rem;
          flex:1;
          width:100%;
          justify-content: flex-end;
          button{
            color:white;
            background-color: transparent;
          }
        }
        p{
          flex:1;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
    .visible{
      visibility: visible;
    }
    .disable{
      width:0;
      visibility: hidden;
    }
  }
`;
export default ChatContainer