"use client"
import { React, useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import View from './view';
function useraction() {
    const [data, setData] = useState([]);
    const [selectedData,setSelectedData] = useState([]);
    const [view,setView]= useState(false);
    const fetchUsers = async ()=>{
        try {
            const request =await axios.request("/api/admin/users");
            setData(request.data); 
        } catch (error) {
            toast.error(error)
        }
    };
    useEffect(()=>{
       fetchUsers();
       setSelectedData([])
    },[]);

   
    return (
        <div>
            {!view && (
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
             <tr key={index}>
                 <td>{index}</td>
                 <td>{item.username}</td>
                 <td>{item.email}</td>
                 <td>{item.balance}</td>
                 <td>{item.access ==='yes' ? <span className='text-green-500'>{item.access}</span>: <span className='text-red-500'>{item.access}</span> }</td>
                 <td><a className='btns btn-sm btn-danger text-xs rounded-md' onClick={()=>{ setView(true); setSelectedData(item)}}>Edit</a></td>
             </tr>
         ))}
 </tbody>
</table> 
               )}

             {view && (
       <View data={selectedData}/>
             )}
      
           
        </div>
    )
}

export default useraction
