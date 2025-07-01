import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import Image from 'next/image'
import React from 'react'
export type doctorAgent 
={
  id:number,
  specialist:string,
  description:string,
  image:string,
  agentPrompt:string,
   voiceId?:string

}
type props={
  doctorAgent:doctorAgent
}

const DoctorAgentCard = (
    {doctorAgent}:props
) => {
  return (
    <div className='border-2 border-dashed rounded-2xl p-5'>
      <Image  src={doctorAgent.image} alt="thumbnail" width={200} height={300}
      className='w-full h-[250px] object-cover rounded-2xl'/>
      <h2 className=' font-bold'>{doctorAgent.specialist}</h2>
      <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent.description}</p>
      <Button className='w-full mt-2'>Start Consultation <IconArrowRight/></Button>
      
    </div>
  )
}

export default DoctorAgentCard
