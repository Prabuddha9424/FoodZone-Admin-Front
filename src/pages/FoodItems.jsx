import {Button, Col, Form, Input, message, Row, Select, Spin, Table,} from 'antd';
import {useEffect, useState} from "react";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import {SearchOutlined} from "@ant-design/icons";
import {storage} from "../config/FirebaseConfig.js";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {v4} from "uuid";
import {AddProduct, deleteProduct, getAllProducts} from "../helpers/ApiHelpers.js";
import UpdateFoodItems from "../components/foodItems/UpdateFoodItems.jsx";
const { Option } = Select;

const formItemLayout = {
    labelCol: {xs: {span: 24,}, sm: {span: 8,},},
    wrapperCol: {xs: {span: 24,}, sm: {span: 16,},},
    labelAlign: 'left'
};
const tailFormItemLayout = {
    wrapperCol: {xs: {span: 24, offset: 0,}, sm: {span: 16, offset: 8,},},
};
const columns = [
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (link) => {
            //return <Avatar src={link}/>
            return <img src={link} alt="food" className="w-[80px] h-[80px] rounded-full"/>
        }
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Quantity',
        dataIndex: 'qty',
        key: 'qty',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Option',
        dataIndex: 'option',
        key: 'option',
    },
];
let allProduct=[];
function FoodItems() {
    const [tableData, setTableData] = useState();
    const [dataLoading, setDataLoading] = useState()
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [modelData, setModelData] = useState()
    const [foodItemForm] = Form.useForm();
    const [imageUpload, setImageUpload] = useState(null);
    const [spinning, setSpinning] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const onCategoryChange = (value) => {
        switch (value) {
            case 'setMenu':
                foodItemForm.setFieldsValue({
                    note: 'Set Menu',
                });
                break;
            case 'desert':
                foodItemForm.setFieldsValue({
                    note: 'Desert',
                });
                break;
            case 'beverage':
                foodItemForm.setFieldsValue({
                    note: 'Beverage',
                });
                break;
            default:
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const onFinish = async (values) => {
        try {
            setSpinning(true);
            const uploadImageUrl = await uploadImage();
            values["image"] = uploadImageUrl;
            const res = await AddProduct(values);
            messageApi.open({
                type: 'success',
                content: `${res.data.message}`,
            });
            foodItemForm.resetFields();
            await fetchData();
            setSpinning(false);
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
    const fetchData = async () => {
        const response = await getAllProducts();
        allProduct = response.data;
        await setData(allProduct);
    }
    const setData = async (dataArr) => {
        setDataLoading(true);
        if (dataArr === null) {
            setTableData([]);
        } else if (dataArr.length !== null) {
            let tableRows = [];
            dataArr.forEach((data, x) => {
                let dataRow = {
                    key: x,
                    name: data.name,
                    price: data.price,
                    qty: data.qty,
                    category: data.category,
                    image: data.image,
                    option: (
                        <div className="flex flex-row gap-4 text-2xl">
                            <a
                                onClick={() => {
                                    updateData(data);
                                }}>
                                <FaEdit style={{fontSize: '18px'}}/>
                            </a>

                            <a
                                onClick={() => {
                                    deleteData(data);
                                }}>
                                <AiFillDelete style={{fontSize: '18px'}}/>
                            </a>
                        </div>
                    ),
                };
                tableRows.push(dataRow);
            })
            setTableData(tableRows);
        } else {
            setTableData([]);
        }
        setDataLoading(false);
    };
    const updateData = (data) => {
        setIsModelOpen(true);
        setModelData(data);
    };
    const closeModel = async (data) => {
        setIsModelOpen(false);
        setSpinning(true);
        await fetchData();
        setSpinning(false);
    };
    const deleteData = async (data) => {
        setSpinning(true);
        try {
            const response = await deleteProduct(data._id);
            setSpinning(false);
            messageApi.open({
                type: 'success',
                content: `${response.data.message}`,
            });
        } catch (err) {
            setSpinning(false);
            messageApi.open({
                type: 'error',
                content: `${err.response.data.message}`,
            });
        }
        await fetchData();
        console.log('ok');
    };
    const searchData = (text) => {
        let filtered = allProduct.filter((data) => {
            return (data.name.toLowerCase().includes(text.toLowerCase()));
        });
        setData(filtered);
    };
    return (
        <div>
            <Spin spinning={spinning}>
                {contextHolder}
                <Row className="flex">
                    <p className="text-xl font-serif pb-4 text-primaryColor">Add New Food Item</p>
                </Row>
                <Row>
                    <Form
                        {...formItemLayout}
                        form={foodItemForm}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                        className="w-full"
                    >
                        <Row gutter={24}>
                            <Col xs={{span: 24}} md={{span: 12}}>
                                <Form.Item
                                    name="name"
                                    label="Name"
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
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select food category"
                                        onChange={onCategoryChange}
                                        allowClear
                                    >
                                        <Option value="Set Menu">Set Menu</Option>
                                        <Option value="Desert">Desert</Option>
                                        <Option value="Beverage">Beverage</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="qty"
                                    label="Quantity"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input quantity!',
                                            whitespace: true,
                                        },
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    name="price"
                                    label="Price"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input food item price!',
                                        },
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col xs={{span: 24}} md={{span: 12}}>
                                <Form.Item
                                    name="intro"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input details of item',
                                        },
                                    ]}
                                >
                                    <Input.TextArea showCount maxLength={200} />
                                </Form.Item>
                                <Form.Item
                                    label="Image"
                                    name="imageFile"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
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
                                    Save Food Item
                                </Button>
                            </Form.Item>
                        </Row>
                    </Form>
                </Row>
                <Row>
                    <p className="text-xl font-serif p-4 text-primaryColor">All Food Items</p>
                    <div
                        className="flex flex-row w-100px md:w-[200px] items-center h-auto rounded-2xl">
                        <Input
                            className="rounded-full"
                            type="text"
                            placeholder="Search Food Item"
                            onChange={(e) => {
                                searchData(e.target.value);
                            }}
                            suffix={<SearchOutlined
                                style={{fontSize: '16px', color: 'var(--border-blue)', fontWeight: 'bolder'}}
                                className="site-form-item-icon"/>}
                        />
                    </div>
                </Row>
                <Row>
                    <Table
                        className="w-full"
                        dataSource={tableData}
                        columns={columns}
                        loading={dataLoading}
                        pagination={{
                            size: "small",
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "20"],
                            showQuickJumper: true,
                        }}
                    />
                    {(isModelOpen) ?
                        <UpdateFoodItems
                            modalOpenClose={isModelOpen}
                            data={modelData}
                            handleCancel={closeModel}
                        /> :
                        <></>
                    }

                </Row>
            </Spin>
        </div>
    );
}

export default FoodItems;