"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const SidebarItem = ({icon:Icon,label,href}:{icon:LucideIcon,label:string,href:string}) => {
    const pathname=usePathname();
    const router=useRouter();
    const isActive=(pathname==='/' && href) || (pathname==href) || pathname?.startsWith(`${href}`);
    return ( 
        <div>

        </div>
     );
}
 
export default SidebarItem;