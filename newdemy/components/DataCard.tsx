import { formatPrice } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DataCardProps{
    value:number,
    label:string,
    shouldFormat?:boolean
}


const Datacard = ({value,label,shouldFormat}:DataCardProps) => {
    return ( 
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {label}
                </CardTitle>


            </CardHeader>
            <CardContent>
                <div>
                    {shouldFormat?formatPrice(value):value}
                </div>
            </CardContent>

        </Card>
     );
}
 
export default Datacard;