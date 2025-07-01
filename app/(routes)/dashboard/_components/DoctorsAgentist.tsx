import { AIDoctorAgents } from '@/public/shared/list'
import React from 'react'
import DoctorAgentCard from './DoctorAgentCard'

const DoctorsAgentist = () => {
  return (
    <div className='mt-10'>
        <h2 className='text-2xl font-bold'>AI Specialist Doctors </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
            {AIDoctorAgents.map((doctor,index) => (
                <div key={index}>
                    <DoctorAgentCard doctorAgent={doctor}/>
                </div>
                
            ))}
        </div>
      
    </div>
  )
}

export default DoctorsAgentist
