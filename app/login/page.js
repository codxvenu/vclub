"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import copy from "copy-to-clipboard";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in Next.js

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas , faUser } from '@fortawesome/free-solid-svg-icons';

library.add(fas , faUser);

import "./page.css";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mdsCode, setMdsCode] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaUrl, setCaptchaUrl] = useState(`/api/captcha`);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter(); // Use useRouter from next/router

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = () => {
    setCaptchaUrl(`/api/captcha?${Date.now()}`);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMdsCodeChange = (event) => {
    setMdsCode(event.target.value);
  };

  const handleCaptchaChange = (event) => {
    setCaptcha(event.target.value);
  };

  const handleCopy = () => {
    copy(mdsCode);
    toast.success("Copied to Clipboard");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state

    const url = isLogin ? `/api/login` : `/api/signup`;
    const data = isLogin ? { username, password, mdsCode, captcha } : { username, password, email };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify(data),
      });

      const result = await response.json();
        if (result.message === "Login successful") {
          toast.success(result.message);
          window.location.href = '/billing';// Redirect to home page after login
          localStorage.setItem("username", username);
          localStorage.setItem("role", result.role);
          
          
        } else {
          toast.error(result.message);
          fetchCaptcha(); // Refresh the CAPTCHA on error
        }
    
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  
  

  return (
    <div className="login-container">
      <span className="leading-loose block  mt-4 text-slate-300">Registration: <strong>Open
      </strong> , Registration Fee: <strong>$50
        </strong></span>
      <div className="form-container ">
     
        <form onSubmit={handleSubmit}>
         
         
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username*"
              required
            />
         
         
           
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
               placeholder="Password*"
              required
            />
        
          {!isLogin && (
           
           
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                 placeholder="Jabber*"
                required
              />
   
          )}
          {isLogin && (
            <div className="form-group flex flex-row .captcha-container">
              <input
                className="w-2/4"
                type="text"
                id="captcha"
                value={captcha}
                onChange={handleCaptchaChange}
                placeholder="Captcha*"
                required
              />
              <img className="captcha-image w-2/4" src={captchaUrl} alt="CAPTCHA" />
              
            </div>
          )}
          <div className="flex gap-2">
          <button className="submit login" type="submit" disabled={isLoading}>
           Login
          </button>
          <button className="submit register" type="button"  disabled={isLoading}>
            <a href="/login/register">Registration</a>
          </button>
          </div>
          {isLogin && (
            <div className="forgot-password">
              Forgot your password<a href="https://t.me/vclub_x " className="text-blue-500 ml-1"> click here</a>
            </div>
          )}
         
        </form>
       
      </div>
    </div>
  );
}

export default LoginSignup;
