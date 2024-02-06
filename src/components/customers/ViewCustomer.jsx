import {Col, Modal, Row} from "antd";
import Customer from "../../assets/images/owner.jpg";

function ViewCustomer({modalOpenClose, handleCancel, data}) {

    return (
        <div>
            <Modal title="Customer Data"
                   open={modalOpenClose}
                   onOk={handleCancel}
                   onCancel={handleCancel}
                   cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Row className="flex flex-col items-center justify-center">
                    <img src={Customer} alt="Customer" className="w-[150px] h-[150px] rounded-full"/>
                    <p className="px-4 text-2xl text-primaryColor">{data.name}</p>
                </Row>
                <Row>
                    <Col span={8} offset={4}>
                        <p className="py-4">Customer Email</p>
                        <p className="py-4">Customer Address</p>
                        <p className="py-4">Customer Mobile</p>
                    </Col>
                    <Col span={12} className="pl-2 text-primaryColor text-base">
                        <p className="py-4"><span className="pr-3">:</span>{data.email}</p>
                        <p className="py-4"><span className="pr-3">:</span>{data.address}</p>
                        <p className="py-4"><span className="pr-3">:</span>{data.phone}</p>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}
export default ViewCustomer;