
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom'
import { ICategory } from '../../../../interfaces/category';

interface DataType {
    key: string | number;
    _id: string;
    name: string;
    description: string;
}
interface IProps {
    categories: ICategory[],
    onHandleRemoveCate: (_id: string) => void
}
const CategoryManagementPage = (props: IProps) => {
    const removeCate = (_id: string) => props.onHandleRemoveCate(_id)
console.log(props.categories);
    const columns: ColumnsType<DataType> = [
        {
            title: 'Categories Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Link to={`/categories/${record._id}`} >{text}</Link>,
        },        
        {
            title: 'Categories description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (

                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => removeCate(record._id)}>Remove</Button>
                    <Button style={{ backgroundColor: 'darkblue' }} type="primary" ><Link to={`/admin/categories/${record._id}/update`}>Update</Link></Button>
                </Space>
            ),
        },
    ];

    const data: DataType[] = props.categories.map((item: ICategory) => {
        return {
            key: item._id,
            ...item

        }
    })

    return (
        <div>
            <Button type='primary'><Link to={'/admin/categories/add'}>Add New Category</Link></Button>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        </div>
    )
}

export default CategoryManagementPage