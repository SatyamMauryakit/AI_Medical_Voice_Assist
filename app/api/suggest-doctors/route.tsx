import { openai } from "@/config/OpenAiModel";
import { NextRequest, NextResponse } from "next/server";
import {AIDoctorAgents } from "@/public/shared/list";
export async  function POST(req:NextRequest){
    const {notes}= await req.json();
    try{
      const completion = await openai.chat.completions.create({
  model: "google/gemini-2.5-flash-preview-05-20",
  messages: [
    {
      role: "system",
      content: JSON.stringify(AIDoctorAgents),
    },
    {
      role: "user",
      content: notes,
    },
    {
      role: "user",
      content: `Based on the above user symptoms, return a list of suitable doctors as JSON.`,
    },
  ],
  max_tokens: 500, // ✅ very important
});

        const rawResp=completion.choices[0].message;
        //@ts-ignore
        const Reap = rawResp.content.trim().replace('```json','').replace('```','')
        const JSONResp = JSON.parse(Reap);
        return NextResponse.json(JSONResp)

    }
    catch(e){ 
        return NextResponse.json({error:(e)},{status:500})

    }

}