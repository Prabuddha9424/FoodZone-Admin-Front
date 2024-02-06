import {Button, Col, Form, Input, Modal, Row} from "antd";
import {AddAdminUser, updateAdminUsers} from "../../helpers/ApiHelpers.jsx";

const formItemLayout = {
    labelCol: {xs: {span: 24,}, sm: {span: 8,},},
    wrapperCol: {xs: {span: 24,}, sm: {span: 16,},},
    labelAlign: 'left'
};
const tailFormItemLayout = {
    wrapperCol: {xs: {span: 24, offset: 0,}, sm: {span: 16, offset: 8,},},
};

function UpdateAdminUser({modalOpenClose, handleCancel, data}) {
    const [form] = Form.useForm();
    const onFinishModel = async (values) => {
        const response=await updateAdminUsers(data._id,values);
        handleCancel(response);
    };
    const handleOk = () => {

    };
    return (
        <div>
            <Modal title="Update User Data"
                   open={modalOpenClose}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   okButtonProps={{ style: { display: 'none' } }}
                   width={800}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinishModel}
                    scrollToFirstError
                    className="w-full"
                >
                    <Row gutter={24} className="pt-6">
                        <Col xs={{span: 24}} md={{span: 12}}>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                initialValue={data ? data.email : ""}
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
                                name="name"
                                label="Name"
                                initialValue={data ? data.name : ""}
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
                        </Col>
                        <Col xs={{span: 24}} md={{span: 12}}>
                            <Form.Item
                                name="address"
                                label="Address"
                                initialValue={data ? data.address : ""}
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
                                name="phone"
                                label="Phone Number"
                                initialValue={data ? data.phone : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Update User
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
}
export default UpdateAdminUser;