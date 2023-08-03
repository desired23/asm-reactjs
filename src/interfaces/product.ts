import { ICategory } from "./category";

export interface IProduct{
    _id: string,
    name: string,
    description: string,
    price: number,
    categoryId:ICategory[]
    images:String[]

}