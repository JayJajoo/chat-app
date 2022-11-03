import React,{useState} from 'react'
import styled from 'styled-components'
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import axios from "axios"
import {getSavedMessagesRoute} from "../utils/APIRoutes"
import {BsEmojiSmileFill} from "react-icons/bs"
import {MdSavedSearch} from "react-icons/md"
import {AiOutlineArrowRight} from "react-icons/ai"

function Input({handleSendMsg,currentChat,currentUser}) {
  const [showSavedMsg,setShowSavedMsg]=useState(false)
  const [savedMsg,setSavedMsg]=useState([])
  const [showEmojis,setShowEmojis]=useState(false)
  const [msg,setMsg] = useState("")

  
  const handleEmojis=()=>{
    setShowEmojis(!showEmojis)
  }

  const handleEmojiClick=(emoji)=>{
    let message=msg;
    message+=emoji.emoji;
    setMsg(message)
  }

  const sendChat=(e)=>{
    e.preventDefault();
    if(msg.length>0){
      handleSendMsg(msg)
      setMsg('')
    }
  }

  const handleGetSavedMsg=async()=>{
    const data=await axios.post(`${getSavedMessagesRoute}`,{
      from:currentUser._id,
      to:currentChat._id,
    })
    setShowSavedMsg(true)
    setSavedMsg(data.data)
    document.getElementById("contentBlurToogle").style.filter="blur(10px)"
  }

  const disableBlur=()=>{
    setShowSavedMsg(false)
    document.getElementById("contentBlurToogle").style.filter="blur(0)"
  }

  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojis}></BsEmojiSmileFill>
                <div className="emoji-placement">
                  {
                    showEmojis && <Picker onEmojiClick={handleEmojiClick}></Picker>
                  }
                </div>
            </div>
        </div>
        <form className="input-container" onSubmit={(e)=>sendChat(e)}>
            <input type="text" 
              placeholder="Type your message here" 
              value={msg} 
              onChange={(e)=>{setMsg(e.target.value)}}
            />
            <button className="submit">
                <IoMdSend></IoMdSend>
            </button>
        </form>
        <button className='saved_messaged_button' onClick={()=>handleGetSavedMsg()}><MdSavedSearch></MdSavedSearch></button>
        {
          showSavedMsg &&
          <div id="savedInformation">
          { 
            savedMsg.map((msg)=>{
              return (
                <div className='message'>
                  <div className="messageInfo">
                    <div className="senderInfo">
                      <span className="avatar">
                        <img src={`data:image/svg+xml;base64,${msg.senderPhoto}`} alt="avatar" />
                      </span>
                      <span className='sender'>{msg.senderName}</span>
                    </div>
                    <span className='arrow'><AiOutlineArrowRight></AiOutlineArrowRight></span>
                    <div className="recieverInfo">
                    <span className="avatar">
                      <img src={`data:image/svg+xml;base64,${msg.recieverPhoto}`} alt="avatar" />
                    </span>
                    <span className='reciever'>{msg.recieverName}</span>
                    </div>
                  </div>
                  <div className="messageContent">{msg.message}</div>
                </div>
              )
            })
          }
          <button id="closeSavedInfoButton" onClick={()=>disableBlur()}>Close</button>
        </div> 
        }
    </Container> 
  )
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 90% 5%;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom:0.3rem;
  #savedInformation{
    border:5px solid #9a86f3;
    border-radius:10px;
    top:17%;
    background:transparent;
    position:absolute;
    margin-left:auto;
    margin-right:auto;
    height:70vh;
    width:55vw;
    opacity:1;
    padding-top:1rem;
    padding-left:1rem;
    padding-right:3rem;
    padding-bottom:1rem;
    color:white;
    overflow-y:scroll;
    overflow-x:hidden;
    @media screen and (min-width: 600px) and (max-width: 1080px) {
      height:70vh;
      width:50vw;
    }
    .message{
      background:transparent;
      padding:1rem 1rem;
      margin:1rem 1rem;
      width:100%;
      border:3px solid #9a86f3;
      border-radius:20px;
      .messageInfo{
        overflow-x:hidden;
        display:flex;
        align-items: center;
        letter-spacing:0.1rem;
        font-size:1.3rem;
        margin-bottom:0.5rem;
        .senderInfo{
          align-items:center;
          display:flex;
          .avatar {
            img {
              height: 3rem;
              margin-right:1rem;
            }
          }
          .sender{
            margin-right:1rem;
            font-weight:bolder;
            color:#32a879;
          }
        }
        .arrow{
          margin-right:1rem;
          color:#96173d;
        }
        .recieverInfo{
          align-items:center;
          display:flex;
          .avatar {
            img {
              height: 3rem;
              margin-right:1rem;
            }
          }
          .reciever{
            width:100%;
            margin-right:1rem;
            letter-spacing:0.1rem;
            font-weight:bolder;
            color:#3294a8;
          }
        }
      }
      .messageContent{
        margin-left:3rem;
        font-weight:bolder;
        color:#c7580e;
      }  
    }
    #closeSavedInfoButton{
      padding:0.5rem 0;
      width:15vw;
      background:none;
      color:white;
      border:3px solid #b05454;
      border-radius:5px;
      margin-left:40%;
    }
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        margin-left:1rem;
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-placement{
        position:absolute;
        height:max-content;
        left:0px;
        top:-470px;
      }
    }
  }
  .saved_messaged_button{
    padding-top:8px;
    border:5px solid #9a86f3;
    border-radius:5px;
    color:violet;
    background:transparent;
    margin-left:-3rem;
    font-size:1.2rem;
  }
  .input-container {
    width: 90%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 100%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default Input