
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
import { IProduct } from '../../../../interfaces/product';
import axios from 'axios';

interface IProps {
  categories: ICategory[]
  onAdd: (product: IProduct) => void
}
const AddProductPage = (props: IProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const [urls, setUrls] = useState<string[]>([])
  const navigate = useNavigate()
  const onFinish = (values: any) => {
      if (isUploading) {
          // Hiển thị thông báo lỗi cho người dùng
          console.log("Please wait for the image upload to complete.");
          return;
      } 

      props.onAdd({
          ...values,
          images: urls
      });


      navigate('/admin/products');
  };

  function normFile(e: any) {
      if (Array.isArray(e)) {
          return e;
      }
      return e && e.fileList;
  }

  const handleUpload = async (ev: any) => {
      setIsUploading(true);
      const e = await normFile(ev)
      const CLOUD_NAME = "dqzopvk2t";
      const PRESET_NAME = "ph26019";
      const urls: string[] = [];
      const FOLDER_NAME = "ecma";
      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

      const formData = new FormData();
      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);

      for (const file of e) {
          formData.append("file", file.originFileObj);

          const response = await axios.post(api, formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          });

          urls.push(response.data.secure_url);
      }
      setIsUploading(false)
      setUrls(urls)
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
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="CategoryId"
          name="categoryId"
          rules={[{ required: true, message: 'Please select your Product Category!' }]}
        >
          <Select mode='multiple'>
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

        >
          <Upload beforeUpload={() => false} name="logo" onChange={handleUpload} listType="picture" multiple >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button disabled={isUploading} type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddProductPage