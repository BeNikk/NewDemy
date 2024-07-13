import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req:Request,{params}:{params:{courseId:string}}){
    try{
        const {userId}=auth();
        const {title}=await req.json();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
        const courseOwner=await db.course.findUnique({
            where:{
                id:params.courseId,
                userId:userId
            }
        })
        if(!courseOwner){
            return new NextResponse("Unauthorized",{status:401});

        }
        const lastChapter=await db.chapter.findFirst({
            where:{
                courseId:params.courseId,

            },
            orderBy:{
                position:"desc"
            }
        });
        const newPosition=lastChapter?lastChapter.position+1:1;
        const chapter=await db.chapter.create({
            data:{
                title:title,
                position:newPosition,
                courseId:params.courseId
            }
        })
        return NextResponse.json(chapter);

    }catch(e){
        console.log("error in posting chapter",e);
        return new NextResponse("Internal error",{status:500});
    }

}