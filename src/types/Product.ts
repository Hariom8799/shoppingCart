export interface Product{
    _id: null | undefined | string;
    id : number;
    name : string;
    price : number;
    image : string;
    category? : string;
}
