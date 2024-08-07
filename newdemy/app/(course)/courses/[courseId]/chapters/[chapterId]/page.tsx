import { getChapter } from "@/actions/getChapter";
import { Banner } from "@/components/Banner";
import { CourseEnrollButton } from "@/components/CourseEnrollButton";
import CourseProgressButton from "@/components/CourseProgressButton";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { VideoPlayer } from "@/components/VideoPlayer";
import { auth } from "@clerk/nextjs/server";
import { File } from "lucide-react";
import { redirect } from "next/navigation";

const ChapterIdPage =async ({params}:{params:{courseId:string,chapterId:string}}) => {
    const {userId}=auth();
    if(!userId){
        return redirect("/");
    }
    
    const {chapter,course,muxData,attachments,userProgress,purchase,nextChapter}=await getChapter({userId,chapterId:params.chapterId,courseId:params.courseId});
    if(!chapter || !course){
        return redirect("/");
    }

    const isLocked=!chapter.isFree && !purchase;
    const completeOnEnd=!!purchase && !userProgress?.isCompleted;

    return ( 
        <div>
            {userProgress?.isCompleted && (
                <Banner label="You already completed this chapter" variant={"success"}/>
            )}
            {isLocked && (
                <Banner label="you need to purchase this course to watch this chapter" variant={"warning"}/>
            )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20 ">
                <div className="p-4">
                    <VideoPlayer chapterId={params.chapterId} title={chapter.title} courseId={params.courseId} nextChapterId={nextChapter?.id!} playbackId={muxData?.playBackId!} isLocked={isLocked} completeOnEnd={completeOnEnd}/>

                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">
                            {chapter.title}
                        </h2>
                        {purchase ? (
                            // course progress button
                            //course 
                            
                            <div>
                                <CourseProgressButton chapterId={params.chapterId} courseId={params.courseId} nextChapterId={nextChapter?.id} isCompleted={!!userProgress?.isCompleted}/>
                                
                            </div>
                        ):(
                            //course enroll button
                            <CourseEnrollButton courseId={params.courseId} price={course.price!}/>

                        )}

                    </div>
                    <Separator/>
                    <div>
                        <Preview value={chapter.description!} />
                    </div>
                    {!!attachments.length && (
                        <>
                        <Separator/>
                        <div className="p-4">
                            {attachments.map((attachment)=>(
                                <a href={attachment.url} key={attachment.id} target={"_blank"} className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline">
                                    <File/>
                                    <p className="line-clamp-1">{attachment.name}</p>
                                </a>
                            ))}

                        </div>
                        </>
                    )}

                </div>


            </div>
        </div>
     );
}
 
export default ChapterIdPage;