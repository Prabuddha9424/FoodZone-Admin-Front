import {
    Button, Col,
    Form,
    Input, message,
    Row, Spin, Table,
} from 'antd';
import {useEffect, useState} from "react";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import {SearchOutlined} from "@ant-design/icons";
import UpdateAdminUser from "../components/adminUsers/UpdateAdminUser.jsx";
import {AddAdminUser, deleteAdminUsers, getAllAdminUsers} from "../helpers/ApiHelpers.jsx";

const formItemLayout = {
    labelCol: {xs: {span: 24,}, sm: {span: 8,},},
    wrapperCol: {xs: {span: 24,}, sm: {span: 16,},},
    labelAlign: 'left'
};
const tailFormItemLayout = {
    wrapperCol: {xs: {span: 24, offset: 0,}, sm: {span: 16, offset: 8,},},
};
let allAdminData = [];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Option',
        dataIndex: 'option',
        key: 'option',
    },
];

function AdminUsers() {
    const [tableData, setTableData] = useState();
    const [dataLoading, setDataLoading] = useState();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [modelData, setModelData] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const [spinning, setSpinning] = useState(false);
    //const [allAdminData, setAllAdminData] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const [adminForm] = Form.useForm();
    const onFinish = async (values) => {
        try {
            setSpinning(true);
            const res = await AddAdminUser(values);
            messageApi.open({
                type: 'success',
                content: `${res.data.message}`,
            });
            setSpinning(false);
            adminForm.resetFields();
            await fetchData();
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: `${err.response.data.error}`,
            });
        }
    };
    const fetchData = async () => {
        const response = await getAllAdminUsers();
        allAdminData = response.data;
        await setData(allAdminData);
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
                    email: data.email,
                    password: data.password,
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
        if (data?.data?.message && typeof data.data.message === 'string') {
            messageApi.open({
                type: 'success',
                content: `${data.data.message}`,
            });
        }
    };
    const deleteData = async (data) => {
        setSpinning(true);
        try {
            const response = await deleteAdminUsers(data._id);
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
        let filtered = allAdminData.filter((data) => {
            return (data.name.toLowerCase().includes(text.toLowerCase()));
        });
        setData(filtered);
    };


    return (
        <div>
            <Spin spinning={spinning}>
                {contextHolder}
                <Row className="flex">
                    <p className="text-xl font-serif pb-4 text-primaryColor">Add New Admin</p>
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
                            </Col>
                            <Col xs={{span: 24}} md={{span: 12}}>
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
                            </Col>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    Save Admin
                                </Button>
                            </Form.Item>
                        </Row>
                    </Form>
                </Row>
                <Row>
                    <p className="text-xl font-serif p-4 text-primaryColor">All Admin Users</p>
                    <div
                        className="flex flex-row w-100px md:w-[200px] items-center h-auto rounded-2xl">
                        <Input
                            className="rounded-full"
                            type="text"
                            placeholder="Search User"
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
            </Spin>
        </div>
    );
}

/*const AdminForm = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        setAdminFormData(values)
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
                </Col>
                <Col xs={{span: 24}} md={{span: 12}}>
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
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Save Admin
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};*/
export default AdminUsers;