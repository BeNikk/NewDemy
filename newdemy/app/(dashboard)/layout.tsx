import Sidebar from "@/components/fixed/Sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({children}:{children:ReactNode}) => {
    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-56 fixed inset-y-0 z-50">
                <Sidebar/>
            </div>
            {children}

        </div>
     );
}
 
export default DashboardLayout;