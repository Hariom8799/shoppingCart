export interface Product{
    _id: Key | null | undefined;
    id : number;
    name : string;
    price : number;
    image : string;
    category? : string;
}
