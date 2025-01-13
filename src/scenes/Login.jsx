import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import XIcon from '@mui/icons-material/X';
import "../css/Login.css"
import apiClient from "../network/apiClient.js"
import LogoImage from "../assets/logo.png";
import {storeUserName, storeDesignation, storeEmail} from "../shared/utils/userDetails.js"
 
  
const Root = styled.main`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }
`;

const Login = () => {
     const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorSignIn, setErrorSignIn] = useState({ email: '', password: '' });
    const [errorSignUp, setErrorSignUp] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = (e) => {

        e.preventDefault();
 
        setErrorSignIn({ email: '', password: '' });

        if (!email || !password) {
            setErrorSignIn({
                email: email ? '' : 'Email is required.',
                password: password ? '' : 'Password is required.',
            });
            return;
        }

        if (!validateEmail(email)) {
            setErrorSignIn({ email: 'Invalid email format.', password: '' });
            return;
        }

        login();

        // Simple login authentication
        // if (email === 'admin@gmail.com' && password === 'admin') {
        //     navigate('/home');
        // } else {
        //     setErrorSignIn({ email: 'Invalid email or password.', password: '' });
        // }
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        setErrorSignUp({ email: '', password: '' });

        if (!email || !password) {
            setErrorSignUp({
                email: email ? '' : 'Email is required.',
                password: password ? '' : 'Password is required.',
            });
            return;
        }

        if (!validateEmail(email)) {
            setErrorSignUp({ email: 'Invalid email format.', password: '' });
            return;
        }

    };

    return (
        <Root>
            <main className="main">
                <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
                    <div className="form-container sign-up">
                        <form onSubmit={handleSignUp}>
                            <h1>Create Account</h1>
                            <span>use your email for registration</span>
                            <label>Email:</label>
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errorSignUp.email && <div className="error-message">{errorSignUp.email}</div>}
                            <label>Password:</label>
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errorSignUp.password && <div className="error-message">{errorSignUp.password}</div>}
                            <a className='forget' href="#">Forget Your Password?</a>
                            <button className='button'>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in">
                        <form onSubmit={handleLogin}>
                            <h1 className='Sign_in'>Sign In</h1>
                            <span> use your email password</span>
                            <label>Email:</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errorSignIn.email && <div className="error-message">{errorSignIn.email}</div>}
                            <label>Password:</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errorSignIn.password && <div className="error-message">{errorSignIn.password}</div>}
                            <a className='forget' href="#">Forget Your Password?</a>
                            <button className='button' type="submit">Sign In</button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <img src={LogoImage} alt="Logo" className="logo" 
    style={{ filter: 'invert(1) sepia(1) hue-rotate(180deg) brightness(2)' }} />
                                <h1>अर्थ: समाजस्य न्यास:</h1>
                                <p>WEALTH – WORLDLY THINGS – SOCIETY TRUST
                                Thus, Wealth owned by Paisalo Digital Limited is Trust property of Society.</p>
                                
                                <button className="hidden" onClick={() => setIsSignUp(false)}>
                                    Login for Employee
                                </button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <img src={LogoImage} alt="Logo" className="logo" 
    style={{ filter: 'invert(1) sepia(1) hue-rotate(180deg) brightness(2)' }} />
                                <h1>अर्थ: समाजस्य न्यास:</h1>
                                <p>WEALTH – WORLDLY THINGS – SOCIETY TRUST
                                Thus, Wealth owned by Paisalo Digital Limited is Trust property of Society.</p>
                                <button className="hidden" onClick={() => setIsSignUp(true)}>
                                    Login for Dealer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Root>
    );



    async function login() {
        debugger;
        try {
          const response = await apiClient.post("/User/GetToken", {
            emailId: email,
            password: password,
            errormsg: "string",
            isValidate: true,
          },{ requireAuth: false , checkTokenInResponse: false});
          debugger;
          if( response.data.statuscode==200)
          {
            debugger;
            alert("Login Success: "+response.data.data.tokenDetails.name);
          //  navigate('/dashboard');
            localStorage.setItem('authToken', response.data.data.tokenDetails.token);
            const token = localStorage.getItem("authToken"); // Replace with your token storage logic
            storeUserName(response.data.data.tokenDetails.name);
            storeDesignation(response.data.data.tokenDetails.empCode);
            storeEmail(response.data.data.tokenDetails.email);

            if (token) {
                    navigate('/dashboard');
            }
          }else{
            alert("Login Error:"+response.data.message);

          }
           
        } catch (error) {
            debugger;
          console.error("Login Error:", error.message);
          alert("Login Error:"+ error.message);
        }
      }


};

export default Login;