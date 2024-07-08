import Navbar from "@/components/fixed/Navbar";
import Sidebar from "@/components/fixed/Sidebar";
import ToasterProvider from "@/components/providers/toaster";
import { ReactNode } from "react";

const DashboardLayout = ({children}:{children:ReactNode}) => {
    return ( 
        <div className="h-full">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <Navbar/>

            </div>
            <div className="hidden md:flex flex-col h-full w-56 fixed inset-y-0  z-50">
                <Sidebar/>
            </div>
            <main className="md:pl-56 pt-[80px]">
                <ToasterProvider/>
            {children}
            </main>

        </div>
     );
}
 
export default DashboardLayout;