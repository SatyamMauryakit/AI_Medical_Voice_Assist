import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm"; // ✅ make sure to import this if not already

// --- POST method ---
export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json();
  const user = await currentUser();

  try {
    const sessionId = uuidv4();
    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId: sessionId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        notes: notes,
        selectedDoctor: selectedDoctor,
        createdOn: new Date().toISOString(),
      })
      .returning({
        SessionChatTable, // 👈 you can just return `*` if needed
      });

    return NextResponse.json(result[0]?.SessionChatTable); // ✅ double check result shape
  } catch (e) {
    console.error("POST Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// --- GET method ---
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const user = await currentUser();

    // ✅ FIXED: `.form` ➜ should be `.from`
    const result = await db
      .select()
      .from(SessionChatTable) // ✅ FIXED here
      .where(eq(SessionChatTable.sessionId, sessionId));

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]); // ✅ safe return
  } catch (e) {
    console.error("GET Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
