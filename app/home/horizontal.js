"use client";
import React, { useEffect, useState } from 'react';
import './css/horizontal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Dialog from './dialog';

library.add(fas);

function HorizontalNav() {
  const [balance, setBalance] = useState(0);
  const [access, setAccess] = useState(0);
  const [showCCSDropdown, setShowCCSDropdown] = useState(false);
  const [showSocksDropdown, setShowSocksDropdown] = useState(false);
  const [showBillingDropdown, setShowBillingDropdown] = useState(false);
  const [showSupportDropdown, setShowSupportDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isopen, setIsOpen] = useState(true);

  const handleopen = () => {
    setIsOpen(prev => !prev);
  };

  const handleDialog = () => {
    setIsOpen(true);
    setIsModalOpen(true);
  };

  const closeDialog = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchBalance = async () => {
      const username = localStorage.getItem("username");
      if (!username) {
        console.log("username is undefined");
      } else {
        try {
          const response = await axios.get(`/api/balance`, { params: { username }, withCredentials: true });
          setBalance(response.data.balance);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = '/login';
          } else {
            console.error('Error fetching balance:', error);
          }
        }
      }
    };
    

    fetchBalance();
    
  }, []);

  useEffect(() => {
    // Function to check user's access
    const checks = async () => {
      const username = localStorage.getItem("username");
      if (!username) {
        console.log("username is undefined");
        window.location.href = '/login';
        return;
      }
  
      try {
        const response = await axios.get(`/api/checks`, {
          params: { username },
          withCredentials: true,
        });
        console.log(response.data.access);
        
        // If access is not 'yes', redirect to billing
        if (response.data.access !== "yes") {
          window.location.href = '/billing';
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        } else {
          console.error('Error fetching balance:', error);
        }
      }
    };
  
    // Check if the current page is NOT the billing page
    if (window.location.pathname !== '/billing') {
      checks();
    }
  }, [window.location.pathname]);  // Runs when the URL path changes
  

  return (
    <div className="navbar fixed top-0 w-full bg-dark-900 text-white">
      <div className={`${isopen ? 'flex' : 'block'} container mx-auto justify-between items-center`}>
        <button className="navbar-toggler lg:hidden text-white" type="button" onClick={handleopen}>
          <span className="navbar-toggler-icon font-extrabold"></span>
        </button>
        
        <div className={`${isopen ? 'hidden' : 'flex'} lg:flex w-full justify-between`} id="navbarResponsive_top">
          <ul className="navbar-nav flex">
            <li className="nav-item" onClick={handleDialog}>
              <a className="nav-link hover:text-gray-400">News</a>
            </li>
            <li className="nav-item">
              <a href="/preorder" className="nav-link hover:text-gray-400">Preorder</a>
            </li>
            <li className="nav-item">
              <a href="/bins" className="nav-link hover:text-gray-400">NoVBV Bins <span className="bg-red-600 text-white rounded-full px-2 text-xs">new</span></a>
            </li>
            <li className="nav-item dropdown relative">
              <a className="nav-link drop hover:text-gray-400 flex gap-2" href="#" onClick={() => setShowCCSDropdown(!showCCSDropdown)}>CCS <FontAwesomeIcon icon="fa-solid fa-caret-down" /></a>
              <ul className={`${showCCSDropdown ? 'block' : 'hidden'} dropdown-menu absolute left-0 mt-2 w-40 bg-white text-black`}>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" href="/credit-cards">Buy CCS</a></li>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" href="/credit-cards/cart">Cart CCS</a></li>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" href="/credit-cards/orders">Orders CCS</a></li>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" onClick={handleDialog} >Binlookup</a></li>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" href="/preorder">Bin Preorder</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown relative">
              <a className="nav-link drop hover:text-gray-400 flex gap-2" href="#"onClick={() => setShowSocksDropdown(!showSocksDropdown)}>Socks 5 <FontAwesomeIcon icon="fa-solid fa-caret-down" /></a>
              <ul className={`${showSocksDropdown ? 'block' : 'hidden'} dropdown-menu absolute left-0 mt-2 w-40 bg-white text-black`}>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" onClick={handleDialog}>Buy Socks 5</a></li>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" onClick={handleDialog}>Order Socks5</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='/refund'>Refund policy</a>
            </li>
            <li className="nav-item dropdown relative">
              <a className="nav-link drop hover:text-gray-400 flex gap-2" href="#" onClick={() => setShowBillingDropdown(!showBillingDropdown)}>Billing <FontAwesomeIcon icon="fa-solid fa-caret-down" /></a>
              <ul className={`${showBillingDropdown ? 'block' : 'hidden'} dropdown-menu absolute left-0 mt-2 w-40 bg-white text-black`}>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" href="/billing">Topup</a></li>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" href="/billing/history">History</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown relative">
              <a className="nav-link drop hover:text-gray-400 flex gap-2" href="#" onClick={() => setShowSupportDropdown(!showSupportDropdown)}>Support <FontAwesomeIcon icon="fa-solid fa-caret-down" /></a>
              <ul className={`${showSupportDropdown ? 'block' : 'hidden'} dropdown-menu absolute left-0 mt-2 w-40 bg-white text-black`}>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" href="/support">My tickets</a></li>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" href="/support/create">Create ticket</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown relative">
              <a className="nav-link drop hover:text-gray-400 flex gap-2" href="#" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>Profile <FontAwesomeIcon icon="fa-solid fa-caret-down" /></a>
              <ul className={`${showProfileDropdown ? 'block' : 'hidden'} dropdown-menu absolute left-0 mt-2 w-40 bg-white text-black`}>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" href="/profile/details">Settings</a></li>
                <li><a className="dropdown-item px-4 py-2 hover:bg-gray-200" href="/login">Logout</a></li>
              </ul>
            </li>
            <Dialog isOpen={isModalOpen} onClose={closeDialog} />
          </ul>

          {/* Balance Display */}
          {/* <div className="flex items-center">
            <span className="balance text-lg font-semibold">Balance: ${balance}</span>
          </div> */}
        </div>
       
      </div>
      <hr/>
    </div>
  );
}
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive_top" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"></button>
export default HorizontalNav;
