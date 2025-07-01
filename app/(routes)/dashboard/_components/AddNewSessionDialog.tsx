'use client'
import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import DoctorAgentCard, { doctorAgent } from './DoctorAgentCard'
import SuggestedDoctorCard from './SuggestedDoctorCard'
import { useRouter } from 'next/navigation'

const AddNewSessionDialog = () => {
    const [note, setNote] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
    const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
    const router =useRouter();
    const  OnClickNext = async () =>{
        setLoading(true);
        try{
              
            const result = await axios.post('/api/suggest-doctors', { notes: note });
            setSuggestedDoctors(result.data)
            console.log(result.data)
        }
        catch (err) {
  console.error("API call failed:", err);
  alert("Something went wrong. Try again later.");
} finally {
  setLoading(false);
}


        setLoading(false);
    }

    const OnStartConsultation = async () => {
      setLoading(true);
        // save all info to database
        const result =await axios.post('/api/session-chat', {notes: note, selectedDoctor: selectedDoctor})
        console.log(result.data)
        if(result.data?.sessionId){
            console.log(result.data.sessionId)
            // Route to new Conversation page
            router.push('/dashboard/medical-agent/' + result.data.sessionId);

        }
        setLoading(false);
    } 

  return (
    <div>
        <Dialog>
  <DialogTrigger> <Button className='mt-3'>+Start a Consultation</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basic Details</DialogTitle>
      <DialogDescription asChild>
      {
        !suggestedDoctors ?
       <div>
<h2>Add Symptoms or Any Other Details</h2>
 <Textarea className='mt-3 h-[200px]' placeholder='Add Details Here...' 
 onChange={(e) => setNote(e.target.value)}
 />

        </div>
        :
        <div>

       <h2>Select the doctor</h2>

        <div className='grid grid-cols-3  gap-5'>
        {suggestedDoctors.map((doctor,index)=>(
            <SuggestedDoctorCard key={index} doctorAgent={doctor}
            setSelectedDoctor={()=>setSelectedDoctor(doctor)}
            // @ts-ignore
            selectedDoctor={selectedDoctor}
            />
        ))}
        </div>
         </div>
    } 
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>

       <Button variant={'outline'}>Cancel</Button> 
        </DialogClose>
      {!suggestedDoctors? <Button disabled={!note || loading} onClick={() =>OnClickNext()}>
      
        Next  {loading ? <Loader2 className='animate-spin'/>:<ArrowRight/>}</Button>:
        <Button disabled={ loading || !selectedDoctor} onClick={()=>{OnStartConsultation()}}
        
        >Start Consultaion{loading ? <Loader2 className='animate-spin'/>:<ArrowRight/>}</Button>
        }
    </DialogFooter>
  </DialogContent>
</Dialog>
      
    </div>
  )
}

export default AddNewSessionDialog
