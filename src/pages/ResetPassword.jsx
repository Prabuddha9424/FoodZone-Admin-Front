import {Button, Col, Form, Input, message, Row, Spin} from 'antd';
import {useState} from "react";
const formItemLayout = {
    labelCol: {xs: {span: 24,}, sm: {span: 8,},},
    wrapperCol: {xs: {span: 24,}, sm: {span: 16,},},
    labelAlign: 'left'
};
const tailFormItemLayout = {
    wrapperCol: {xs: {span: 24, offset: 0,}, sm: {span: 16, offset: 8,},},
};

function ResetPassword() {
    const [messageApi, contextHolder] = message.useMessage();
    const [spinning, setSpinning] = useState(false);


    const [adminForm] = Form.useForm();
    const onFinish = async (values) => {
        // try {
        //     setSpinning(true);
        //     const res = await AddAdminUser(values);
        //     messageApi.open({
        //         type: 'success',
        //         content: `${res.data.message}`,
        //     });
        //     setSpinning(false);
        //     adminForm.resetFields();
        // } catch (err) {
        //     messageApi.open({
        //         type: 'error',
        //         content: `${err.response.data.error}`,
        //     });
        // }
    };

    return (
        <div>
            <Spin spinning={spinning}>
                {contextHolder}
                <Row className="flex">
                    <p className="text-xl font-serif pb-4 text-primaryColor">Reset Password</p>
                </Row>
                <Row>
                    <Form
                        {...formItemLayout}
                        form={adminForm}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                        className="w-full"
                    >
                        <Row gutter={24}>
                            <Col xs={{span: 24}} md={{span: 12}}>
                                <Form.Item
                                    name="currentPassword"
                                    label="Current Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your current password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password/>
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
                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Reset Password
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Spin>
        </div>
    );
}

export default ResetPassword;