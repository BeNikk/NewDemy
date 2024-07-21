"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {Loader2,Lock } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti";
import next from "next";

interface VideoPlayerProps{
    playbackId:string,
    courseId:string,
    chapterId:string,
    nextChapterId?:string,
    isLocked:boolean,
    completeOnEnd:boolean,
    title:string

}

export const VideoPlayer=({playbackId,courseId,chapterId,nextChapterId,isLocked,completeOnEnd,title}:VideoPlayerProps)=>{
    const [isReady,setReady]=useState(false);
    const router=useRouter();
    const confetti=useConfettiStore();
    async function onEnd(){
        try {
            if(completeOnEnd){
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,{
                    isCompleted:true
                });
                if(!nextChapterId){
                    confetti.onOpen();
                }
            }
            toast.success("Chapter progress updated");
            router.refresh();
            if(nextChapterId){
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);

            }
            
        } catch (error) {
            toast.error("Something went wrong");
            
        }
    }
    return(
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="size-8 animate-spin text-secondary"/>

                </div>
            )}
            {isLocked &&(
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <Lock className="size-8 "/>
                    <p className="text-sm">This chapter is locked</p>
                </div>
            )}
            {!isLocked &&(
                <MuxPlayer playbackId={playbackId} className={cn(!isReady && "hidden")} title={title} onCanPlay={()=>setReady(true)} onEnded={onEnd} autoPlay/>
                //mux player for better controls, otherwise just use a video tag with autoplay and controls attribute and you are good to go .
            )}

        </div>
    )
}