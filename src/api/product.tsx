import { IProduct } from "../interfaces/product"
import instance from "./instance"

const getAllProduct = () => {
    return instance.get('/products')
}
const getOneProduct = (_id: string) => {
    return instance.get(`/products/${_id}`)
}
const addProduct = (product: IProduct) => {
    return instance.post('/products', product)
}
const deleteProduct = (_id: string) => {
    return instance.delete(`/products/${_id}`)
}
const updateProduct = (product: IProduct) => {
    return instance.patch(`/products/${product._id}`, product)
}
export { getAllProduct, getOneProduct, addProduct, deleteProduct, updateProduct }