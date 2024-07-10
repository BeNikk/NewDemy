import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Pattaya } from "next/font/google";
import { NextResponse } from "next/server";

export async function DELETE(req:Request,{params}:{params:{courseId:string,attachmentId:string}}){
    try{
        const {userId}=auth();
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
        const attachment=await db.attachment.delete({
            where:{
                courseId:params.courseId,
                id:params.attachmentId
            }
        })
        return NextResponse.json(attachment);


    }catch{
        console.log("Delete error in attachment error");
        return new NextResponse("Internal error",{status:500});

    }
}