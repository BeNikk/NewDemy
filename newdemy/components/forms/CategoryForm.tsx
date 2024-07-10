"use client";

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm} from "react-hook-form";


import { Form,FormControl,FormDescription,FormField,FormItem,FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import { Course } from '@prisma/client';
import { FileUploadDataWithCustomId } from 'uploadthing/types';
import { Combobox } from '../ui/combobox';


interface CategoryFormInterface{
    initialData:Course
    courseId:string;
    options:{label:string,value:string}[];

}

const formSchema=z.object({
    categoryId:z.string().min(1),
})


const CategoryForm = ({initialData,courseId,options}:CategoryFormInterface) => {
    const router=useRouter();
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            categoryId:initialData?.categoryId || ""
        }
     });

     const [isEditing,setEditing]=useState(false);
     const toggleEdit=()=>{setEditing((current)=>!current)}
     
     const {isSubmitting,isValid}=form.formState;
     const onSubmit=async(values:z.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/courses/${courseId}`,values);
            toast.success("Course updated successfully");
            toggleEdit();
            router.refresh();


        }catch{
            toast.error("Something went wrong");
        }
    }
    const selectedOption=options.find((option)=>option.value===initialData.categoryId);
    return ( 
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-md flex items-center justify-between'>
                Course category
                <Button onClick={toggleEdit} variant={"ghost"}>
                    {isEditing?(<>Cancel</>):(<>
                        <PencilIcon className='h-4 w-4 mr-2' />
                        Edit category
                    </>)}

                    
                </Button>

            </div>
            {!isEditing && (
                <p className={cn("text-sm mt-2",!initialData.categoryId && "text-slate-500 italic")}>
                    {selectedOption?.label|| "No category"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                        <FormField control={form.control} name="categoryId" render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    
                                    <Combobox options={options} {...field}/>
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
 
export default CategoryForm;