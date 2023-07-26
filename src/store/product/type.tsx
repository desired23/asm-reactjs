import { AddProductAction, DeleteProductAction, GetListProductAction, UpdateProductAction } from "./actions";

export type GetListDipatchType = (args : GetListProductAction) => GetListProductAction
export type AddDipatchType = (args : AddProductAction) => AddProductAction
export type DeleteDipatchType = (args : DeleteProductAction) => DeleteProductAction
export type UpdateDipatchType = (args : UpdateProductAction) => UpdateProductAction
