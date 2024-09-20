"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import copy from "copy-to-clipboard";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in Next.js

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(fas, faUser);

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
  
    const url = `/api/signup`;
    const data = { username, password, email };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify(data),
      });
  
      // Check if the response status is not in the range 200–299
      if (!response.ok) {
        const result = await response.json(); // Get the error message from backend
        throw new Error(result.message || "An unknown error occurred");
      }
  
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        localStorage.setItem("username", username);
        localStorage.setItem("role", result.role);
        window.location.href = '/login'; // Redirect to login page after signup
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  



  return (
    <div className="login-container">
      <span className="leading-loose block  mt-4 text-slate-300 text-center">Registration: <strong>Open
      </strong> , Registration Fee: <strong>$50
        </strong></span>
      <span className="text-red-500 text-center "><h2 className="text-sm font-normal">Please note inactive users without balance will be deletedafter several days</h2> </span>
      <div className="form-container ">

        <form onSubmit={handleSubmit}>

          <span className="flex gap-4">

            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder=" Username*"
              required
            />

            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder=" Jabber*"
              required
            />
          </span>
          <div className="alert alert-danger">
            <a href="https://xmpp.org/about/technology-overview/" target="_blank">Jabber (XMPP)</a> <strong>IS NOT AN EMAIL</strong>. You will not be able to reset your password and get access to your account without it. You can register a jabber on some site from <a href="https://list.jabber.at/" target="_blank">this list</a> or find a suggestion on a forum                    </div>
          <span className="flex  gap-4">

            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder=" Password*"
              required
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Repeat Password*"
              required
            />
          </span>




          <span className="flex gap-2">

            <div className="form-group flex flex-row .captcha-container">
              <input
                type="text"
                id="captcha"
                value={captcha}
                onChange={handleCaptchaChange}
                placeholder="Captcha*"
                required
              />
              <img className="captcha-image" src={captchaUrl} alt="CAPTCHA" />

            </div>

            <div className="flex">
              <button className="submit login" type="submit" disabled={isLoading}>
                Registration
              </button>
            </div>
          </span>


        </form>

      </div>
    </div>
  );
}

export default LoginSignup;
