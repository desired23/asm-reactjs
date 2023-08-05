import { Button, Form, Input } from "antd"
import { signin } from "../../api/auth";


const Login = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
        signin(values).then(({ data }) => {
            console.log(data);
            const { accessToken } = data;
            // Lưu token vào local storage hoặc cookie
            localStorage.setItem('token', accessToken);
            // Hoặc sử dụng cookie
            // document.cookie = `token=${accessToken}; path=/`;
            // Tiến hành chuyển hướng người dùng sau khi đăng nhập thành công (nếu cần)
            // navigate('/dashboard');
        }).catch((error) => {
            // Xử lý lỗi đăng nhập;
            console.error('Đăng nhập thất bại', error);
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="container">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}

                initialValues={{  role:'user' }}

                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >


                <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login