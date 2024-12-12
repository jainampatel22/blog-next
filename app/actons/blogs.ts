"use server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../libs/auth"
import { NextResponse } from "next/server"
const prisma = new PrismaClient()
export async function getblogs(id:string) {
const post=    await prisma.post.findMany({
        where:{published:true},
    })
    if(!post){
        return NextResponse.json({
            message:"no post found"
        })
    }
    return NextResponse.json({
        post
    })
}