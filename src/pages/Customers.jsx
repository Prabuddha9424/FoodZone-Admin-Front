import {Input, Row, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import UpdateAdminUser from "../components/adminUsers/UpdateAdminUser.jsx";
import {useEffect, useState} from "react";
import {FaEdit, FaEye} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import ViewCustomer from "../components/customers/ViewCustomer.jsx";

const dataSource = [
    {
        key: '1',
        id: 'user1',
        name: 'Mike',
        email: 'mike@gmail.com',
        phone: 711234567,
        address: '10 Downing Street',
    },
    {
        key: '2',
        id: 'user2',
        name: 'John',
        email: 'john@gmail.com',
        phone: 711234667,
        address: '10 Downing Street',
    },
];

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
function Customers() {
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
                                        viewData(data);
                                    }}>
                                    <FaEye style={{fontSize: '18px'}}/>
                                </a>
                                <a
                                    onClick={() => {
                                        deleteData(data);
                                    }}>
                                    <AiFillDelete style={{fontSize: '18px'}}/>
                                </a>
                            </div>
                        ),
                    }
                ;
                tableRows.push(dataRow);
                setTableData(tableRows);
            })
        } else {
            setTableData([]);
        }
        setDataLoading(false);
    };
    const viewData = (data) => {
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
            <Row>
                <p className="text-xl font-serif p-4 text-primaryColor">All Customers</p>
                <div
                    className="flex flex-row w-100px md:w-[200px] items-center h-auto rounded-2xl">
                    <Input
                        className="rounded-full"
                        type="text"
                        placeholder="Search Customer"
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
                {(isModelOpen)?
                    <ViewCustomer
                        modalOpenClose={isModelOpen}
                        data={modelData}
                        handleCancel={closeModel}
                    />:
                    <></>
                }

            </Row>
        </div>
    );
}

export default Customers;