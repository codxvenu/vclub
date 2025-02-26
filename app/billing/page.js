"use client";
import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';
import HorizontalNav from '../home/horizontal';
import './page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'; // Import the correct icon from FontAwesome

const BillingPage = () => {
  const [transactionId, setTransactionId] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const inputRef = useRef(null);
  const walletAddress = 'TADdR7DWGDtFziQ18iRhwQoahNqPk2gwVt'; // Replace with your actual wallet address
  const [isloader, setIsloader] = useState(false);
  const [data, setData] = useState([]);
  const [tab, setTab] = useState("bitcoin");
  
  const handleInputChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleCopy = async () => {
    if (inputRef.current) {
      try {
        await navigator.clipboard.writeText(inputRef.current.value);
        setCopySuccess('Copied to clipboard!');
        setTimeout(() => setCopySuccess(''), 2000);
      } catch (err) {
        setCopySuccess('Failed to copy!');
        console.error('Failed to copy: ', err);
      }
    }
  };

  

  useEffect(() => {
    const fetchTransactions = async () => {
      const username = localStorage.getItem('username');
      try {
        const response = await fetch(`/api/payments?username=${username}`);
        if (!response.ok) {
          // Even with 404, ensure data is set to empty array
          if (response.status === 404) {
            setData([]);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } else {
          const result = await response.json();
          // Ensure result is an array
          setData(Array.isArray(result) ? result : []);
        }
      } catch (error) {
        console.error('Error fetching transaction data:', error);
        setError(error.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTransactions();
  }, []);
  const handleSubmit = async () => {
    const username = localStorage.getItem('username');
    setIsloader(true);
    try {
      await axios.post(`/api/submit-transaction`, {
        transactionId,
        username,
      }, { withCredentials: true });
      alert('Transaction ID sent successfully!');
      setIsloader(false);
      setTransactionId('');
    } catch (error) {
      console.error('Error submitting transaction:', error);
      alert('Failed to send transaction ID.');
      setIsloader(false);
    }
  };

  return (
    <div className="app">
      <div className="main-content">
        <HorizontalNav />
        <div className="container-billing">
          <div className="tabs-above">
            <ul className="flex border-gray-200">
              <li className="mr-1">
                <a
                  className={tab=="bitcoin" ? "inline-block py-2 px-4 text-blue-500 border-b-2 border-blue-500 active" : "inline-block py-2 px-4"}
                  data-toggle="tab"
                  href="#bitcoin"
                  role="tab"
                  onClick={() => setTab("bitcoin")}
                >
                 <span className='flex gap-2'><img src='https://cdn-icons-png.flaticon.com/512/5968/5968260.png'  alt='btc' className='lg:w-4 w-8'/><h6 className='text-base'>BITCOIN</h6> </span> 
                </a>
              </li>
              <li className="mr-1">
                <a
                  className={tab=="usdt" ? "inline-block py-2 px-4 text-blue-500 border-b-2 border-blue-500 active" : "inline-block py-2 px-4"}
                  data-toggle="tab"
                  href="#usdt"
                  role="tab"
                  onClick={() => setTab("usdt")}
                >
               <span className='flex gap-2'><img src='https://cdn-icons-png.flaticon.com/512/15207/15207964.png' className='lg:w-4 w-8'></img>  <h2 className='text-base'>USDT</h2></span> 
                </a>
              </li>
            
            </ul>

            <div className="tab-content">
              <div id="bitcoin" className={tab==="bitcoin"? "tab-pane block" :"tab-pane hidden"}>
                <div className="card p-4 shadow-md rounded">
                  <div className="card-body">
                    <h4 className="text-lg font-semibold">
                      Please send your payment of BTC to Bitcoin address:
                    </h4>
                    <b>
                      <span className=" text-xl">
                        Notice: Every time, when you want to Topup, please, check address on this page. It will be changed every time after each transaction.
                      </span>
                    </b>
                    <br />
                    <br />
                    <b>Exchange fee is 3%. You need to 2 confirmations of transaction in the system to deposit money to your account.</b>
                    <br />
                    <br />
                    <div className="alert alert-success bg-green-100 text-green-800 p-4 rounded">
                      <div id="btc-address" className="text-2xl font-bold">
                      bc1qlp6daj5uqx9zn03cg4pdsqpu8fgzajw6d9t2gl
                      </div>
                    </div>
                    <div className="flex para">
                      <div className="flex-1 text-white">
                        <h4 className="text-lg font-bold">1BTC = 61941$</h4>
                        Payments from Bitcoin's take about 10-15 mins, please contact support if you don't receive your funds only after 15 mins.
                        <br />
                        <br />
                        To fill up your shop balance with BTC payment you need to:
                        <br />
                        <br />
                        1. Send coins to your address shown below.
                        <br />
                        2. After your transaction(s) send transaction id - your balance will be added to your account automatically.
                        <br />
                        <br />
                      </div>
                      <div className="w-1/3">
                        <div
                          id="qr-bitcoin"
                          className="w-48 h-48 border border-gray-300 relative flex items-center justify-center"
                        >
                          <QRCode value="bc1qlp6daj5uqx9zn03cg4pdsqpu8fgzajw6d9t2gl" size={200} />
                        </div>
                      </div>
                    </div>

                    <div className="farm flex flex-col g-5 ml-20 mt-10">
                      <p>Once you have deposited funds, please provide the sender ID below:</p>
                      <div className="transaction-id">
                        <input
                          type="text"
                          value={transactionId}
                          onChange={handleInputChange}
                          placeholder="Enter sender address"
                        />
                        <button onClick={handleSubmit}>Submit</button>
                        {isloader && <h1>Sending.....</h1>}
                      </div>
                    </div>
                    <div className="alert p-4 rounded mt-4">
                      Transactions waiting confirmation:
                      <br />
                      <div id="bitcoin_pending" className="mt-2">
                        <div className="overflow-x-auto">
                          <table className="min-w-full border border-gray-200 rounded">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="py-2 px-4 text-left">Date</th>
                                <th className="py-2 px-4 text-left">Address</th>
                                <th className="py-2 px-4 text-left">Amount</th>
                                <th className="py-2 px-4 text-left">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && data.length === 0 ? (
                                <tr>
                                  <td colSpan="4" className="py-2 px-4 text-center text-gray-500">
                                    No unconfirmed transactions yet
                                  </td>
                                </tr>
                              ) : (
                                data.map((transaction, index) => (
                                  <tr key={index}>
                                    <td className="py-2 px-4 text-left">{transaction.date}</td>
                                    <td className="py-2 px-4 text-left">{transaction.address}</td>
                                    <td className="py-2 px-4 text-left">{transaction.amount}</td>
                                    <td className="py-2 px-4 text-left">{transaction.status == "paid" ? <span className='text-green-300'>Confirmed</span> : <span className='text-red-400'>Pending</span> } </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="usdt" className={tab==="usdt"? "tab-pane block" :"tab-pane none hidden"}>
                <div className="card p-4 shadow-md rounded">
                  <div className="card-body">
                    <h4 className="text-lg font-semibold">
                    Please send your payment of USDT to Tether address:
                    </h4>
                    <b>
                      <span className=" text-xl">
                        Notice: Every time, when you want to Topup, please, check address on this page. It will be changed every time after each transaction.
                      </span>
                    </b>
                    <br />
                    <br />
                    <b>Exchange fee is 3%. You need to 2 confirmations of transaction in the system to deposit money to your account.</b>
                    <br />
                    <br />
                    <div className="alert alert-success bg-green-100 text-green-800 p-4 rounded">
                      <div id="btc-address" className="text-2xl font-bold">
                      TS4K6ZAmtYaocSWTPszJUUqQHNHsmMHY1c
                      </div>
                    </div>
                    <div className="flex para">
                      <div className="flex-1 text-white">
                        <h4 className="text-lg font-bold">1USDT = 1.00$Ensure the network is Tron (TRC20)</h4>
                        Payments from USDT takes about 5-10 mins.

                        <br />
                        <br />
                        To fill up your shop balance with USDT payment you need to:
                        <br />
                        <br />
                        1- Send coins to your address shown above (you can send as many separate payments as you want - they all will be added to your balance)
                        <br />
                        2. After your transaction(s) send transaction id - your balance will be added to your account automatically.
                        <br />
                        <br />
                      </div>
                      <div className="w-1/3">
                        <div
                          id="qr-bitcoin"
                          className="w-48 h-48 border border-gray-300 relative flex items-center justify-center"
                        >
                          <QRCode value="TS4K6ZAmtYaocSWTPszJUUqQHNHsmMHY1c" size={200} />
                        </div>
                      </div>
                    </div>

                    <div className="farm flex flex-col g-5 ml-20 mt-10">
                      <p>Once you have deposited funds, please provide the sender ID below:</p>
                      <div className="transaction-id">
                        <input
                          type="text"
                          value={transactionId}
                          onChange={handleInputChange}
                          placeholder="Enter sender address"
                        />
                        <button onClick={handleSubmit}>Submit</button>
                        {isloader && <h1>Sending.....</h1>}
                      </div>
                    </div>
                    <div className="alert p-4 rounded mt-4">
                      Transactions waiting confirmation:
                      <br />
                      <div id="bitcoin_pending" className="mt-2">
                        <div className="overflow-x-auto">
                          <table className="min-w-full border border-gray-200 rounded">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="py-2 px-4 text-left">Date</th>
                                <th className="py-2 px-4 text-left">Address</th>
                                <th className="py-2 px-4 text-left">Amount</th>
                                <th className="py-2 px-4 text-left">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && data.length === 0 ? (
                                <tr>
                                  <td colSpan="4" className="py-2 px-4 text-center text-gray-500">
                                    No unconfirmed transactions yet
                                  </td>
                                </tr>
                              ) : (
                                data.map((transaction, index) => (
                                  <tr key={index}>
                                    <td className="py-2 px-4 text-left">{transaction.date}</td>
                                    <td className="py-2 px-4 text-left">{transaction.address}</td>
                                    <td className="py-2 px-4 text-left">{transaction.amount}</td>
                                    <td className="py-2 px-4 text-left">{transaction.status == "paid" ? <span className='text-green-300'>Confirmed</span> : <span className='text-red-400'>Pending</span> } </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* You can add more tab content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
