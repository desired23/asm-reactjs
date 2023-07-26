import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/Pages/HomePage';
import DetailPage from './components/Pages/DetailPage';
import DashBoard from './components/Pages/admin/DashBoard';
import ProductManagementPage from './components/Pages/admin/product/ProductManagementPage';
import AddProductPage from './components/Pages/admin/product/AddProductPage';
import UpdateProductPage from './components/Pages/admin/product/UpdateProductPage';
import CategoryManagementPage from './components/Pages/admin/category/CategoryManagementPage';
import AddCategoryPage from './components/Pages/admin/category/AddCategoryPage';
import UpdateCategoryPage from './components/Pages/admin/category/UpdateCategoryPage';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {useEffect} from 'react'
import { IRootState } from './store';
import { deleteProductAction, getProductListAction } from './store/product/actions';
import { IProduct } from './interfaces/product';
import { GetListCategoryAction, getCategoryListAction } from './store/category/actions';
function App() {
  const dispatch:Dispatch<any> = useDispatch()
  const productState = useSelector((state:IRootState)=>state.product)
  const categoryState = useSelector((state:IRootState)=>state.category)
  useEffect(()=>{ 
    dispatch(getProductListAction());         
    dispatch(getCategoryListAction());
  },[dispatch])


console.log( productState.products);
console.log( categoryState.categories);

const del = (id: string) =>{
  dispatch(deleteProductAction(id))
}
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<HomePage/>}/>
        <Route path="detail" element={<DetailPage />} />
      </Route>
      <Route path='/admin'>
        <Route index element={<DashBoard />} />
        <Route path='products'>
          <Route index element={<ProductManagementPage categories={categoryState.categories} onHandleRemove={del} products={productState.products} />} />
          <Route path='add' element={<AddProductPage/>} />
          <Route path=':id/update' element={<UpdateProductPage categories={categoryState.categories} onUpdate={()=>{}} products={productState.products}/>} />
        </Route>
        <Route path='categories'>
          <Route index element={<CategoryManagementPage/>} />
          <Route path='add' element={<AddCategoryPage  />} />
          <Route path=':id/update' element={<UpdateCategoryPage  />} />
        </Route>
        <Route path='info'>
        </Route>
      </Route>
    </Routes>
</div>
  );
}

export default App;
