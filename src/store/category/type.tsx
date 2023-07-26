import { AddCategoryAction, DeleteCategoryAction, GetListCategoryAction, UpdateCategoryAction } from "./actions"

export type GetListDipatchType = (args : GetListCategoryAction) => GetListCategoryAction
export type AddDipatchType = (args : AddCategoryAction) => AddCategoryAction
export type DeleteDipatchType = (args : DeleteCategoryAction) => DeleteCategoryAction
export type UpdateDipatchType = (args : UpdateCategoryAction) => UpdateCategoryAction
