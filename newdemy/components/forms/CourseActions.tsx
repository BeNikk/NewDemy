"use client";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
interface CourseActionsInterface{
    disabled:boolean;
    courseId:string;
    isPublished:boolean;
}

export const CourseActions=({disabled,courseId,isPublished}:CourseActionsInterface)=>{
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    const confetti=useConfettiStore();

    const onClick=async()=>{
        try{
            setLoading(true);
            if(isPublished){
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course unpublished");
            }
            else{
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course published");
                confetti.onOpen();
            }
            router.refresh();


        }catch(error){
            console.log(error);
            toast.error("Something went wrong");


        }finally{
            setLoading(false);
        }
    }


    const onDelete=async()=>{
        try{
            setLoading(true);
            await axios.delete(`/api/courses/${courseId}`);
            toast.success("Course deleted");
            router.refresh();
            router.push(`/teacher/courses`)

        }
        catch{
            toast.error("Something went wrong ")
        }finally{
            setLoading(false);
        }
    }
    return(
        <>
        <div className="flex items-center gap-x-2">
            <Button onClick={onClick} disabled={disabled} variant={"outline"} size={"sm"}>
                {isPublished?"Unpublish":"Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>

            <Button size={"sm"} disabled={loading} >
                <Trash className="size-4"/>
            </Button>
            </ConfirmModal>

        </div>
        </>
    )
}