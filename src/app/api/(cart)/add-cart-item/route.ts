import CartItemModel from "@/models/CartItem";
import dbConnect from "@/lib/dbConnect";

export async function POST(request : Request){
    await dbConnect();

    try{
        const { product, quantity } = await request.json();

        if(!product || !quantity){
            return Response.json({
                message: "Please provide both a product and a quantity",
            }, {status: 400});
        }

        const cartItemExists = await CartItemModel.findOne({product});
        
        if (cartItemExists) {
            return Response.json({
                message: "Item already in the cart. Use the update endpoint to change the quantity.",
            }, { status: 400 });
        }


        const cartItem = await CartItemModel.create({
            product,
            quantity,
        });

        return Response.json({
            message: "Successfully added the item to the cart",
            data: cartItem,
        }, {status: 200});

    }
    catch(err : any){
        console.log(err);
        return Response.json({
            message: "An error occurred while adding the item to the cart",
            error: err,
        }, {status: 500});
    }
}