import { Product} from "./Product";

export interface CartItem{
    _id: any;
    product : Product;
    quantity : number;
}