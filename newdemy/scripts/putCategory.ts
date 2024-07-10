const {PrismaClient}=require("@prisma/client");
const database=new PrismaClient();
async function main(){
    try{
        await database.category.createMany({
            data:[
                {name:"Computer science"},
                {name:"Music"},
                {name:"Fitness & Nutrition"},
                {name:"Photography"},
                {name:"Accounting"},
                {name:"Medical Science"},
                {name:"Filming"},



            ]
        });
        console.log("success");

    }catch{
        console.log("error occured in putCategory.ts");
    }finally{
        await database.$disconnect();
    }
}
main();