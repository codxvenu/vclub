"use client"
import React, { useState, useEffect, useRef } from 'react';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./page.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faTelegram } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faFontAwesome)
import axios from 'axios';
const veiw = (id ) => {
    const [data, setData] = useState([]);
    const [closed, setClosed] = useState(false);
    const [formData, setFormData] = useState({
        subject: '',
        department: '',
        message: '',
        bankName: '',
        country: '',
        state: '',
        city: '',
        level: '',
        types: '',
        binPriceRange: [0, 100]
    });
console.log("id",id.id);

const handleSubmit = async (id) => {
  const username = localStorage.getItem('username');
  if (!username) {
    toast.error('User not logged in');
    return;
  }
  try {
    const username = localStorage.getItem("username");
    const response = await axios.get(`/api/order/view/${id}`, { params: { username}, withCredentials: true });
    // setData(response);
    console.log(response.data);
      setData(response.data);

  } catch (error) {
    console.log(error);

  }
};
useEffect(() => {
  handleSubmit(id.id);
  // setcost();
  console.log(id.id);
  
}, []);

    return (
       
      <div className="container-veiw">
      <div id="scrollerToggle">
        <div>
          <h3 className='text-2xl font-extrabold'>CCS Orders</h3>
          <div className="alert alert-info">
            <div>* Please note that checker may kill the card. We advise you to use the card before checking</div>
          </div>
          <div>
            <div id="mygrid" className="grid-view">
              <div className="overflow-x-auto">
                <table className="table tablelg table-striped table-bordered table-auto text-left border">
                  <thead className="">
                    <tr>
                      <th className="p-2 border">Card:</th>
                      <th className="p-2 border">BIN Info:</th>
                      <th className="p-2 border">Additionally:</th>
                      <th className="p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd">
                      <td className="p-2 border w-[150px]">
                        <div className="overflow-auto">
                          <table className="table-auto table table-striped table-bordered">
                            <tbody>
                              <tr>
                                <td className="w-12">CCNUM</td>
                                <td className='tds'>{data.ccnum}</td>
                              </tr>
                              <tr>
                                <td className="w-12">EXP</td>
                                <td className='tds'>{data.yymm}</td>
                              </tr>
                              <tr>
                                <td className="w-12">NAME</td>
                                <td className='tds'>{data.holder}</td>
                              </tr>
                              <tr>
                                <td className="w-12">CVV</td>
                                <td className='tds'>{data.cvv}</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className='flex flex-col'>
                            <textarea
                              className=" p-1 mt-2 text-comment"
                              placeholder="Write your comment here... Max 250 chars"
                              maxLength={250}
                            ></textarea>
                            <a
                              onClick={() => addComment('5268099945909578')}
                              className="hover:underline float-right mt-2"
                            >
                              Save comment
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="w-[250px] p-2 border text-xs">
                        <div className="overflow-auto">
                          <table className="table table-striped table-bordered table-auto ">
                            <tbody>
                              <tr>
                                <td className="text-center w-12">COUNTRY</td>
                                <td className='tds'>{data.country}</td>
                              </tr>
                              <tr>
                                <td className="text-center w-12">BANK</td>
                                <td className='tds'>{data.bank}</td>
                              </tr>
                              <tr>
                                <td className="text-center w-12">LEVEL</td>
                                <td className='tds'>{data.level}</td>
                              </tr>
                              <tr>
                                <td className="text-center w-12">TYPE</td>
                                <td className='tds'>{data.type}</td>
                              </tr>
                              <tr>
                                <td className="text-center w-12">ZIP</td>
                                <td className='tds'>{data.zip}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                      <td className="w-[200px] p-2 border text-xs">
                        <div className="overflow-auto">
                          <table className="table table-striped table-bordered table-auto">
                            <tbody>
                              <tr>
                                <td className="text-center w-12">ADDRESS</td>
                                <td className='tds'>{data.addr}</td>
                              </tr>
                              <tr>
                                <td className="text-center w-12">PHONE</td>
                                <td className='tds'>{data.phone}</td>
                              </tr>
                              <tr>
                                <td className="text-center w-12">ORIGINAL</td>
                                <td className='tds'>{data.ccnum}|{data.yymm}|{data.cvv}|{data.holder}|{data.addr}|{data.zip}|{data.phone}|</td>
                              </tr>
                              <tr>
                                <td className="text-center w-12">BASE</td>
                                <td className='tds'> 
                                  <a href="/shop/ccs?Search[base_id][]=17071" className="text-blue-500 hover:underline">
                                    {data.base}
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                      <td className="w-20 p-2 border">
                        <div className="inline-block text-center">
                          <abbr title="Approved and completed">00</abbr>
                          <br />
                          NO REFUND
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="hidden" id="keys" title="/orders/ccs/order/1NV4Q28">
                <span>21220847</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};



export default veiw;
