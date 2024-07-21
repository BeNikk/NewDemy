"use client";

import { formatPrice } from "@/lib/format";
import { Button } from "./ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseEnrollButtonProps{
    price:number,
    courseId:string
}
export const CourseEnrollButton=({price,courseId}:CourseEnrollButtonProps)=>{

    const [isLoading,setisLoading]=useState(false);
    async function onClick(){
        try {
            setisLoading(true);
            const response=await axios.get(`/api/courses/${courseId}/checkout`);
            window.location.assign(response.data.url);

        } catch (error) {
            toast.error("Something went wrong");
            
        }finally{
            setisLoading(false);
        }
    }

    return(
        <Button onClick={onClick} disabled={isLoading} className="w-full md:w-auto" size={"sm"}>
            Enroll for {formatPrice(price)}
        </Button>
    )
}