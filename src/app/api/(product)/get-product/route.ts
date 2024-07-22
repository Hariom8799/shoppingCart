import ProductModel from "@/models/Product";
import dbConnect from "@/lib/dbConnect";

export async function GET (request : Request){
    dbConnect();
    try{
        const product = await ProductModel.find();
        if(!product){
            return Response.json({
                message : "Error in fetching product",
                success : false
            },{status : 402});
        }
        return Response.json({
            message : "Product fetched successfully",
            success : true,
            data : product
        },{status : 200});

    }
    catch(err : any){
        console.log(err);
        return Response.json({
            message : "Error in fetching product",
            success : false
        },{status : 500});
    };
    
}