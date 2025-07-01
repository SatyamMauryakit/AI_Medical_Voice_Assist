"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, Loader, Loader2, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";

type SessionDetails = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type Messages = {
  role: string;
  text: string;
};

const MedicalVoiceAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRoll, setCurrentRoll] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<Messages[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(result.data);
    setSessionDetails(result.data);
  };

  const StartCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);

    vapi.on("call-start", () => {
      setCallStarted(true);
      console.log("Call started");
    });

    vapi.on("call-end", () => {
      setCallStarted(false);
      console.log("Call ended");
    });

    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;
        console.log(`${role}: ${transcript}`);
        if (transcriptType === "partial") {
          setLiveTranscript(transcript);
          setCurrentRoll(role);
        } else if (transcriptType === "final") {
          setMessages((prev: any) => [...prev, { role, text: transcript }]);
          setLiveTranscript("");
          setCurrentRoll(null);
        }
      }
    });

    vapi.on("speech-start", () => {
      console.log("Assistant started speaking");
      setCurrentRoll("assistant");
    });

    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setCurrentRoll("user");
    });
  };

  const endCall = async() => {
    setLoading(true);
    if (!vapiInstance) return;
    vapiInstance.stop();
    vapiInstance.off("call-start");
    vapiInstance.off("call-end");
    vapiInstance.off("message");
    setCallStarted(false); // ✅ fixed typo
    setVapiInstance(null);

    const result = await GenerateReport();
    setLoading(false);
    console.log(result)
  };

const GenerateReport = async() => {

  const result = await axios.post('/api/generate-report', {
    messages:messages,
    sessionDetails:sessionDetails,
    sessionId:sessionId

  });

  console.log(result.data)
  return result.data

}

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 ">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected..." : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>
      {sessionDetails && (
        <div className="flex items-center flex-col mt-10 ">
          <Image
            src={sessionDetails?.selectedDoctor?.image}
            alt={sessionDetails?.selectedDoctor?.specialist}
            width={200}
            height={300}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />
          <h2 className="mt-2 text-lg">
            {sessionDetails?.selectedDoctor?.specialist}
          </h2>
          <p className="text-sm text-gray-500">AI Medical Voice Agent</p>

          <div className="overflow-y-auto mt-32 flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
            {messages?.slice(-4).map((msg: Messages, index) => {
              return (
                <h2 className="text-gray-400 p-2" key={index}>
                  {msg.role}: {msg.text}
                </h2>
              );
            })}
            {liveTranscript && liveTranscript.length > 0 && (
              <h2 className="font-bold ">
                {currentRoll} : {liveTranscript}
              </h2>
            )}
          </div>

          {!callStarted ? (
            <Button className="mt-20" onClick={StartCall}>
              
              {loading ? <Loader className="animate-spin" /> :
              <PhoneCall />} Start Call
            </Button>
          ) : (
            <Button className="mt-20" variant={"destructive"} onClick={endCall}>
             {loading ? <Loader className="animate-spin" /> :
              <PhoneCall />} End Call
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicalVoiceAgent;
