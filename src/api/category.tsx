
import { ICategory } from "../interfaces/category"
import instance from "./instance"

const getAllCategory = () => {
    return instance.get('categories')
}
const getOneCategory = (_id:string) => {
    return instance.get(`categories/${_id}`)
}
const addCategory = (category: ICategory) => {
    return instance.post(`categories`, category)
}
const delCategory = (_id:string) => {
    return instance.delete(`categories/${_id}`)
}
const editCategory = (category: ICategory) => {
    return instance.patch(`categories/${category._id}`, category)
}
export {getAllCategory, getOneCategory, delCategory, addCategory, editCategory}