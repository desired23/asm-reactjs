import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import productReducer, { IProductState } from './product/reducers';
import categoryReducer, { ICategoryState } from "./category/reducers";


export interface IRootState {
    product:IProductState
    category:ICategoryState

}

const rootReducer = combineReducers({
    product: productReducer,
    category: categoryReducer

})

export const store = createStore(rootReducer,applyMiddleware(thunk));