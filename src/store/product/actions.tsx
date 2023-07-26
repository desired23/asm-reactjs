import { addProduct, deleteProduct, getAllProduct, updateProduct } from "../../api/product";
import { IProduct } from "../../interfaces/product";
import { GetListDipatchType, AddDipatchType, UpdateDipatchType, DeleteDipatchType } from './type';

interface IGetListProductPayload{
    products: IProduct[],
    loading: boolean,
    error: unknown 
}
export type GetListProductAction = {
    type: 'product-get-list',
    payload: IGetListProductPayload
}
export type AddProductAction = {
    type: 'add-product',
    payload: IProduct
}
export type UpdateProductAction = {
    type: 'update-product',
    payload: IProduct
}
export type DeleteProductAction = {
    type: 'delete-product',
    payload: string
}
export const getProductListAction = () => {
    return async (dispatch: GetListDipatchType) => {
      try {
        const response = await getAllProduct(); // Sử dụng await để chờ kết quả trả về từ getAllProduct()
        const data = response.data; // Gán giá trị từ kết quả trả về vào biến data
  
         // Kiểm tra kiểu dữ liệu của data, nên là một mảng (array) hoặc object
        
        dispatch({
          type: "product-get-list",
          payload: {
            products: data,
            loading: false,
            error: null
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
  };
export const addProductAction = (product:IProduct) => {
    return (dispatch: AddDipatchType) =>{
        try {
            addProduct(product).catch((error)=>console.log(error))
            dispatch({
                type: 'add-product',
                payload: product
            })
        } catch (error) {
            console.log(error);
        }
    }
    }
    export const updateProductAction = (product:IProduct) => {
        return (dispatch: UpdateDipatchType) =>{
            try {
                    updateProduct(product).catch((error)=>console.log(error))
                dispatch({
                    type: 'update-product',
                    payload: product
                })
            } catch (error) {
                console.log(error);
            }
        }
        }
        export const deleteProductAction = (id:string) => {
            return (dispatch: DeleteDipatchType) =>{
                try {
                        deleteProduct(id).catch((error)=>console.log(error))
                    dispatch({
                        type: 'delete-product',
                        payload: id
                    })
                } catch (error) {
                    console.log(error);
                }
            }
            }