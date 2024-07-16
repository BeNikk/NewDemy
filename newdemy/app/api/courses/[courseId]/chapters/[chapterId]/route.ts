import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from '@mux/mux-node';


const {video}=new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
  });

export async function DELETE(req:Request,{params}:{params:{courseId:string,chapterId:string}}){
    try{

        const {userId}=auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:400});
        }
        const ownCourse=await db.course.findUnique({where:{
            id:params.courseId,
            userId:userId
        }});
        if(!ownCourse){
            return new NextResponse("Unauthorized",{status:400});
        }
        const chapter=await db.chapter.findUnique({
            where:{
                id:params.chapterId,
                courseId:params.courseId
            }
        })
        if(!chapter){
            return new NextResponse("Not found",{status:404});
        }
        if(chapter.videoUrl){
            const existingMuxData=await db.muxData.findFirst({
                where:{
                    chapterId:params.chapterId,
                }
            });
            if(existingMuxData){
                await video.assets.delete(existingMuxData.assetId);
                await db.muxData.delete({
                    where:{
                        id:existingMuxData.id,
                    }
                })
            }

        }
        const deletedChapter=await db.chapter.delete({
            where:{
                id:params.chapterId,
            }
        })
        const publishedChapterinCourse=await db.chapter.findMany({
            where:{
                courseId:params.courseId,
                isPublished:true
            }
        })
        if(!publishedChapterinCourse.length){
            await db.chapter.update({
                where:{
                    id:params.courseId
                },
                data:{
                    isPublished:false
                }
            })
        }
        return NextResponse.json(deletedChapter);

    }catch(error){
        console.log("edititng chapter error",error);
        return new NextResponse("Internal server error",{status:500});


    }

  }

export async function PATCH(req:Request,{params}:{params:{courseId:string,chapterId:string}}){
    try {
        const {userId}=auth();
        const {isPublished,...values}=await req.json();
        if(!userId){
            return new NextResponse("Unauthorized",{status:400});
        }
        const ownCourse=await db.course.findUnique({where:{
            id:params.courseId,
            userId:userId
        }});
        if(!ownCourse){
            return new NextResponse("Unauthorized",{status:400});


        }
        const chapter=await db.chapter.update({
            where:{
                id:params.chapterId,
                courseId:params.courseId
            },
            data:{
                ...values
            }
        })
        //handling video upload;
        if(values.videoUrl){
            const existingMuxData=await db.muxData.findFirst({
                where:{
                    chapterId:params.chapterId,

                }
            })
            if(existingMuxData){
                await video.assets.delete(existingMuxData.assetId);
                await db.muxData.delete({
                    where:{
                        id:existingMuxData.id
                    }
                })
            }
            const asset=await video.assets.create({
                input:values.videoUrl,
                playback_policy:["public"],
                test:false
            })

            await db.muxData.create({
                data:{
                    chapterId:params.chapterId,
                    assetId:asset.id,
                    playBackId:asset.playback_ids?.[0]?.id

                }
            })
        }
        return NextResponse.json(chapter);
    } catch (error) {
        console.log("edititng chapter error",error);
        return new NextResponse("Internal server error",{status:500});
    }
    
}
