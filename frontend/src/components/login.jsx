import React, { useState } from "react";
import '../components/style/login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginEmail, gsetLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [action, setAction] = useState("Login");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/users/login', {
        email: loginEmail,
        password: loginPassword
      });
          //console.log(res.status);
          
      if (res.status==201) {
        alert(`Login Successful as ${res.data.user.email}`);
        navigate('./Home')

      } else if(res.data==400){
        alert(`Invalid email or password try again`);
      }
      else{
        alert("filled missing")
      }
    } catch (err) {
      console.log(err);
      alert('An error occurred');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/users/register', {
        name: signupName,
        email: signupEmail,
        password: signupPassword
      });

      console.log('resposne' + res);
      if (res.status == 201) {
        alert(`Your data is successfully saved as ${res.data.user.name}`);
      } else {
        alert('Already exists');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="parent">
      <div className="login-container">
        <h1>{action}</h1>
        <div className="box">
          <form onSubmit={action === 'Login' ? handleLoginSubmit : handleSignupSubmit}>
            {action === "Signup" && (
              <div className="signup-fields">
                <label>Name </label>
                <input
                  type="text"
                  value={signupName}
                  placeholder="Enter your Name"
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>
            )}
            <div className="input-field">
              <label>Email </label>
              <input
                type="email"
                value={action === 'Login' ? loginEmail : signupEmail}
                placeholder="Enter your Email"
                onChange={(e) => action === 'Login' ? setLoginEmail(e.target.value) : setSignupEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>Password </label>
              <input
                type="password"
                value={action === 'Login' ? loginPassword : signupPassword}
                placeholder="Enter your Password"
                onChange={(e) => action === 'Login' ? setLoginPassword(e.target.value) : setSignupPassword(e.target.value)}
              />
            </div>
            <button type="submit">{action }</button>
            {action === "Login" ? (
              <p>If you don't have an account, go to <Link to="/login/signup" onClick={() => setAction('Signup')}>Signup</Link></p>
            ) : (
              <p>If you already registered, go to <Link to="/login" onClick={() => setAction('Login')}>Login</Link></p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
