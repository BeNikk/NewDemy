"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from 'query-string';
export const SearchInput=()=>{
    const [value,setValue]=useState("");
    const debounceVal=useDebounce(value);
    const searchParams=useSearchParams();
    const router=useRouter();
    const pathname=usePathname();

    const currentCategoryId=searchParams.get("categoryId");
    useEffect(()=>{
        //qs.stringify url function -Stringify an object into a URL with a query string and sorting the keys
        const url=qs.stringifyUrl({
            url:pathname,
            query:{
                categoryId:currentCategoryId,
                title:debounceVal,

            }
            
        },{skipNull:true,skipEmptyString:true})
        router.push(url);
    },[debounceVal,currentCategoryId,router,pathname])



    return(
        <div className="relative">
            <Search className="size-4 absolute top-3 left-3 text-slate-600"/>
            <Input value={value} className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus:visible:ring-slate-200" placeholder="Search for a course" onChange={(e)=>setValue(e.target.value)}/>

        </div>
    )
}