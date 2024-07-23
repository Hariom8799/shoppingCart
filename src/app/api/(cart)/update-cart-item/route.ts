import CartItemModel from "@/models/CartItem";
import dbConnect from "@/lib/dbConnect";

export async function PATCH(request: Request) {
    await dbConnect();

    try {
        const { id, quantity } = await request.json();

        if (!id || !quantity) {
            return Response.json({
                message: "Please provide both an item id and a quantity",
            }, { status: 400 });
        }

        const cartItem = await CartItemModel.findById(id);

        if (!cartItem) {
            return Response.json({
                message: "Cart item not found",
            }, { status: 404 });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        return Response.json({
            message: "Successfully updated the quantity",
            data: cartItem,
        }, { status: 200 });
    } catch (err: any) {
        console.log(err);
        return Response.json({
            message: "An error occurred while updating the quantity",
            error: err,
        }, { status: 500 });
    }
}
