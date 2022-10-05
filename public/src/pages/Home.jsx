import React from 'react'
import "./Home.css"

export default function Home() {
  return (
    <div className='home_page'>
        <div className='home_page_container'>
            <div className='home_navbar'>
                <div className='brand_symbol'>
                        VIBERZ
                </div>
            </div>
            <div className='home_content'>
                <div className='home_left'>
                    <div className='home_brand'>
                        VIBERZ
                    </div>
                </div>
                <div className='home_right'>
                    <div className='into'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum provident aliquam saepe ea, dolore velit, dolores, dolor quam soluta nam fuga voluptatum earum ratione. Nulla necessitatibus facilis iusto deserunt voluptatibus.
                    </div>
                    <div className='buttons'>
                      <div>
                      <button className='button_reg'><a href='/register'>Register</a></button>
                      </div>
                      <div>
                      <button className='button_login'><a href='/login'>Login</a></button>
                      </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className='home_footer'>
                <div>
                    Created By :- &nbsp;&nbsp;
                    <a href='#'>Jay Jajoo</a>&nbsp;&nbsp;
                    <a href='#'>Sanidhya Agarwal</a>&nbsp;&nbsp;
                    <a href='#'>Aditya Agarwal</a>&nbsp;&nbsp;
                    <a href='#'>Rajveer Heera</a>&nbsp;&nbsp;
                    <a href='#'>Aditya Bharwadwaj</a>
                </div>
            </div>
        </div>
    </div>
  )
}
