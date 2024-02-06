import {
    Avatar,
    Button, Col,
    Form,
    Input,
    Row, Table, Upload,
} from 'antd';
import {useEffect, useState} from "react";
import {FaEdit, FaRegImage} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import {SearchOutlined} from "@ant-design/icons";
import UpdateAdminUser from "../components/adminUsers/UpdateAdminUser.jsx";

const formItemLayout = {
    labelCol: {xs: {span: 24,}, sm: {span: 8,},},
    wrapperCol: {xs: {span: 24,}, sm: {span: 16,},},
    labelAlign: 'left'
};
const tailFormItemLayout = {
    wrapperCol: {xs: {span: 24, offset: 0,}, sm: {span: 16, offset: 8,},},
};
const dataSource = [
    {
        key: '1',
        id: 'user1',
        name: 'Mike',
        image:"https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1707091200&semt=sph",
        email: 'mike@gmail.com',
        phone: 711234567,
        address: '10 Downing Street',
    },
    {
        key: '2',
        id: 'user2',
        name: 'John',
        image:"https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg",
        email: 'john@gmail.com',
        phone: 711234667,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render:(link)=>{
            return <Avatar src={link}/>
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
        dataIndex: 'quantity',
        key: 'quantity',
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
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
function FoodItems() {
    const [tableData, setTableData] = useState();
    const [dataLoading, setDataLoading] = useState()
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [modelData, setModelData] = useState()
    useEffect(() => {
        setData(dataSource)
    }, []);
    const setData = (dataArr) => {
        setDataLoading(true);
        if (dataArr.length != null) {
            let tableRows = [];
            dataArr.forEach((data, x) => {
                let dataRow = {
                    key: x,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
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
                setTableData(tableRows);
            })
        } else {
            setTableData([]);
        }
        setDataLoading(false);
    };
    const updateData = (data) => {
        setModelData(data);
        setIsModelOpen(!isModelOpen);
        //setData(dataSource);
    };
    const closeModel = () => {
        setIsModelOpen(!isModelOpen);

    };
    const deleteData = (data) => {
        console.log(data.id);
        setData(dataSource);
    };
    const searchData = (text) => {
        let filtered = dataSource.filter((data) => {
            return (data.name.toLowerCase().includes(text.toLowerCase()));
        });
        setData(filtered);
    };

    return (
        <div>
            <Row className="flex">
                <p className="text-xl font-serif pb-4 text-primaryColor">Add New Food Item</p>
            </Row>
            <Row>
                <FoodItemForm/>
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
                    <UpdateAdminUser
                        modalOpenClose={isModelOpen}
                        data={modelData}
                        handleCancel={closeModel}
                    /> :
                    <></>
                }

            </Row>
        </div>
    );
}

const FoodItemForm = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            className="w-full"
        >
            <Row gutter={24}>
                <Col xs={{span: 24}} md={{span: 12}}>
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
                        name="residence"
                        label="Residence"
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
                <Col xs={{span: 24}} md={{span: 12}}>
                    <Form.Item label="Food Image" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload action="/upload.do" listType="picture-card">
                            <button
                                style={{
                                    border: 0,
                                    background: 'none',
                                }}
                                type="button"
                            >
                                <FaRegImage />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                            </button>
                        </Upload>
                    </Form.Item>
                </Col>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Save Admin
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};
export default FoodItems;