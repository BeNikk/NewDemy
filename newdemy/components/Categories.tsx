"use client";

import { Category } from "@prisma/client";
import {FcEngineering,FcFilmReel,FcMultipleDevices,FcMusic,FcOldTimeCamera,FcSalesPerformance,FcSportsMode} from 'react-icons/fc';
import { IconType } from "react-icons";
import { FaHandHoldingMedical } from "react-icons/fa6";
import CategoryItem from "./CategoryItem";


interface CategoryProps{
    items:Category[],

}

const iconMap:Record<Category["name"], IconType>={
    "Music":FcMusic,
    "Photography":FcOldTimeCamera,
    "Fitness & Nutrition":FcSportsMode,
    "Accounting":FcSalesPerformance,
    "Computer Science":FcMultipleDevices,
    "Filming":FcFilmReel,
    "Medical Science":FaHandHoldingMedical,


}

export const Categories=({items}:CategoryProps)=>{
    return(
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {
                items.map((item)=>(
                    <CategoryItem key={item.id} label={item.name} icon={iconMap[item.name]} value={item.id}/>
                ))
            }
        </div>
    )
}