const {PrismaClient}=require("@prisma/client");
const database=new PrismaClient();
async function main(){
    try{
        await database.category.createMany({
            data:[
                {name:"Computer science"},
                {name:"Music"},
                {name:"Fitness "},
                {name:"Photography"},
                {name:"Accounting"},
                {name:"Engineering"},
                {name:"Filming"},

            ]
        });
        console.log("success");

    }catch(error){
        console.log("error occured in putCategory.ts",error);
    }finally{
        await database.$disconnect();
    }
}
main();