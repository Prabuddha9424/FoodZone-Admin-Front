import {Card, Col, message, Row, Segmented, Select, Spin} from "antd";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {
    countAllCompletedOrders,
    countAllCustomers,
    countAllProcessingOrders,
    countAllProducts
} from "../helpers/ApiHelpers.js";
import {useEffect, useState} from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'ORDERS & CUSTOMERS',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

const data = {
    labels,
    datasets: [
        {
            label: 'Orders',
            //data: labels.map(() => faker.datatype.number({min: 0, max: 1000})),
            data: [10,20,30,40,50,60],
            backgroundColor: 'rgb(21 128 61)',
        },
        {
            label: 'Revenues',
            data: [15,22,32,48,70,60],
            backgroundColor: 'rgb(185 28 28)',
        },
    ],
};

function Dashboard() {
    const [spinning, setSpinning] = useState(false);
    const [allCustomers, setAllCustomers] = useState("")
    const [allProducts, setAllProducts] = useState("")
    const [processingOrders, setProcessingOrders] = useState("");
    const [completedOrders, setCompletedOrders] = useState("");

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        countCustomers();
        countProducts();
        countProcessingOrders();
        countCompletedOrders();
    }, []);
    const changeOption = (val) => {
        console.log(val);
    };
    const countCustomers = async () => {
        setSpinning(true);
        const response = await countAllCustomers();
        setAllCustomers(response ? response.data : "0");
        setSpinning(false);
    };
    const countProducts = async () => {
        setSpinning(true);
        const response = await countAllProducts();
        setAllProducts(response ? response.data : "0");
        setSpinning(false);
    };
    const countProcessingOrders = async () => {
        setSpinning(true);
        const response = await countAllProcessingOrders();
        setProcessingOrders(response ? response.data : "0");
        setSpinning(false);
    };
    const countCompletedOrders = async () => {
        setSpinning(true);
        const response = await countAllCompletedOrders();
        setCompletedOrders(response ? response.data : "0");
        setSpinning(false);
    };
    return (
        <div>
            <Spin spinning={spinning}>
                {contextHolder}
                <Row>
                    <Col xs={{span: 24}} md={{span: 12, offset: 12}} lg={{span: 8, offset: 16}}>
                        <Segmented onChange={(e) => {
                            changeOption(e)
                        }} options={['Daily', 'Weekly', 'Monthly', 'Yearly']}/>
                    </Col>
                </Row>
                <Row gutter={[24, 24]} className="pt-10">
                    <DashboardCard title="TOTAL CUSTOMERS" value={allCustomers}/>
                    <DashboardCard title="TOTAL FOOD ITEMS" value={allProducts}/>
                    <DashboardCard title="TOTAL ORDERS" value={completedOrders+processingOrders}/>
                </Row>
                <Row className="p-6 pt-24">
                    <Col xs={{span: 24}} md={{span: 12}} lg={{span: 8}}>
                        <p className="text-base font-normal pb-6"><span className="bg-backgroundYellow p-2 rounded-xl">TODAY RECORDS</span>
                        </p>
                        <p className="text-3xl font-medium pb-10">Available Orders: <span
                            className="text-red-700">{completedOrders+processingOrders}</span>
                        </p>
                        <p className="text-3xl font-medium pb-10">Processing Orders: <span
                            className="text-yellow-700">{processingOrders}</span></p>
                        <p className="text-3xl font-medium">Completed Orders: <span className="text-green-700">{completedOrders}</span>
                        </p>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}} lg={{span: 16}}>
                        <Bar options={options} data={data} className="pb-16 w-full max-h-80"/>
                    </Col>
                </Row>
            </Spin>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
function DashboardCard({title, value}) {
    return (
        <Col lg={8} md={12} span={24}>
            <Card bordered={false} className="mx-6">
                <p className="text-base font-bold">{title}</p>
                <br/>
                <p className="text-3xl font-bold text-primaryColor">{value}</p>
            </Card>
        </Col>
    );
}

export default Dashboard;