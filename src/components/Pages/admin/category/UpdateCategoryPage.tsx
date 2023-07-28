
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
import { useEffect } from 'react';

interface IProps {
  categories:ICategory[]
  onUpdateCate: (category: ICategory) => void
}
const UpdateCategoryPage = (props: IProps) => {
  const [cate, setCate] = useState<ICategory>()
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    setCate(props.categories.find((category: ICategory) => category._id === String(id)))
  }
    , [props, id])

  useEffect(() => {
    setFields()
  }, [cate])
  const [form] = Form.useForm();


  const setFields = () => {
    form.setFieldsValue({
      _id: cate?._id,
      name: cate?.name,
      description: cate?.description,
    })
  }
  const onFinish = (values: any) => {
    props.onUpdateCate({
      ...values,
    });


    navigate('/admin/categories');
  };
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Category id"
          name="_id"
          hidden

        ></Form.Item>
        <Form.Item
          label="Category Name"
          name="name"
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form> 
    </div>
  )
}

export default UpdateCategoryPage