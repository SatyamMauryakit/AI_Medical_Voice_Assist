import React from 'react'
import HistoryList from './_components/HistoryList'
import DoctorsAgentist from './_components/DoctorsAgentist'
import AddNewSessionDialog from './_components/AddNewSessionDialog'

const Dashboard = () => {
  return (
    <div><div className='flex justify-between items-center'>

        <h2 className='text-2xl font-bold'>My Dashboard</h2>
       <AddNewSessionDialog/>
    </div>
        <HistoryList/>
        <DoctorsAgentist/>
      
    </div>
  )
}

export default Dashboard
