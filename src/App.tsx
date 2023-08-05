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
import { useEffect } from 'react'
import { IRootState } from './store';
import { addProductAction, deleteProductAction, getProductListAction, updateProductAction } from './store/product/actions';
import { IProduct } from './interfaces/product';

import { addCategoryAction, deleteCategoryAction, getCategoryListAction, updateCategoryAction } from './store/category/actions';

import { ICategory } from './interfaces/category';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
function App() {
  const dispatch: Dispatch<any> = useDispatch()
  const productState = useSelector((state: IRootState) => state.product)
  const categoryState = useSelector((state: IRootState) => state.category)
  useEffect(() => {
    dispatch(getProductListAction());
    dispatch(getCategoryListAction());
  }, [dispatch])



  // console.log( productState.products);
  // console.log( categoryState.categories);


  const del = (id: string) => {
    dispatch(deleteProductAction(id))
  }
  const onUpdate = (product: IProduct) => {
    dispatch(updateProductAction(product))
  }
  const onAdd = (product: IProduct) => {
    dispatch(addProductAction(product))
  }
  const onUpdateCategory = (category: ICategory) => {
    dispatch(updateCategoryAction(category))
  }
  const onAddCate = (category: ICategory) => {
    dispatch(addCategoryAction(category))
  }
  const onRemoveCate = (id: string) => {
    dispatch(deleteCategoryAction(id))
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="detail" element={<DetailPage />} />
        </Route>
        <Route path='/admin'>
          <Route index element={<DashBoard />} />
          <Route path='products'>
            <Route index element={<ProductManagementPage categories={categoryState.categories} onHandleRemove={del} products={productState.products} />} />
            <Route path='add' element={<AddProductPage onAdd={onAdd} categories={categoryState.categories} />} />
            <Route path=':id/update' element={<UpdateProductPage onUpdate={onUpdate} categories={categoryState.categories} products={productState.products} />} />
          </Route>
          <Route path='categories'>
            <Route index element={<CategoryManagementPage onHandleRemoveCate={onRemoveCate} categories={categoryState.categories} />} />
            <Route path='add' element={<AddCategoryPage onAddCate={onAddCate} />} />
            <Route path=':id/update' element={<UpdateCategoryPage onUpdateCate={onUpdateCategory} categories={categoryState.categories} />} />
          </Route>
          <Route path='info'>
          </Route>
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

      </Routes>
    </div>

  );
}

export default App;