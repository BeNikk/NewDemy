import { GetCourses } from "@/actions/getCourses";
import { Categories } from "@/components/Categories";
import { CourseList } from "@/components/CourseList";
import { SearchInput } from "@/components/shared/SearchInput";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


interface searchPageProps{
    searchParams:{
        title:string,
        categoryId:string
    }
}

const SearchPage = async({
    searchParams
}:searchPageProps) => {
    const {userId}=auth();
    if(!userId){
        return redirect('/');
    }
    const categories=await db.category.findMany({
        orderBy:{
            name:"asc"
        }
    })
    const courses=await GetCourses({userId,...searchParams});
    return (
         <>
         <div className="px-6 pt-6 md:hidden md:mb-0 block">
            <SearchInput/>

         </div>
        <div className="p-6 space-y-4">
            <Categories items={categories}/>
            <CourseList items={courses}/>
        </div>
         </> 
     );
}
 
export default SearchPage;