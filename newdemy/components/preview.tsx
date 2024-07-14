"use client";

import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import 'react-quill/dist/quill.snow.css';

interface PreviewInterface{
    value:string;
}

export const Preview=({value}:PreviewInterface)=>{
    //avoiding hydration errors
    const ReactQuill=useMemo(()=>dynamic(()=>import("react-quill"),{ssr:false}),[]);
    return(
        <div className="bg-white">
            <ReactQuill theme="bubble" value={value} readOnly/>
        </div>
    )


}