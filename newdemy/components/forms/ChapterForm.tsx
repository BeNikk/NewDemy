"use client";

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm} from "react-hook-form";


import { Form,FormControl,FormDescription,FormField,FormItem,FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, PencilIcon, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import { Chapter, Course } from '@prisma/client';
import { ChapterList } from '../shared/ChapterList';


interface ChapterFormInterface{
    initialData:Course & {chapters:Chapter[]};
    courseId:string;

}

const formSchema=z.object({
   title:z.string().min(1),

})


const ChapterForm = ({initialData,courseId}:ChapterFormInterface) => {
    const router=useRouter();
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            title: ""

        }
     });
    const [isCreating,setCreating]=useState(false);
    const [isUpdating,setUpdating]=useState(false);
    const toggleCreating=()=>{
        setCreating((current)=>!current)
    }

    const {isSubmitting,isValid}=form.formState;
    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
        try{
            await axios.post(`/api/courses/${courseId}/chapters`,values);
            toast.success("Chapter Created");
            toggleCreating();
            router.refresh();


        }catch{
            toast.error("Something went wrong");
        }
    }

    async function onReorder(updateData:{id:string;position:number}[]){
        try{
            setUpdating(true); 
            const values={list:updateData};
            await axios.put(`/api/courses/${courseId}/chapters/reorder`,values);
            toast.success("Chapters reordered");
            router.refresh();

        }catch(error){
            toast.error("Something went wrong ");
        }
        finally{
            setUpdating(false);
        }


    }
    function onEdit(id:string){
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);

    }


    return ( 
        <div className=' relative mt-6 border bg-slate-100 rounded-md p-4'>
            {isUpdating && (
                <div className='absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center'>
                    <Loader2 className='animate-spin h-6 w-6 text-sky-700 '/>

                    </div>
            )}
            <div className='font-md flex items-center justify-between'>
                Course chapters
                <Button onClick={toggleCreating} variant={"ghost"}>
                    {isCreating?(<>Cancel</>):(<>
                        <PlusCircle className='h-4 w-4 mr-2' />
                        Add a chapter
                    </>)}

                    
                </Button>

            </div>
           
            {isCreating && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                        <FormField control={form.control} name="title" render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder='eg.Introduction to the course' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <div className='flex items-center gap-x-2'>
                            <Button disabled={!isValid || isSubmitting}>
                              Create
                            </Button>

                        </div>

                    </form>

                </Form>
            )}
            {!isCreating && (
                <div className={cn("text-sm mt-2 ",initialData.chapters.length && "text-slate-500 italic")}>
                   {!initialData.chapters.length && "No chapters"}
                   {/* { adding a list of chapters} */}
                   <ChapterList onEdit={onEdit} onReorder={onReorder} items={initialData.chapters || []}/>
                </div>
            )}
            {
                isCreating && (
                    <p className='text-xs text-muted-foreground mt-4'>
                        Drag and drop to reorder the chapters
                    </p>
                )
            }


        </div>
     );
}
 
export default ChapterForm;