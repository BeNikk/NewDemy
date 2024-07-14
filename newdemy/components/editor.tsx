"use client";

import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import 'react-quill/dist/quill.snow.css';

interface EditorInterface{
    onChange:(value:string)=>void;
    value:string;
}

export const Editor=({onChange,value}:EditorInterface)=>{
    //avoiding hydration errors
    const ReactQuill=useMemo(()=>dynamic(()=>import("react-quill"),{ssr:false}),[]);
    return(
        <div className="bg-white">
            <ReactQuill theme="snow" value={value} onChange={onChange}/>
        </div>
    )


}