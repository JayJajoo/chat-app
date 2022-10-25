import React,{useState} from 'react'
import styled from 'styled-components'
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
function Input({handleSendMsg}) {
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
    </Container> 
  )
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom:0.3rem;
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
  .input-container {
    width: 90%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
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