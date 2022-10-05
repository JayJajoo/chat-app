import React, { useEffect } from 'react'
import Contacts from "../components/Contacts"
import "./Chat.css"
function Chat() {

  return (
    <div className='chat_page'>
      <div className='chat_container'>
        <div className='aside'>
          <div className='symbol'>VIBERZ</div>
          <div className='friends'>
            <Contacts name={"Jay Jajoo"}></Contacts>
            <Contacts name={"Aditya Agarwal"}></Contacts>
            <Contacts name={"Aditya Bharadwaj"}></Contacts>
            <Contacts name={"Rajveer Heera"}></Contacts>
            <Contacts name={"Sanidhya Agarwal"}></Contacts>
          </div>
          <div className='user_name'>Jay Jajoo</div>
        </div>
        <div className='main_content'>
          <div className="text_area">

          </div>
          <div className='message_editor'>
            <div className='input'>
              <div>
                <input  className='input_message' type="text" placeholder='type your message here'></input>
              </div>
              <div> 
                <button class="send_message" type='submit'>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat