"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Divide, LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./SearchInput";

const NavbarRoutes = () => {
    const pathname=usePathname();
    const isTeacherPage=pathname?.startsWith(`/teacher`);
    const isPlayerPage=pathname?.includes('/courses');
    const isSearchPage=pathname==='/search';

    
    return ( 
        <>
        {isSearchPage && (<div className="hidden md:block">
            <SearchInput/>

        </div>)}
        <div className="flex gap-x-2 ml-auto">
            {(isTeacherPage || isPlayerPage) 
            ? (
                <Link href={'/'}>

                <Button variant={'ghost'}>
                    <LogOut className="h-4 w-4 mr-2 "/>
                    Exit
                </Button>
                </Link>
            ):(
                <Link href={'/teacher/courses'}>
                    <Button size={'sm'} variant={'ghost'}>
                        Teacher Mode
                    </Button>
                </Link>
            ) }

            <UserButton />

        </div>
        </>
     );
}
 
export default NavbarRoutes;