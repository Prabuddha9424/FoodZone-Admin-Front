import {Button, Col, Form, Input, message, Modal, Row} from "antd";
import {updateProduct} from "../../helpers/ApiHelpers.jsx";
import {useState} from "react";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../config/FirebaseConfig.jsx";
import {v4} from "uuid";

const formItemLayout = {
    labelCol: {xs: {span: 24,}, sm: {span: 8,},},
    wrapperCol: {xs: {span: 24,}, sm: {span: 16,},},
    labelAlign: 'left'
};
const tailFormItemLayout = {
    wrapperCol: {xs: {span: 24, offset: 0,}, sm: {span: 16, offset: 8,},},
};

function UpdateFoodItems({modalOpenClose, handleCancel, data}) {
    const [foodUpdateForm] = Form.useForm();
    const [imageUpload, setImageUpload] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const onFinishModel = async (values) => {
        try {
            const uploadImageUrl = await uploadImage();
            values["image"] = uploadImageUrl;
            const res = await updateProduct(data._id,values);
            handleCancel(res);
            messageApi.open({
                type: 'success',
                content: `${res.data.message}`,
            });
            foodUpdateForm.resetFields();
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: `${err.response.data.error}`,
            });
        }
    };
    const uploadImage = async () => {
        if (imageUpload !== null) {
            const imgRef = ref(storage, `FoodImages/${imageUpload.name + v4()}`);
            await uploadBytes(imgRef, imageUpload);
            return await getDownloadURL(imgRef);
        }
    }

    function handleOk() {
    }

    return (
        <div>
            {contextHolder}
            <Modal title="Update Product Data"
                   open={modalOpenClose}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   okButtonProps={{ style: { display: 'none' } }}
                   width={800}
            >
                <Form
                    {...formItemLayout}
                    form={foodUpdateForm}
                    name="register"
                    onFinish={onFinishModel}
                    scrollToFirstError
                    className="w-full"
                >
                    <Row gutter={24} className="pt-6">
                        <Col xs={{span: 24}} md={{span: 12}}>
                            <Form.Item
                                name="name"
                                label="Food Name"
                                initialValue={data ? data.name : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input food name!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="category"
                                label="Category"
                                initialValue={data ? data.category : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input food category!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="qty"
                                label="Quantity"
                                initialValue={data ? data.qty : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input food quantity!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="Price"
                                initialValue={data ? data.price : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input food price!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="intro"
                                label="Description"
                                initialValue={data ? data.intro : ""}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input details of item',
                                    },
                                ]}
                            >
                                <Input.TextArea showCount maxLength={200} />
                            </Form.Item>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 12}}>
                            <div className="w-full flex items-center justify-center">
                                <img src={data.image} alt="food image" className="w-[210px] h-[210px] border-dashed border mb-[10px]"/>
                            </div>
                            <Form.Item
                                label="Image"
                                name="imageFile"
                            >
                                <div>
                                    <input
                                        style={{borderRadius: "8px"}}
                                        type="file"
                                        id="file"
                                        onChange={e => {
                                            setImageUpload(e.target.files[0])
                                        }}
                                    />
                                    <label htmlFor="file">
                                    </label>
                                </div>
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
export default UpdateFoodItems;