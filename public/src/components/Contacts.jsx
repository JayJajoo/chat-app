import React from 'react'
import "./Contacts.css"

function Contacts({name}) {
  return (
    <div>
      <div className='contact'>
        <div className='cnt_img'>
        </div>
        <div className='cnt_name'>{name}</div>
      </div>
    </div>
  )
}

export default Contacts