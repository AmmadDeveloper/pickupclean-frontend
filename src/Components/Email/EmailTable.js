import React from "react";
import {Table } from "antd";

import { Link, useOutletContext } from "react-router-dom";

const {Column}=Table;



export default function EmailTable(){
    const [loading,collection]=useOutletContext();
    return(
        <>
        <h1>Emails<span style={{float:'right'}}><Link to="/panel/email/new" type="primary">Add New</Link></span></h1>
        <Table loading={loading} style={{marginTop:'20px'}} scroll={{ x: '80vw' }} showHeader={true} pagination={true} dataSource={collection}>
            <Column  responsive={['lg']} title="Id" dataIndex="id" key="id" />
            <Column title="Recipient Type" dataIndex="recipient_type" key="recipient_type" />
            <Column responsive={['lg']} title="Subject" dataIndex="subject" key="subject" />
            <Column title="Date" dataIndex="created_on" key="created_on" />
            <Column title="Status" dataIndex="status" key="status" />
            {/* <Column
                title=""
                key="action"
                fixed={'right'}
                render={(text, record) => (
                    <Space size="middle">
                        <Button onClick={()=>editData(record.id)} type="link">Edit</Button>|
                        <Button onClick={()=>deleteData(record.id)} type="link">Delete</Button>
                    </Space>
                )}
                /> */}
        </Table>
        </>
        
        
    );
}