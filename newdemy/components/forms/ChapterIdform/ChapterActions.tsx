"use client";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
interface ChapterActionsInterface{
    disabled:boolean;
    courseId:string;
    chapterId:string;
    isPublished:boolean;
}

export const ChapterActions=({disabled,courseId,chapterId,isPublished}:ChapterActionsInterface)=>{
    const [loading,setLoading]=useState(false);
    const router=useRouter();

    const onClick=async()=>{
        try{
            setLoading(true);
            if(isPublished){
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
                toast.success("Chapter unpublished");
            }
            else{
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
                toast.success("Chapter published");
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
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
            toast.success("Chapter delete");
            router.refresh();
            router.push(`/teacher/courses/${courseId}`)

        }
        catch{
            toast.error("Something went wrong q")
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