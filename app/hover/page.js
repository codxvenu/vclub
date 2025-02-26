"use client";
import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';
import HorizontalNav from '../home/horizontal';
import './page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'; // Import the correct icon from FontAwesome
import { useRouter } from 'next/navigation';
const Hover = () => {
  const [balance, setBalance] = useState(0);
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


  return (
  <div className='hover'>
        <div className="invite-button"></div>
        <div className="support-button" onClick={()=>{window.location.href = 'https://t.me/vclub_x';}}></div>
        <div className="alpha60">
      <div className="container flex flex-col items-center">
        <div>
          <div
            className="label label-default"
            style={{
              display: 'block',
              float: 'left',
              marginLeft: '5px',
              color: '#B8B8B8',
              border: '2px #262626 solid'
            }}
          >
            <a href="https://t.me/vclub_x">
              <span style={{ fontSize: '18px', textDecoration: 'underline' }}>
                <strong style={{ color: 'red' }}>SELLER?</strong>{' '}
                <strong style={{ fontWeight: 'bold', color: '#66FF33' }}>
                  SELL YOUR STUFF WITH US
                </strong>
              </span>
            </a>
          </div>
        </div>

        <div className="checker-info flex">
          Balance:{' '}
          <strong style={{ fontSize: '14px', color: '#32CD32' }}>{balance} $</strong>&nbsp;&nbsp;
          <a href="/billing" title="Add money to balance">
            <img src={'https://cdn-icons-png.flaticon.com/512/4315/4315609.png'} 
           className='w-4 m-auto' alt="Add money to balance" />
          </a>
        </div>
      </div>
    </div>
  </div>

    
  
  );
};

export default Hover;
