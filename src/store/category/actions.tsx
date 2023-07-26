import { addCategory, delCategory, editCategory, getAllCategory } from "../../api/category"
import { ICategory } from "../../interfaces/category"
import { IProduct } from "../../interfaces/product"
import { AddDipatchType, DeleteDipatchType, GetListDipatchType, UpdateDipatchType } from "./type"


interface IGetListCategoryPayload{
    categories: ICategory[],
    loading: boolean,
    error: unknown 
}
export type GetListCategoryAction = {
    type: 'get-list',
    payload: IGetListCategoryPayload
}
export type AddCategoryAction = {
    type: 'add-category',
    payload: ICategory
}
export type UpdateCategoryAction = {
    type: 'update-category',
    payload: ICategory
}
export type DeleteCategoryAction = {
    type: 'delete-category',
    payload: string
}
export const getCategoryListAction = () => {
    return async (dispatch: GetListDipatchType) => {
      try {
        const response = await getAllCategory(); // Sử dụng await để chờ kết quả trả về từ getAllProduct()
        const data:ICategory[] = response.data; // Gán giá trị từ kết quả trả về vào biến data
  
        // Kiểm tra kiểu dữ liệu của data, nên là một mảng (array) hoặc object
        console.log(data);
        dispatch({
          type: "get-list",
          payload: {
            categories: data,
            loading: false,
            error: null
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
  };
export const addCategoryAction = (category:ICategory) => {
    return (dispatch: AddDipatchType) =>{
        try {
            addCategory(category).catch((error)=>console.log(error))
            dispatch({
                type: 'add-category',
                payload: category
            })
        } catch (error) {
            console.log(error);
        }
    }
    }
    export const updateCategoryAction = (category:ICategory) => {
        return (dispatch: UpdateDipatchType) =>{
            try {
                    editCategory(category).catch((error)=>console.log(error))
                dispatch({
                    type: 'update-category',
                    payload: category
                })
            } catch (error) {
                console.log(error);
            }
        }
        }
        export const deleteCategoryAction = (id:string) => {
            return (dispatch: DeleteDipatchType) =>{
                try {
                        delCategory(id).catch((error)=>console.log(error))
                    dispatch({
                        type: 'delete-category',
                        payload: id
                    })
                } catch (error) {
                    console.log(error);
                }
            }
            }