
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {  UploadOutlined } from '@ant-design/icons';

import {
  Button,
  Form,

  Input,
  Select,
  Upload
} from 'antd';
// import { Button, Checkbox, Form, Input, Select } from 'antd';
import { ICategory } from '../../../../interfaces/category';
import { useEffect } from 'react';
import { IProduct } from '../../../../interfaces/product';
import axios from 'axios';

interface IProps {
  categories: ICategory[]
  products: IProduct[]
  onUpdate: (product: IProduct) => void
}
const UpdateProductPage = (props: IProps) => {
  const [isUploading, setIsUploading] = useState(false);

  console.log(props.categories);
  const [product, setProduct] = useState<IProduct>()
  const [urls, setUrls] = useState<string[]>([])
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    setProduct(props.products.find((product: IProduct) => product._id === String(id)))
  }
    , [props, id])

  useEffect(() => {
    setFields()
  }, [product])
  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      _id: product?._id,
      name: product?.name,
      price: product?.price,
      description: product?.description,
      categoryId: product?.categoryId,
      images: product?.images.map((url) => ({
        uid: url, 
        name: url, 
        url: url, 
      })),
    })
  }
  const onFinish = (values: {
    _id: string;
    name: string;
    description: string;
    price: number,
    categoryId: ICategory[]
    images: {
      url: string,
      uid: string,
      name: string
    }[]
  }) => {
    if (urls.length === 0){
      const url = values.images.map(item => item.url)
      urls.push(...url)
    }
    props.onUpdate({
      ...values,
      images: [...urls]

    });


    navigate('/admin/products');
  };
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleUpload = async (ev: any) => {
    console.log('Upload event:', ev);
    const e = await normFile(ev)
    console.log("e", e);
    const CLOUD_NAME = "dqzopvk2t";
    const PRESET_NAME = "ph26019";
    const urls: string[] = [];
    const FOLDER_NAME = "ecma";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    for (const file of e) {
      if (file.originFileObj) {
        const fileToUpload = file.originFileObj; // Lấy đối tượng tệp từ e.fileList

        formData.append("file", fileToUpload);

        const response = await axios.post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        urls.push(response.data.secure_url);
      } else urls.push(file?.url)
    }

    setUrls(urls)
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
          label="Product id"
          name="_id"
          hidden

        ></Form.Item>
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
        <Form.Item
          name="images"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          initialValue={form.getFieldValue('images')}

        >
          <Upload beforeUpload={() => false}
            name="logo" listType="picture" onChange={handleUpload} multiple>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>

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

export default UpdateProductPage