"use client"
import { React, useState,useEffect } from 'react'
import HorizontalNav from '../home/horizontal'
import { space } from 'postcss/lib/list';
function useraction() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetch
    })
    return (
        <div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Balance</th>
                        <th>Access</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item,index) => (
                            <tr>
                                <td>{index}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.balance}</td>
                                <td>{item.access ==='yes' ? <span className='text-green-500'>{item.access}</span>: <span className='text-red-500'>{item.access}</span> }</td>
                                <td><a>Edit</a></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default useraction
