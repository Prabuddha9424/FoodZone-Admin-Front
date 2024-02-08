import {Button, Input, message, Row, Spin, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {FaEye} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import ViewCustomer from "../components/customers/ViewCustomer.jsx";
import {deleteCustomers, deleteOrder, getAllOrders, updateOrder} from "../helpers/ApiHelpers.jsx";
import ViewOrder from "../components/orders/ViewOrders.jsx";


let allOrdersData = [];

const columns = [
    {
        title: 'Order Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Item',
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: 'User Data',
        dataIndex: 'userData',
        key: 'userData',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Quantity',
        dataIndex: 'qty',
        key: 'qty',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Option',
        dataIndex: 'option',
        key: 'option',
    },
];

function Orders() {
    const [tableData, setTableData] = useState();
    const [dataLoading, setDataLoading] = useState()
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [modelData, setModelData] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const [spinning, setSpinning] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const response = await getAllOrders();
        allOrdersData = response.data;
        await setData(allOrdersData);
    }
    const setData = (dataArr) => {
        setDataLoading(true);
        if (dataArr === null) {
            setTableData([]);
        } else if (dataArr.length != null) {
            let tableRows = [];
            dataArr.forEach((data, x) => {
                let dataRow = {
                    key: x,
                    id: data._id,
                    item: data.item,
                    userData: (<div>
                            <p>{data.userData.name}</p>
                            <p>{data.userData.phone}</p>
                        </div>
                    ),
                    price: data.price,
                    qty: data.qty,
                    status: (<Button
                        className={`rounded-[50px] text-white min-w-[90px] !border-none ${
                            data.status=== 1
                                ? "bg-successColor"
                                : "bg-dangerColor"
                        } `}
                        onClick={() => {
                            updateData(data);
                        }}
                    >
                        {data.status=== 1 ? "COMPLETED" : "IN PROGRESS"}
                    </Button>),
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
                };
                tableRows.push(dataRow);
            });
            setTableData(tableRows);
        } else {
            setTableData([]);
        }
        setDataLoading(false);
    };
    const viewData = (data) => {
        setModelData(data);
        setIsModelOpen(!isModelOpen);
    };
    const closeModel = () => {
        setIsModelOpen(!isModelOpen);

    };
    const deleteData = async (data) => {
        setSpinning(true);
        try {
            const response = await deleteOrder(data._id);
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

    const updateData = async (data) => {
        setSpinning(true);
        try {
            if (data.status===0){
                await updateOrder(data._id,{status: 1});
                messageApi.open({
                    type: 'success',
                    content: `Order Completed!`,
                });
            }else{
                const response = await updateOrder(data._id,{status: 0});
                messageApi.open({
                    type: 'warning',
                    content: `Order change to In Progress!`,
                });
            }

            setSpinning(false);


        } catch (err) {
            setSpinning(false);
            console.log(err);
            // messageApi.open({
            //     type: 'error',
            //     content: `${err.response.data.message}`,
            // });
        }
        await fetchData();
        console.log('ok');
    };

    const searchData = (text) => {
        let filtered = allOrdersData.filter((data) => {
            return (data.item.toLowerCase().includes(text.toLowerCase()));
        });
        setData(filtered);
    };
    return (
        <div>
            <Spin spinning={spinning}>
                {contextHolder}
                <Row>
                    <p className="text-xl font-serif p-4 text-primaryColor">All Orders</p>
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
                    {(isModelOpen) ?
                        <ViewOrder
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

export default Orders;