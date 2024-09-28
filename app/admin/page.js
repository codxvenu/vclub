"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HorizontalNav from '../home/horizontal';
import './page.css';
import Addbin from "./addbin";
import Addcc from './addcc';
import Useraction from './useraction';

const AdminPage = () => {
  const [currentView, setCurrentView] = useState('bin'); // Use 'currentView' to manage state
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // localStorage.setItem('role', 'admin');
    setCurrentView(localStorage.getItem("tab"))
    // Check if the user is an admin
    const role = localStorage.getItem("role");
    setIsAdmin(role === 'admin');
  }, []);

  const handleToggle = (view) => {
    setCurrentView(view);
  };

  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="app">
      <div className="main-content">
        <HorizontalNav />
        <div className='flex'>
          <div className="main-form flex gap-20 h-min trans flex-col">
            <div className="btndiv flex justify-between">
              <button type="button" className='' onClick={() => {handleToggle('bin'); localStorage.setItem("tab" , "bin") }}>Add Bin Data</button>
            <button type="button" className='' onClick={() => {handleToggle('card');localStorage.setItem("tab" , "card") }}>Add Card Data</button>
              <button type="button" className='' onClick={() =>{if(currentView === "user"){ window.location.href = '/admin'} else {  handleToggle('user'); localStorage.setItem("tab" , "user")}} }>User Action</button>
            </div>
            <div>
              {currentView === 'bin' && <Addbin />}
              {currentView === 'card' && <Addcc />}
              {currentView === 'user' && <Useraction />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
