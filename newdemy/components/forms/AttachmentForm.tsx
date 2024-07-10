"use client";

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm} from "react-hook-form";


import { Button } from '../ui/button';
import { File, ImageIcon, Loader2, PencilIcon, PlusCircle, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import Image from 'next/image';
import { Attachment, Course } from '@prisma/client';
import { FileUpload } from '../fileUpload';


interface AttachmentFormInterface{
    initialData:Course & {attachments:Attachment[]}
    courseId:string;

}

const formSchema=z.object({
    url:z.string().min(1)
})


const AttachmentForm = ({initialData,courseId}:AttachmentFormInterface) => {
    const router=useRouter();
    
    const [isEditing,setEditing]=useState(false);
    const [deleting,setDeleting]=useState<string | null>(null);
    const toggleEdit=()=>{setEditing((current)=>!current)}

    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
        try{
            await axios.post(`/api/courses/${courseId}/attachments`,values);
            toast.success("Course updated successfully");
            toggleEdit();
            router.refresh();


        }catch{
            toast.error("Something went wrong");
        }
    }

    const onDelete=async(id:string)=>{
        try{
            setDeleting(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast.success("Attachment deleted");
            router.refresh();

        }catch{
            toast.error("something went wrong");
        }finally{
            setDeleting(null);
        }
    }


    return ( 
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-md flex items-center justify-between'>
                Course Attachments
                <Button onClick={toggleEdit} variant={"ghost"}>
                    {isEditing && (<>Cancel</>)}
                    {!isEditing  &&(
                <>
                <PlusCircle className='h-4 w-4 mr-2'/>
                Add a file
                </>
            )}
            
                </Button>

            </div>
            
            {!isEditing &&
            (
                <>
                {initialData.attachments.length<=0?<>
                <p className='text-sm mt-2 text-slate-500 italic'>
                    No attachments
                </p>
                </>:<>
                <div className='space-y-2'>
                    {initialData.attachments.map((attachment)=>(
                        <div className='flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md' key={attachment.id}>
                            <File className='size-4 mr-2 flex-shrink-0'/>
                            <p>
                                {attachment.name}
                            </p>
                            {deleting==attachment.id &&(
                                <div>
                                    <Loader2 className='size-4 animate-spin'/>
                                </div>
                            )}
                             {deleting!==attachment.id &&(
                                <button className='ml-auto hover:opacity-75 transition' onClick={()=>{
                                    onDelete(attachment.id);
                                }}>
                                    <X className='size-4'/>
                                </button>
                            )}
                            </div>

                    ))}


                </div>
                </>}
                </>
            ) 
            }
            {isEditing && (
                <div>
                    <FileUpload endpoint='courseAttachments' onChange={(url)=>{if(url){
                        onSubmit({url:url});
                    }}}/>
                    <div className='text-sm text-muted-foreground mt-4  '>
                      Add anything which the students require

                    </div>
                </div>
            )}


        </div>
     );
}
 
export default AttachmentForm;