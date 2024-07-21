import { LucideIcon } from "lucide-react";
import IconBadge from "./shared/Iconbadge";

interface InfocardProps{
variant?:"default" | "success",
label:string,
icon:LucideIcon,
numberOfItems:number
}

const InfoCard = ({variant,label,icon:Icon,numberOfItems}:InfocardProps) => {
    return (
        <div className="border rounded-md flex items-center gap-x-2 p-3 ">
            <IconBadge variant={variant} icon={Icon} />
            <div>
                <p className="font-medium">{label}</p>
                <p>{numberOfItems} {numberOfItems===1? "Course":"Courses"}</p>
            </div>

        </div>
      );
}
 
export default InfoCard;