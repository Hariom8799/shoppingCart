import CartItemModel from "@/models/CartItem";
import dbConnect from "@/lib/dbConnect";

export async function DELETE(request : Request , {params} : {params : {messageid : string}}){
    await dbConnect();
    const msgID = params.messageid;

    try{

        if(!msgID){
            return Response.json({
                message: "Please provide an id for the cart item",
            }, {status: 400});
        }

        const cartItem = await CartItemModel.findByIdAndDelete(msgID);

        if(!cartItem){
            return Response.json({
                message: "The cart item with the provided id does not exist",
            }, {status: 404});
        }

        return Response.json({
            message: "Successfully deleted the cart item",
            data: cartItem,
        }, {status: 200});

    }
    catch(err : any){
        console.log(err);
        return Response.json({
            message: "An error occurred while deleting the cart item",
            error: err,
        }, {status: 500});
    }
}