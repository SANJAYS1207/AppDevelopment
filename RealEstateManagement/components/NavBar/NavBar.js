import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from './logo.png';
import Modal from 'react-modal';
import Login from '../Loginform/Login';
import Register from '../RegisterForm/Register';
import './NavBar.css';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const navigate = useNavigate();

  const handleButton = () => {
    setIsModalOpen(true);
  };

  Modal.setAppElement('#root');
  const closeModal = () => {
    setIsModalOpen(false);
    setShowLogin(true);
  };

  const location = useLocation();
  const [activePath, setActivePath] = useState('/');

  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAdminClick = () => {
    navigate('/adminlogin');
    setOpenAdmin(!openAdmin);
  };

  const handleUserClick = () => {
    navigate('/');
    setOpenUser(!openUser);
  };


  return (
    <div className='nav_1'>
      <nav>
        <div className='menu-icon' onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div id='img_edit'>
          <img id='logo' src={logo} alt="Logo" />
        </div>
        <ul className='nav-links'>
          <li className='nav-item'>
            <a href="/" className={activePath === '/' ? 'active' : ''}>Home</a>
          </li>
          <li className='nav-item'>
            <a href="/buy" className={activePath === '/buy' ? 'active' : ''}>Buy</a>
          </li>
          <li className='nav-item'>
            <a href="/rent" className={activePath === '/rent' ? 'active' : ''}>Rent</a>
          </li>
          <li className='nav-item'>
            <a href="/sell" className={activePath === '/sell' ? 'active' : ''}>Sell</a>
          </li>
        </ul>
        <button onClick={handleButton} className='home_login'>Login/SignUp</button>
      </nav>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={handleAdminClick}>
            <div className="sidebar-item">
              Admin
              {openAdmin ? <FaTimes /> : <FaBars />}
            </div>
            {openAdmin && (
              <ul className="sidebar-submenu">
                <li><a href="/adminlogin">Manage</a></li>
              </ul>
            )}
          </li>
          <li onClick={handleUserClick}>
            <div className="sidebar-item">
              User
              {openUser ? <FaTimes /> : <FaBars />}
            </div>
            {openUser && (
              <ul className="sidebar-submenu">
                <li><a href="/sell">Sell</a></li>
                <li><a href="/rent">Rent</a></li>
                <li><a href="/buy">Buy</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal} className='close-modal'>X</button>
        {showLogin ? (
          <Login switchToRegister={() => setShowLogin(false)} />
        ) : (
          <Register />
        )}
      </Modal>
    </div>
  );
};

export default Navbar;
