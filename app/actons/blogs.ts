"use server"
import { PrismaClient } from "@prisma/client"

import { NextResponse } from "next/server"
const prisma = new PrismaClient()
export async function getblogs() {
const post=   await prisma.post.findMany({
  
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