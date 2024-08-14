import React, { useState } from "react"
import "./header.css"
import { nav } from "../../data/Data"
import { Link,useHistory } from "react-router-dom"

const Header = () => {
  const [navList, setNavList] = useState(false)
  const history = useHistory();

  const handleSignIn = () =>{
    history.push('/login');
  }

  return (
    <>
      <header>
        <div className='container flex'>
          <div className='logo'>
            <h2>REAL ESTATE</h2>
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='button flex'>
            <button className='btn1'style={{backgroundColor:"gray"}} onClick={handleSignIn}>
              <i className='fa fa-sign-out'></i> Sign In
            </button>
          </div>

          <div className='toggle'>
            <button style={{backgroundColor:"gray"}} onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars' ></i>}</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
