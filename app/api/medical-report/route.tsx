import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

const  REPORT_GEN_PROMPT= `
    You are an Al Medical Voice Agent that just finished a voice conversation with a user. Based on the transcript, generate a structured report with the following fields: 1. sessionld: a unique session identifier

2. agent: the medical specialist name (e.g., "General Physician Al")

3. user: name of the patient or "Anonymous" if not provided

4. timestamp: current date and time in ISO format

5. chiefComplaint: one-sentence summary of the main health concern

6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations

7. symptoms: list of symptoms mentioned by the user

8. duration: how long the user has experienced the symptoms

9. severity: mild, moderate, or severe

10. medicationsMentioned: list of any medicines mentioned

11. recommendations: list of Al suggestions (e.g., rest, see a doctor)

Return the result in this JSON format:

"sessionld": "string",

"agent": "string",

"user": "string",

"timestamp": "ISO Date string",

"chiefComplaint": "string",

"summary": "string",

"symptoms": ["symptom1", "symptom2"],

"duration": "string",

"severity": "string",

"medicationsMentioned": ["med1", "med2"],

"recommendations": ["rec1", "rec2"],

Only include valid fields. Respond with nothing else.
Depends on doctor AI Agent info and Conversation between user and AI Agent
`

export async function POST(req:NextRequest) {
    const {sessionId ,sessionDetails,messages}=await req.json();

    try{

        const UserInput ="AI Doctor Agent Input : " + JSON.stringify(sessionDetails) + ", Conversation : " + JSON.stringify(messages);
          const completion = await openai.chat.completions.create({
          model: "google/gemini-2.5-flash-preview-05-20",
          messages: [
            {
              role: "system",
              content: REPORT_GEN_PROMPT,
            },
            {
              role: "user",
              content: UserInput,
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
                // Save to database

                const result = await db.update(SessionChatTable).set({
                    report:JSONResp
                }).where(eq(SessionChatTable.sessionId, sessionId))
                return NextResponse.json(JSONResp)

    }
    catch(e){
 return NextResponse.json(e)

    }
    
}