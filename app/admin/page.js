"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HorizontalNav from '../home/horizontal';
import './page.css';
import Addbin from "./addbin";
import Addcc from './addcc';

const AdminPage = () => {
  const [currentView, setCurrentView] = useState('bin'); // Use 'currentView' to manage state
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
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
              <button type="button" className='' onClick={() => handleToggle('bin')}>Add Bin Data</button>
              <button type="button" className='' onClick={() => handleToggle('card')}>Add Card Data</button>
            </div>
            <div>
              {currentView === 'bin' && <Addbin />}
              {currentView === 'card' && <Addcc />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;