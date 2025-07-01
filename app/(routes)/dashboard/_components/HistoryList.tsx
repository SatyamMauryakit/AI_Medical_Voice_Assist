'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import AddNewSessionDialog from './AddNewSessionDialog';

const HistoryList = () => {
    const [historyList, setHistoryList] =useState([]);
  return (
    <div className='mt-10'>
     {historyList.length==0?
     <div className='flex flex-col justify-center items-center p-7 border-2 border-dashed rounded-2xl bg-gray-50'>
        <Image src={'/thumbnail.png'} alt="thumbnail" width={150} height={150} />
        <h2 className='text-2xl font-bold mt-2'>No Recent Consultions</h2>
        <p>It looks like you have no recent consultations with any doctor</p>
       <AddNewSessionDialog/>

     </div>:
     <div>
List
     </div>
    }
    </div>
  )
}

export default HistoryList
