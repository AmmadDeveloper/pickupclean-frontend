import React from "react";
import { Table } from "antd";

import { Link, useOutletContext } from "react-router-dom";

const {Column}=Table;



export default function MessagesTable(){
    const [loading,collection,setCollection]=useOutletContext();
    return(
        <>
        <h1>Messages<span style={{float:'right'}}><Link to="/panel/messages/new" type="primary">Add New</Link></span></h1>
        <Table loading={loading} style={{marginTop:'20px'}} scroll={{ x: '80vw' }} showHeader={true} pagination={true} dataSource={collection}>
            <Column  responsive={['lg']} title="Id" dataIndex="id" key="id" />
            <Column title="Recipient Type" dataIndex="recipient_type" key="recipient_type" />
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