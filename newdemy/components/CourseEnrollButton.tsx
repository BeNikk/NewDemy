"use client";

import { formatPrice } from "@/lib/format";
import { Button } from "./ui/button";

interface CourseEnrollButtonProps{
    price:number,
    courseId:string
}
export const CourseEnrollButton=({price,courseId}:CourseEnrollButtonProps)=>{
    return(
        <Button className="w-full md:w-auto" size={"sm"}>
            Enroll for {formatPrice(price)}
        </Button>
    )
}