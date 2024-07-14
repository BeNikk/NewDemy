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


interface ChapterTitleFormInterface{
    initialData:{
        title:string,
    };
    courseId:string;
    chapterId:string;
}

const formSchema=z.object({
    title:z.string().min(1,{
        message:"Title is required"
    }),
})


const ChapterTitleForm = ({initialData,courseId,chapterId}:ChapterTitleFormInterface) => {
    const router=useRouter();
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData
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
                Chapter Title
                <Button onClick={toggleEdit} variant={"ghost"}>
                    {isEditing?(<>Cancel</>):(<>
                        <PencilIcon className='h-4 w-4 mr-2' />
                        Edit Title
                    </>)}

                    
                </Button>

            </div>
            {!isEditing && (
                <p>
                    {initialData.title}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                        <FormField control={form.control} name="title" render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder='eg.What is devops' {...field}/>
                                </FormControl>
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
 
export default ChapterTitleForm;