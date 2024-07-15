import ChapterAccessForm from "@/components/forms/ChapterIdform/ChapterAccessform";
import ChapterDescriptionForm from "@/components/forms/ChapterIdform/ChapterDescriptionForm";
import ChapterTitleForm from "@/components/forms/ChapterIdform/ChapterTitleForm";
import IconBadge from "@/components/shared/Iconbadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";


const ChapterId =async ({params}:{params:{courseId:string,chapterId:string}}) => {
    const {userId}=auth();
    if(!userId){
        return redirect("/");
    }
    const chapter=await db.chapter.findUnique({
        where:{
            id:params.chapterId,
            courseId:params.courseId
        },
        include:{
            muxData:true
        }
    })
    if(!chapter){
        return redirect("/");
    }

    const requiredFields=[
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ]
    const totalFields=requiredFields.length;
    const completedFieds=requiredFields.filter(Boolean).length;

    const completionText=`(${completedFieds}/${totalFields})`;


    return ( 
        <div className="p-6 ">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <Link href={`/teacher/courses/${params.courseId}`} className="flex items-center text-sm hover:opacity-75 transition mb-6">
                    <ArrowLeft className="size-4 mr-2"/>
                    Back to course setup
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2 ">
                            <h1 className="text-2xl font-medium">Chapter creation</h1>
                            <span className="text-sm text-slate-700">Complete all fields {completionText}</span>

                        </div>

                    </div>

                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="space-y-4 ">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard}/>
                            <h2 className="text-xl">Customize your chapter</h2>

                        </div>
                        {/* {chapter title form} */}
                        <ChapterTitleForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId}/>
                        <ChapterDescriptionForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId}/>
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={Eye}/>
                            <h2 className="text-xl">
                                Access setting
                            </h2>

                        </div>
                        <ChapterAccessForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId}/>
                    </div>

                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={Video}/>

                    </div>
                </div>

            </div>
        </div>
     );
}
 
export default ChapterId;