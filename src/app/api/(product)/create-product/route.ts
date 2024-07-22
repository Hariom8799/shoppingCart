import dbConnect from "@/lib/dbConnect";
import ProductModel, { IProduct } from "@/models/Product";

export async function POST (request : Request){
    dbConnect();
    try{
        const requestData : IProduct = await request.json();
        const {name,price,category,image} = requestData;

        const product = await ProductModel.create({
            name,price,category,image
        })

        if(!product){
            return Response.json({
                message : "Error in creating product",
                success : false
            },{status : 402});
        }

        return Response.json({
            message : "Product created successfully",
            success : true,
            data : product
        },{status : 200});

    }
    catch(err :any){
        console.log(err);
        return Response.json({
            message : "Error in creating product",
            success : false
        },{status : 500});
    }
}