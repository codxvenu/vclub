"use client"
import { useState } from 'react';
import "./page.css";

const Page = () => {
  const [page, setPage] = useState(false);

  return (
    <div className={page == true ? 'h-[100vh] bg-black': "h-[100vh] bg-white"}>
    {!page && (

      <input 
        type="submit" 
        value="LOGIN" 
        className="btnzz" 
        onClick={() => setPage(true)} 
      />
    )}
    
      {page && (
      <div className='container flex justify-center items-center w-[100vw]'>
  <div></div>
        <a href="/login">
          <div className='img'></div>
        </a>
      </div>
      )}
    </div>
  );
}

export default Page;
