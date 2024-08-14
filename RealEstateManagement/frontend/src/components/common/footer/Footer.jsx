import React from "react"
import { footer } from "../../data/Data"
import "./footer.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Footer = () => {

  const history = useHistory();
  const handleContactClick = () => {
    history.push('/contact');
  };
  return (
    <>
      <section className='footerContact'>
        <div className='container'>
          <div className='send flex'>
            <div className='text'>
              <h1>Do You Have Questions ?</h1>
              <p>We'll help you to grow your career and growth.</p>
            </div>
            <button className='btn5' style={{color:"gray"}} onClick={handleContactClick}>Contact Us Today</button>
          </div>
        </div>
      </section>

      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
              <h2>REAL ESTATE</h2>
              <h2>Do You Need Help With Anything?</h2>
              <p>Receive updates, hot deals, tutorials, discounts sent straignt in your inbox every month</p>

              <div className='input flex'>
                <input type='text' placeholder='Email Address' />
                <button style={{backgroundColor:"gray"}}>Subscribe</button>
              </div>
            </div>
          </div>

          {footer.map((val) => (
            <div className='box'>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className='legal'>
        <span>© 2024 RealEstate By Sanjay</span>
      </div>
    </>
  )
}

export default Footer
