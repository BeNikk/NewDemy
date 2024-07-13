import AttachmentForm from "@/components/forms/AttachmentForm";
import CategoryForm from "@/components/forms/CategoryForm";
import ChapterForm from "@/components/forms/ChapterForm";
import DescriptionForm from "@/components/forms/DescriptionForm";
import ImageForm from "@/components/forms/imageForm";
import PriceForm from "@/components/forms/PriceForm";
import TitleForm from "@/components/forms/TitleForm";
import IconBadge from "@/components/shared/Iconbadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";


const CourseIdPage = async({params}:{params:{courseId:string}}) => {
    const {userId}=auth();
    if(!userId){
        redirect("/");
    }
 
    const course=await db.course.findUnique({
        where:{
            id:params.courseId,
            userId:userId


        },
        include:{
            attachments:{
                orderBy:{
                    createdAt:"desc"
                }
            },
            chapters:{
                orderBy:{
                   position:"asc"
                }
            }

        }
    });
    const category=await db.category.findMany({
        orderBy:{
            name:"asc"
        },
       
    });
    if(!course){
        redirect('/');
    }

    const fieldRequired=[
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter=>chapter.isPublished),
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
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks}/>
                            <h2 className="text-xl">
                                Course Chapters
                            </h2>

                        </div>
                        <ChapterForm initialData={course} courseId={course.id}/>

                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={CircleDollarSign}/>
                            <h2 className="text-xl">
                                Sell your course
                            </h2>

                        </div>
                        <PriceForm initialData={course} courseId={course.id}/>

                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={File}/>
                            <h2 className="text-xl">
                                Resources & Attachments
                            </h2>

                        </div>
                        <AttachmentForm initialData={course} courseId={course.id}/>
                    </div>

                </div>

            </div>

        </div>
     );
}
 
export default CourseIdPage;