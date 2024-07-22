import { IProduct } from "./Product";
import mongoose , { Document, Schema } from "mongoose";

export interface CartItem extends Document {
    product: IProduct;
    quantity: number;
}

const CartItemSchema: Schema<CartItem> = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Please provide a product for this cart item"],
    },
    quantity: {
        type: Number,
        required: [true, "Please provide a quantity for this cart item"],
    },
});

const CartItemModel = mongoose.models.CartItem as mongoose.Model<CartItem> || mongoose.model<CartItem>("CartItem", CartItemSchema);

export default CartItemModel;