import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Layout, Menu, Button, theme, ConfigProvider, Form, Input, Checkbox, Row, Col} from 'antd';
import SignupImg from '../assets/images/signup-front.jpg';
import AppLogo from '../assets/images/foodZone-logo.png'
import {AddAdminUser} from "../helpers/ApiHelpers.jsx";

const {Footer, Content} = Layout;
const formItemLayout = {
    labelCol: {xs: {span: 24,}, sm: {span: 8,},},
    wrapperCol: {xs: {span: 24,}, sm: {span: 16,},},
    labelAlign: 'left'
};
const tailFormItemLayout = {
    wrapperCol: {xs: {span: 24, offset: 0,}, sm: {span: 16, offset: 8,},},
};
const footerStyle = {
    textAlign: 'center',
};
const SignUp = () => {
    const [adminSignUpForm] = Form.useForm();
    const onFinish = async (values) => {
        console.log(values);
        // try {
        //     setSpinning(true);
        //     const res = await AddAdminUser(values);
        //     messageApi.open({
        //         type: 'success',
        //         content: `${res.data.message}`,
        //     });
        //     setSpinning(false);
        //     adminForm.resetFields();
        //     await fetchData();
        // } catch (err) {
        //     messageApi.open({
        //         type: 'error',
        //         content: `${err.response.data.error}`,
        //     });
        // }
    };
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
                    Typography: {
                        fontSizeHeading1: 60

                    },
                    Carousel: {
                        colorBgContainer: "var(--primary-color)",
                        dotHeight: 10
                    },
                    Button: {
                        colorPrimaryHover: "var(--primary-color)"
                    },
                    Segmented: {
                        itemSelectedBg: "#443111",
                        colorText: "var(--primary-color)"
                    },
                    Card: {
                        colorBgContainer: "rgba(250,173,20, 0.05)",
                        boxShadowTertiary: "0 1px 2px 0 rgba(250,173,20, 0.3), 0 1px 6px -1px rgba(250,173,20, 0.2), 0 2px 4px 0 rgba(250,173,20, 0.2)"
                    },
                    Modal: {
                        contentBg: "var(--model-background)"
                    }
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
                        <Col xs={{span: 12, offset: 0}} md={{span: 8, offset: 4}}
                             className="border-r-0 rounded-r-none rounded-xl shadow-sm shadow-primaryColor"
                        >
                            <Col span={20} offset={2}>
                                <div
                                    style={{height: '80vh'}}
                                     className="w-full  flex flex-col items-center justify-center"
                                >
                                    <div>
                                        <img src={AppLogo} alt="collapsedLogo" className="w-[120px]"/>
                                    </div>
                                    <div className=" text-xl pb-6 w-full">
                                        Sign Up
                                    </div>
                                    <Form
                                        {...formItemLayout}
                                        form={adminSignUpForm}
                                        name="register"
                                        onFinish={onFinish}
                                        scrollToFirstError
                                        className="w-full"
                                    >
                                        <Form.Item
                                            name="email"
                                            label="E-mail"
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
                                            <Input/>
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
                                            <Input.Password/>
                                        </Form.Item>

                                        <Form.Item
                                            name="confirm"
                                            label="Confirm Password"
                                            dependencies={['password']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                ({getFieldValue}) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password/>
                                        </Form.Item>
                                        <Form.Item
                                            name="name"
                                            label="Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your name!',
                                                    whitespace: true,
                                                },
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item
                                            name="address"
                                            label="Address"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your address!',
                                                    whitespace: true,
                                                },
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>

                                        <Form.Item
                                            name="phone"
                                            label="Phone Number"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your phone number!',
                                                },
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item {...tailFormItemLayout}>
                                            <div className="flex items-baseline">
                                                <Button type="primary" htmlType="submit" className="login-form-button">
                                                    Save Admin
                                                </Button>
                                                <p className="px-2">Or</p>
                                                <a href="">Back to Login!</a>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Col>


                        </Col>
                        <Col xs={{span: 12}} md={{span: 8}} span={24}
                             className="border-l-0 rounded-l-none rounded-xl border-r-0 shadow-sm shadow-primaryColor"
                             style={{
                                 backgroundImage: `url(${SignupImg})`,
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
export default SignUp;