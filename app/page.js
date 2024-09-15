"use client"
import { useState } from 'react';
import "./page.css";
const Page = () => {
  const [page, setPage] = useState(false);

  return (
    <>
    {!page && (

      <input 
        type="submit" 
        value="LOGIN" 
        className="btnzz" 
        onClick={() => setPage(true)} 
      />
    )}
      
      {/* Correct conditional rendering */}
      {page && (
      <div className='container'>

        <a href="/login">
          <div className='img'></div>
        </a>
      </div>
      )}
    </>
  );
}

export default Page;
