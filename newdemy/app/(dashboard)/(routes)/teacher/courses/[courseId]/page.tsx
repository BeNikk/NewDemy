import CategoryForm from "@/components/forms/CategoryForm";
import DescriptionForm from "@/components/forms/DescriptionForm";
import ImageForm from "@/components/forms/imageForm";
import TitleForm from "@/components/forms/TitleForm";
import IconBadge from "@/components/shared/Iconbadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";


const CourseIdPage = async({params}:{params:{courseId:string}}) => {
    const {userId}=auth();
    if(!userId){
        redirect("/");
    }
 
    const course=await db.course.findUnique({
        where:{
            id:params.courseId
        }
    });
    const category=await db.category.findMany({
        orderBy:{
            name:"asc"
        }
    });
    if(!course){
        redirect('/');
    }

    const fieldRequired=[
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ]
    const totalFields=fieldRequired.length;
    const completedField=fieldRequired.filter(Boolean).length;

    const completionText=`(${completedField}/${totalFields})`

    return ( 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-semibold">
                        Course Setup

                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
                    </span>

                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 ">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard}/>
                        <h2 className="text-xl">Customize your course</h2>

                    </div>
                    
                            <TitleForm initialData={course} courseId={course.id} />
                            <DescriptionForm initialData={course} courseId={course.id}/>
                            <ImageForm initialData={course} courseId={course.id}/>
                           <CategoryForm initialData={course} courseId={course.id} options={category.map((cat)=>(
                            {
                                label:cat.name,
                                value:cat.id
                            }
                           ))}/>
                    
                </div>

            </div>

        </div>
     );
}
 
export default CourseIdPage;