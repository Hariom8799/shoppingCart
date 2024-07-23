import CartItemModel  from "@/models/CartItem";
import dbConnect from "@/lib/dbConnect";

export async function GET(request : Request){
    await dbConnect();

    try{
        const cartItems = await CartItemModel.find().populate('product');

        if(!cartItems){
            return Response.json({
                message: "No cart items found",
            }, {status: 404});
        }

        return Response.json({
            message: "Successfully retrieved all cart items",
            data: cartItems,
        }, {status: 200});
    }
    catch(err : any){
        console.log(err);
        return Response.json({
            message: "An error occurred while retrieving cart items",
            error: err,
        }, {status: 500});
    }
}