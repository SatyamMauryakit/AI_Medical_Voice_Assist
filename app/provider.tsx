'use client'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/userDetailContext';
export type UserDetails ={
    name:string,
    email:string,
    credits:number
}

const Provider = ({children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const {user}= useUser();
    const [userDetails, setUserDetails] = useState<any>();
    useEffect(() => {
      user&&CreateNewUser();  
    },[user])
    const CreateNewUser = async()=>{
        const result = await axios.post('/api/users')
        console.log(result.data)
        setUserDetails(result.data)
    }
  return (
    
    <div>
        <UserDetailContext.Provider value={{userDetails, setUserDetails}}>

      {children}
        </UserDetailContext.Provider>
    </div>
  )
}

export default Provider
