"use client";

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm} from "react-hook-form";


import { Button } from '../../ui/button';
import { ImageIcon, PencilIcon, PlusCircle, Video } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Textarea } from '../../ui/textarea';
import Image from 'next/image';
import { Chapter, Course, MuxData } from '@prisma/client';
import { FileUpload } from '../../fileUpload';
import MuxPlayer from '@mux/mux-player-react';


interface ChapterVideoInterface{
    initialData:Chapter & {muxData?:MuxData | null};
    courseId:string;
    chapterId:string;


}

const formSchema=z.object({
    videoUrl:z.string().min(1)
})


const ChapterVideoForm = ({initialData,courseId,chapterId}:ChapterVideoInterface) => {
    const router=useRouter();
    
    const [isEditing,setEditing]=useState(false);
    const toggleEdit=()=>{setEditing((current)=>!current)}

    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`,values);
            toast.success("Chapter updated successfully");
            toggleEdit();
            router.refresh();


        }catch{
            toast.error("Something went wrong");
        }
    }


    return ( 
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-md flex items-center justify-between'>
                Chapter video
                <Button onClick={toggleEdit} variant={"ghost"}>
                    {isEditing && (<>Cancel</>)}
                    {!isEditing && !initialData.videoUrl &&(
                <>
                <PlusCircle className='h-4 w-4 mr-2'/>
                Add a video
                </>
            )}
            {!isEditing && initialData.videoUrl && (
                <>
                <PencilIcon className='h-4 w-4 mr-2'/>
                Edit your video
                </>
            )}
                </Button>

            </div>
            
            {!isEditing && (!initialData.videoUrl ? (
                <>
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                    <Video className='h-10 w-10 text-slate-500'/>

                </div>
                </>
            ):(
                <>
                <div className='relative aspect-video mt-2'>
                    <MuxPlayer playbackId={initialData?.muxData?.playBackId || ""}/>
                </div>
                </>
            ))}
            {isEditing && (
                <div>
                    <FileUpload endpoint='chapterVideo' onChange={(url)=>{if(url){
                        onSubmit({videoUrl:url});
                    }}}/>
                    <div className='text-sm text-muted-foreground mt-4  '>
                        Upload chapter's video

                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing &&(
                <div>Videos can take a few minutes to load. Refresh the page if video does not appear</div>
            )}


        </div>
     );
}
 
export default ChapterVideoForm;