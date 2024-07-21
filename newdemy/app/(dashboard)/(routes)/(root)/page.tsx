import { getDashboardCourses } from "@/actions/getDashboard";
import { CourseList } from "@/components/CourseList";
import InfoCard from "@/components/Infocard";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";

const Home = async() => {
    const {userId}=auth();
    if(!userId){
        return redirect('/');
    }
    const {completedCourses,coursesInProgress}=await getDashboardCourses(userId);
    return ( 
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* info card */}
                    <InfoCard icon={Clock} label={"In progress"} numberOfItems={coursesInProgress.length}/>
                    <InfoCard icon={CheckCircle} variant="success" label={"Completed"} numberOfItems={completedCourses.length}/>



                

            </div>
            <CourseList items={[...coursesInProgress,...completedCourses]}/>
        </div>
     );
}
 
export default Home;