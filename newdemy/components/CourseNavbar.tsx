import { Chapter, Course, UserProgress } from "@prisma/client"
import NavbarRoutes from "./shared/NavbarRoutes";
import CourseMobileSidebar from "./CourseMobileSidebar";

interface courseNavbarProps{
    course:Course &{
        chapters:(Chapter &{userProgress:UserProgress[] | null})[];
    },
    progressCount:number
    
}
export const CourseNavbar=({course,progressCount}:courseNavbarProps)=>{
    return(
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm ">
            <CourseMobileSidebar course={course} progressCount={progressCount}/>
            <NavbarRoutes/>

        </div>
    )
}