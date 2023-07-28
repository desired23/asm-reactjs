
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Form,

  Input,
  Select
} from 'antd';
// import { Button, Checkbox, Form, Input, Select } from 'antd';
import { ICategory } from '../../../../interfaces/category';
import { IProduct } from '../../../../interfaces/product';

interface IProps {
  categories: ICategory[]
  onAdd: (product: IProduct) => void
}
const AddProductPage = (props: IProps) => {
  const navigate = useNavigate()


 
  const onFinish = (values: any) => {
    props.onAdd({
      ...values,
    });


    navigate('/admin/products');
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >

        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please input your Category name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product price"
          name="price"
          rules={[{ required: true, message: 'Please input your Category name!' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="CategoryId"
          name="categoryId"
          rules={[{ required: true, message: 'Please select your Product Category!' }]}
        >
          <Select  mode='multiple'>
            {props.categories.map((item, index) => {
              return <Select.Option key={index} value={item._id}>{item.name}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form> 
    </div>
  )
}

export default AddProductPage