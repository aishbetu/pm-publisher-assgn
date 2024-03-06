'use client'
import React, { createContext, useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const AppContext = createContext(); 

export const AppProvider = ({children}) => {
    const [rating, setRating] = useState(0);

  useEffect(() => {
    const postRating = async () => {
      const response = await fetch('https://pmponline.co.in/sdetest/requests.php', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ rating }),
      });
      if (response.ok) {
        toast.success('Success');
      } else {
        toast.error('Failed');
      }
    };
    
    
    if (rating !== 0) {
      postRating();
    }
  }, [rating]);

  return (
    <AppContext.Provider value={{ rating, setRating }}>
        {children}
    </AppContext.Provider>
  );
};
