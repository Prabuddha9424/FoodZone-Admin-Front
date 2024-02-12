import {Button, Col, Modal, Row, Steps, Switch} from "antd";
import {useState} from "react";

//import Customer from "../../assets/images/owner.jpg";

function ViewOrder({modalOpenClose, handleCancel, data}) {

    return (
        <div>
            <Modal title="Order Details"
                   open={modalOpenClose}
                   onOk={handleCancel}
                   onCancel={handleCancel}
                   cancelButtonProps={{style: {display: 'none'}}}
            >
                {/*<Row className="flex flex-col items-center justify-center">
                    <img src={Customer} alt="Customer" className="w-[150px] h-[150px] rounded-full"/>
                    <p className="px-4 text-2xl text-primaryColor">{data.name}</p>
                </Row>*/}
                <Row className="items-baseline flex">
                    <Col span={8} offset={2}>
                        <p className="py-4">Item</p>
                        <p className="py-4">Customer Email</p>
                        <p className="py-4">Order Quantity</p>
                        <p className="py-4">Price</p>
                    </Col>
                    <Col span={12} className="pl-2 text-primaryColor">
                        <p className="py-4 font-medium text-xl text-successColor"><span
                            className="pr-3">:</span>{data.item}</p>
                        <p className="py-4"><span className="pr-3">:</span>{data.email}</p>
                        <p className="py-4"><span className="pr-3">:</span>{data.qty}</p>
                        <p className="py-4"><span className="pr-3">:</span>{data.price}</p>
                    </Col>
                </Row>
                <Row className="items-baseline flex">
                    <Col span={8} offset={2}>
                        <p className="py-4">Quantity</p>
                    </Col>
                    <Col span={12} className="pl-2 text-primaryColor">
                        <div className="w-[60px] h-[60px] rounded-full border border-dashed border-dangerColor text-center flex items-center justify-center text-2xl font-medium text-dangerColor">
                            <p>{data.qty}</p>
                        </div>
                    </Col>
                </Row>
                <Row className="w-full mt-6">
                    <Col span={16} offset={4}>
                        <div
                            className={`rounded-full text-white w-full h-[60px] text-center flex justify-center items-center !border-none ${
                                data.status === 1
                                    ? "bg-successColor"
                                    : "bg-dangerColor"
                            } `}
                        >
                            <p className="text-2xl font-medium">{data.status === 1 ? "COMPLETED" : "IN PROGRESS"}</p>

                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}

export default ViewOrder;