"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
interface CourseProgressProps{
    chapterId:string,
    courseId:string,
    nextChapterId?:string,
    isCompleted?:boolean
}

const CourseProgressButton = ({chapterId,courseId,nextChapterId,isCompleted}:CourseProgressProps) => {
    const Icon=isCompleted?XCircle:CheckCircle;
    const router=useRouter();
    const confetti=useConfettiStore();
    const [loading,setisLoading]=useState(false);
    async function onClick(){
        try {
            setisLoading(true);
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,{
                isCompleted:!isCompleted
            });
            if(!isCompleted && !nextChapterId){
                confetti.onOpen();
            }
            if(!isCompleted && nextChapterId){
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);


            }   
            toast.success("Progress updated");
            router.refresh();         
        } catch (error) {
            toast.error("something went wrong");
        }finally{
            setisLoading(false);
        }
    }
    return ( 
        <div>
            <Button disabled={loading} onClick={onClick} type="button" variant={isCompleted?"outline":"success"} className="w-full md:w-auto">
                {isCompleted?"Not completed" :"Mark as complete"}
                <Icon className="size-4 ml-2 "/>
            </Button>
        </div>
     );
}
 
export default CourseProgressButton;