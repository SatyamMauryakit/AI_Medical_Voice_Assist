import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const user = await currentUser();

    try{
        // Check if User Already Exists
        const users = await db.select().from(usersTable)
        //@ts-ignore
        .where(eq(usersTable.email,user?.primaryEmailAddress?.emailAddress))

        // if not then create new user
        if(users.length === 0){
            const result = await db.insert(usersTable).values({
                name: user?.fullName,
                email:user?.primaryEmailAddress?.emailAddress,
                // @ts-ignore
            credits: 10}).returning({usersTable})
            return NextResponse.json(result[0]?.userTable)
        }

        return NextResponse.json(users[0])

    }

    catch(e){
        return NextResponse.json({error:"Internal Server Error"},{status:500})

    }
}