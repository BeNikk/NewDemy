"use client";

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm} from "react-hook-form";


import { Form,FormControl,FormDescription,FormField,FormItem,FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Textarea } from '../../ui/textarea';
import { Chapter, Course } from '@prisma/client';
import { Editor } from '@/components/editor';
import { Preview } from '@/components/preview';
import { Checkbox } from '@/components/ui/checkbox';


interface ChapterAccessFormInterface{
    initialData:Chapter;
    chapterId:string;
    courseId:string;

}

const formSchema=z.object({
   isFree:z.boolean().default(false)
})


const ChapterAccessForm = ({initialData,courseId,chapterId}:ChapterAccessFormInterface) => {
    const router=useRouter();
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
           isFree: !!initialData?.isFree
        }
     });
    const [isEditing,setEditing]=useState(false);
    const toggleEdit=()=>{setEditing((current)=>!current)}

    const {isSubmitting,isValid}=form.formState;
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
                Chapter access settings
                <Button onClick={toggleEdit} variant={"ghost"}>
                    {isEditing?(<>Cancel</>):(<>
                        <PencilIcon className='h-4 w-4 mr-2' />
                        Chapter access
                    </>)}

                    
                </Button>

            </div>
            {!isEditing && (
                <div className={cn("text-sm mt-2",!initialData.description && "text-slate-500 italic")}>
                   {initialData.isFree?<>This chapter is free for preview</>:<>Purchase the course to unlock</>}
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                        <FormField control={form.control} name="isFree" render={({field})=>(
                            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                                    
                                </FormControl>
                                <div className='space-y-1 leading-none'>
                                    <FormDescription>
                                        Check this box if you want to make the chapter free for preview.

                                    </FormDescription>

                                </div>
                                
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <div className='flex items-center gap-x-2'>
                            <Button disabled={!isValid || isSubmitting}>
                                Save
                            </Button>

                        </div>

                    </form>

                </Form>
            )}


        </div>
     );
}
 
export default ChapterAccessForm;