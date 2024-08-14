// import React, { useState } from 'react';
// import axios from 'axios';
// import RegisterForm from './RegisterForm';
// import "../signin/SignInForm.css";
// // import { useHistory } from 'react-router-dom';

// const SignInForm = ({ onAdminLogin, onUserLogin }) => {
//   const [userData, setUserData] = useState({ email: "", password: "" });
//   const [role, setRole] = useState('user');
//   const [user, setUser ]= useState('');
//   const [userstatus, setUserstatus ]= useState(null);
//   const [isRegistering, setIsRegistering] = useState(false);
//   // const history = useHistory();

//   const handleLogin = () => {
//     const { email, password } = userData;
//     console.log(userData);
//     if (!email || !password) {
//       alert('Please enter both email and password.');
//       return;
//     }

//     axios.post(`http://localhost:1111/api/users/login`, userData)
//       .then(response => {
//        setUser(response.data)
//         console.log(response.data);
//        setUserstatus(response.status);
//         console.log(response.status);

//         // if (!user) {
//         //   alert('Account does not exist');
//         //   return;
//         // }

//         // if (userstatus === 200) {
//         //   alert(`Welcome ${user.firstName}!`);

//         //   if (role === 'admin') {
//         //     localStorage.setItem('isAdminLoggedIn', true);
//         //     onAdminLogin();
//         //     history.push('/admin');
//         //   } else {
//         //     localStorage.setItem('isUserLoggedIn', true);
//         //     onUserLogin();
//         //     history.push('/property');
//         //   }

//         //   localStorage.setItem('userDetails', JSON.stringify(user));
//         // } else {
//         //   alert('Invalid credentials or user not registered.');
//         // }
//       })
//       .catch(error => {
//         console.error('Error fetching user:', error);
//         alert('Error fetching user. Please try again later.');
//       });
//   };

//   const handleRegisterSuccess = () => {
//     setIsRegistering(false);
//     alert('Registration successful! You can now log in.');
//   };

//   const handleOnCancel = () => {
//     setIsRegistering(false);
//     alert('Cancelled');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="form-container">
//       {isRegistering ? (
//         <RegisterForm role={role} onRegisterSuccess={handleRegisterSuccess} onhandleCancel={handleOnCancel} />
//       ) : (
//         <>
//           <h2>Sign In</h2>
//           <div className="radio-group">
//             <label>
//               <input
//                 type="radio"
//                 value="user"
//                 checked={role === 'user'}
//                 onChange={() => setRole('user')}
//               />
//               User
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="admin"
//                 checked={role === 'admin'}
//                 onChange={() => setRole('admin')}
//               />
//               Admin
//             </label>
//           </div>
//           <input
//             type="text"
//             placeholder="Email"
//             name="email"
//             value={userData.email}
//             onChange={handleChange}
//             className="form-input"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={userData.password}
//             onChange={handleChange}
//             className="form-input"
//           />
//           <button onClick={handleLogin} className="form-button">Login</button>
//           {role !== 'admin' && (
//             <button onClick={() => setIsRegistering(true)} className="form-button register-button">
//               Register
//             </button>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default SignInForm;




import React, { useState } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';
import "../signin/SignInForm.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const SignInForm = ({ onAdminLogin, onUserLogin }) => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [role, setRole] = useState('user');
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const history = useHistory()

  const handleLogin = () => {
    const { email, password } = userData;
  
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
  
    if (role === 'admin') {
      // Fetch admin data from the backend using Axios
      axios.get(`http://localhost:1111/admin/email/${email}`)
        .then(response => {
          const adminData = response.data;
          if (adminData && adminData.email === email && adminData.password === password) {
            localStorage.setItem('adminDetails', JSON.stringify(adminData));
            
            localStorage.setItem('isAdminLoggedIn', true);
            onAdminLogin();
            alert(`Welcome Admin`);
            history.push('/admin');
          } else {
            alert('Invalid admin credentials.');
          }
        })
        .catch(error => {
          console.error('Error fetching admin:', error);
          alert('Invalid credentials or admin not found.');
        });
    } else {
      axios.post(`http://localhost:1111/api/users/login`, userData)
        .then(response => {
          const { user, token } = response.data;
  
          // Store user details and token in local storage
          localStorage.setItem('userDetails', JSON.stringify(user));
          localStorage.setItem('token', token);
  
          alert(`Welcome ${user.firstname}!`);
          localStorage.setItem('isUserLoggedIn', true);
          onUserLogin();
          history.push('/property');
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          alert('Invalid credentials or user not registered.');
        });
    }
  };
  

  const handleRegisterSuccess = () => {
    setIsRegistering(false);
    alert('Registration successful! You can now log in.');
  };

  const handleOnCancel = () => {
    setIsRegistering(false);
    alert('Cancelled');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      {isRegistering ? (
        <RegisterForm role={role} onRegisterSuccess={handleRegisterSuccess} onhandleCancel={handleOnCancel} />
      ) : (
        <>
          <h2>Sign In</h2>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="user"
                checked={role === 'user'}
                onChange={() => setRole('user')}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />
              Admin
            </label>
          </div>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="form-input"
          />
          <button onClick={handleLogin} className="form-button">Login</button>
          {role !== 'admin' && (
            <button onClick={() => setIsRegistering(true)} className="form-button register-button">
              Register
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SignInForm;
