import React from 'react'
import { useState ,useEffect} from 'react';
import styled from 'styled-components'
import Logo from "../assets/logo.svg";


function Contacts({contacts,currentUser,changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage,setCurrentImage] = useState(undefined);
  const [currentSelected,setCurrentSelected]=useState(undefined)

  const changeCurrentChat=(index,contact)=>{
    setCurrentSelected(index)
    changeChat(contact)
  }

  useEffect(() => {
    if(currentUser){
      setCurrentUserName(currentUser.username)
      setCurrentImage(currentUser.avatarPhoto)
    }
  },[currentUser]);


  return (
  <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h4>Viberz</h4>
          </div>
          <div className="contacts">
            {
              contacts.map((contact,index)=>{
                return(
                  <div className={`contact ${index===currentSelected ? 'selected':''}`}
                    key={index}
                    onClick={()=>changeCurrentChat(index,contact)}
                    >
                    <div className="avatar">
                      <img src={`data:image/svg+xml;base64,${contact.avatarPhoto}`} alt="avatar" />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand{
    margin-top:-0.05rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    img {
      height: 4rem;
    }
    h4 {
      color: chartreuse;
      text-transform: uppercase;
    }
  }
  .contacts {
    margin-top:2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          letter-spacing:0.05rem;
          color: black;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts