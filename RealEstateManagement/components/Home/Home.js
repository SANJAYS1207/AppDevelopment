import React, { useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


const Home = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.slide-in2');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className='other'>
        <p className='content_intro'>
          Discover the future of real estate management with&nbsp;
          <span className='company_name' onClick={() => navigate('/home1')}>
            CHECK YOUR PROPERTIES
          </span>. <br/>
          Our app provides a seamless platform for tracking and managing all your properties, <br/>
          ensuring you stay organized and on top of your real estate investments. <br/>
          Say goodbye to the hassle of traditional property management and <br/>
          hello to smart, efficient solutions.
        </p>
        
      </div>
      <section className='section1'>
        <header className="header">
          <h1>Welcome to Real Estate Management System</h1>
        </header>
        <section className="intro">
          <h1>Manage your properties efficiently and effortlessly with our comprehensive <br/>suite of tools designed for property owners and managers.</h1>
        </section>
        <div className="content-section">
          <div className="content slide-in2">
            <h2 className='head-content'>Land for Sale</h2>
            <p className='para-content'>Discover prime land for sale in your preferred area, perfect for your next project or investment. Our detailed listings and advanced search options make it easy to find the ideal plot that meets your specifications. Secure your future with the perfect piece of land today.</p>
          </div>
          <div className="image">
            <img className="img-con" src="http://ts2.mm.bing.net/th?id=OIP.s-QaGntkit33x21VK1UDqAHaEK&pid=15.1" alt="Land for Sale" />
          </div>
        </div>
        <div className="content-section">
          <div className="content slide-in2">
            <h2 className='head-content'>Houses for Rent</h2>
            <p className='para-content'>Find your ideal rental home at an unbeatable price in the location you desire. Our extensive listings and user-friendly search features ensure you discover the perfect rental property tailored to your needs. Experience hassle-free leasing with our comprehensive rental management system.</p>
          </div>
          <div className="image">
            <img className="img-con" src="http://ts2.mm.bing.net/th?id=OIP.s-QaGntkit33x21VK1UDqAHaEK&pid=15.1" alt="Houses for Rent" />
          </div>
        </div>
        <div className="content-section">
          <div className="content slide-in2">
            <h2 className='head-content'>Houses for Sale</h2>
            <p className='para-content'>Explore our exclusive listings of houses for sale, offering exceptional value in sought-after neighborhoods. With our comprehensive search tools and expert guidance, finding your dream home has never been easier. Invest in your future with a home that perfectly suits your lifestyle.</p>
          </div>
          <div className="image">
            <img className="img-con" src="http://ts2.mm.bing.net/th?id=OIP.s-QaGntkit33x21VK1UDqAHaEK&pid=15.1" alt="Houses for Sale" />
          </div>
        </div>
      </section>
      <section className="footer">
        <div className='footer-content'>
          <div className='footer-section about'>
            <h2>About Us</h2>
            <p>We are dedicated to providing the best real estate management solutions for our clients, ensuring efficiency and ease in managing properties.</p>
          </div>
          <div className='footer-section contact'>
            <h2>Contact Us</h2>
            <p>Email: info@realestate.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Real Estate Ave, Suite 100, City, State, ZIP</p>
          </div>
          <div className='footer-section social'>
            <h2>Follow Us</h2>
            <div className='social-icons'>
              <a href='https://www.facebook.com'><FaFacebook /></a>
              <a href='https://www.twitter.com'><FaTwitter /></a>
              <a href='https://www.instagram.com'><FaInstagram /></a>
              <a href='https://www.linkedin.com'><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>&copy; 2024 Real Estate Management. All Rights Reserved.</p>
        </div>
      </section>
    </>
  );
};

export default Home;
