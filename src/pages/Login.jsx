import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Layout, Button, theme, ConfigProvider, Form, Input, Checkbox, Row, Col} from 'antd';
import LoginImg from '../assets/images/login-front.jpg';
import AppLogo from '../assets/images/foodZone-logo.png'
import {loginAdminUser} from "../helpers/ApiHelpers.js";
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";

const {Footer, Content} = Layout;

const footerStyle = {
    textAlign: 'center',
};
const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("/dashboard");
        }
    }, [navigate]);
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        await adminLogin(values);
        console.log(localStorage.getItem("token"));
        if (localStorage.getItem("token") !== null) {
            navigate("/dashboard");
        }else {
            navigate("/login");
        }
    };
    const adminLogin=async (data)=>{
        try {
            const response = await loginAdminUser(data);
            const expirationDate= new Date();
            expirationDate.setDate(expirationDate.getDate()+2);

            const cookieValue=encodeURIComponent('token')+'='+
            encodeURIComponent(response.data.token)+'; expires='+expirationDate.toUTCString()+'; path=/';
            document.cookie=cookieValue;
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: "#faad14",
                    colorInfo: "#faad14",
                    colorWarning: "#fa541c",
                    colorBgBase: "#050606",
                    colorBgContainer: "#050606",
                    //colorBgLayout: "#722ed1"
                    // borderRadius: 13,
                },
                components: {
                    Button: {
                        colorPrimaryHover: "var(--primary-color)"
                    },
                }
            }}
        >
            <Layout
                style={{
                    overflow: 'hidden',
                    height: '100vh'
                }}>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 12,
                        color: "var(--text-color)"
                    }}
                    className="h-full">
                    <Row>
                        <Col xs={{span: 12, offset: 0}} md={{span: 8, offset: 4}} span={24}
                             className="border-r-0 rounded-r-none rounded-xl shadow-sm shadow-primaryColor"
                        >
                            <div style={{height: '80vh'}}
                                 className="w-full  flex flex-col items-center justify-center">
                                <div>
                                    <img src={AppLogo} alt="collapsedLogo" className="w-[160px]"/>
                                </div>
                                <div className=" text-xl pb-6 w-1/2">
                                    Admin Login
                                </div>
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    size="large"
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                               placeholder="Email"/>
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Password!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon"/>}
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item>

                                        <a className="login-form-forgot" href="">
                                            Forgot password
                                        </a>
                                    </Form.Item>

                                    <Form.Item>
                                        <div className="flex items-baseline">
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                Log in
                                            </Button>
                                            <p className="px-2">Or</p>
                                            <a href="">register now!</a>
                                        </div>

                                    </Form.Item>
                                </Form>
                            </div>

                        </Col>
                        <Col xs={{span: 12}} md={{span: 8}} span={24}
                             className="border-l-0 rounded-l-none rounded-xl border-r-0 shadow-sm shadow-primaryColor"
                             style={{
                                 backgroundImage: `url(${LoginImg})`,
                                 backgroundSize: "cover",
                             }}>
                        </Col>
                    </Row>
                </Content>
                <Footer style={footerStyle}>
                    <p className="mb-0">
                        PSDev Design ©{new Date().getFullYear()} Created by Prabuddha Jayasekara
                    </p>
                </Footer>
            </Layout>
        </ConfigProvider>
    );
};
export default Login;