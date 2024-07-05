"use client";

import { Compass, Layout } from "lucide-react";
import SidebarItem from "./SidebarItem";

const guestRoute=[{
    icon:Layout,
    label:"Dashboard",
    href:"/"
},
{
    icon:Compass,
    label:"Browse",
    href:"/search"
}]
const SidebarRoutes = () => {
    return (
        <div className="flex flex-col w-full ">
            {guestRoute.map((route)=>(
                <SidebarItem key={route.href} label={route.label} icon={route.icon} href={route.href}/>
            ))}

        </div>
      );
}
 
export default SidebarRoutes;