"use client"

import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, PencilIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"


export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({column})=>{
        return(
            <Button variant={'ghost'} onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                Title
                <ArrowUpDown className="size-4 ml-2" />

            </Button>
        )
    },
  },
  {
    accessorKey: "price",
    header: ({column})=>{
        return(
            <Button variant={'ghost'} onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                Price
                <ArrowUpDown className="size-4 ml-2" />

            </Button>
        )
    },
    cell:({row})=>{
        const price=parseFloat(row.getValue("price") || "0");
        const formatPrice=new Intl.NumberFormat("en-US",{
            style:"currency",
            currency:"USD"
        }).format(price);
        return(
            <div>
                {formatPrice}
            </div>
        )
    }
  },
  {
    accessorKey: "isPublished",
    header: ({column})=>{
        return(
            <Button variant={'ghost'} onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                Published
                <ArrowUpDown className="size-4 ml-2" />

            </Button>
        )
    },
    cell:({row})=>{
        const isPublished=row.getValue("isPublished") || false;
        return(
            <Badge className={cn("bg-slate-500",isPublished && "bg-sky-500")}>
                {isPublished?"Published":"Draft"}
            </Badge>
        )
    }
  },
    {
        id:"actions",
        cell:({row})=>{
            const {id}=row.original
            return(
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} className="size-8 p-0">
                            <span className="sr-only">
                                Open menu
                            </span>
                            <MoreHorizontal className="size-4"/>
                        </Button>
                         
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/teacher/courses/${id}`}>
                        <DropdownMenuItem>
                            <PencilIcon className="size-4 mr-2"/>
                            Edit
                        </DropdownMenuItem>
                        </Link>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        } 
    }
 
]
