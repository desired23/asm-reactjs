
import { useNavigate  } from 'react-router-dom'
import {
  Button,
  Form,

  Input,
} from 'antd';
// import { Button, Checkbox, Form, Input, Select } from 'antd';
import { ICategory } from '../../../../interfaces/category';

interface IProps {
  onAddCate: (category: ICategory) => void
}
const AddCategoryPage = (props: IProps) => {
  const navigate = useNavigate()


 
  const onFinish = (values: any) => {
    props.onAddCate({
      ...values,
    });


    navigate('/admin/categories');
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
          label="Category Name"
          name="name"
          rules={[{ required: true, message: 'Please input your Category name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category price"
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form> 
    </div>
  )
}

export default AddCategoryPage