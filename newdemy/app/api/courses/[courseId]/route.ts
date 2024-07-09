import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{courseId:string}}){
    try{
        const {userId}=auth();
        const {courseId}=params;
        const values=await req.json();
        if(!userId){
            return new NextResponse("unauthorized",{status:401});
        }
        const course=await db.course.update({
            where:{
                id:params.courseId,
                userId:userId
            },
            data:{
                ...values
            }
        })

        return NextResponse.json(course);
        


    }catch{
    console.log("error occured in courses patch");
    return new NextResponse("Internal error",{status:500});
}


}