import React from "react";
import { Button, Table,Space,Row,Col } from "antd";

import { Link, useOutletContext } from "react-router-dom";

const {Column}=Table;



export default function ServicesTable(){
    const [loading,collection,isModalVisible,showModal,handleCancel,handleOk,deleteData,onFinish,ServiceForm,SelectChange,editData,editservice,seteditservice,onEditFinish,SetTypeChange,geteditData]=useOutletContext();
    return(
        <>
        <Row>
            <Col span={24}>
                <h1>Services<span style={{float:'right'}}><Link to="/panel/services/new" type="primary">Add New</Link></span></h1>
                <Table loading={loading} scroll={{ x: '80vw' }} style={{marginTop:'20px'}} showHeader={true} pagination={true} dataSource={collection}>
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Price" dataIndex="price" key="price" />
                    <Column responsive={['lg']} title="Delivery Time" dataIndex="delivery_time" key="deliverytime" />
                    <Column
                        title="Action"
                        key="action"
                        fixed={'right'}
                        render={(text, record) => (
                            <Space size="middle">
                                <Button onClick={()=>editData(record.id)} type="link">Edit</Button>|
                                <Button onClick={()=>deleteData(record.id)} type="link">Delete</Button>
                            </Space>
                        )}
                        />
                </Table>
            </Col>
        </Row>
        
        </>
        
        
    );
}