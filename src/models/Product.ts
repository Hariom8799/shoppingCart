import mongoose, { Schema , Document } from "mongoose";

export interface IProduct extends Document{
    name: string;
    price: number;
    category?: string;
    image: string;
}

const ProductSchema : Schema<IProduct> = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please provide a name for this product"],
    },
    price : {
        type: Number,
        required: [true, "Please provide a price for this product"],
    },
    category : {
        type: String,
        required: false,
    },
    image : {
        type: String,
        required: [true, "Please provide an image for this product"],
    }
})

const ProductModel = mongoose.models.Product as mongoose.Model<IProduct> || mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;