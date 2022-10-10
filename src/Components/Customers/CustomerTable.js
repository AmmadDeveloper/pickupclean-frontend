import React from "react";
import { Button, Table,Space } from "antd";

import { Link, useOutletContext } from "react-router-dom";

const {Column}=Table;



export default function CustomerTable(){
    const [loading,collection,setCollection,BlockCustomer]=useOutletContext();
    return(
        <>
        <h1>Customers<span style={{float:'right'}}></span></h1>
        <Table loading={loading} scroll={{ x: '80vw' }} style={{marginTop:'20px'}} showHeader={true} pagination={true} dataSource={collection}>
            <Column responsive={['lg']} title="Id" dataIndex="id" key="id" />
            <Column title="Customer Name" dataIndex="fullname" key="fullname" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column responsive={['lg']} title="Active" dataIndex="active" key="active" />
            <Column responsive={['lg']} title="Last Login" dataIndex="lastlogin" key="lastlogin" />
            <Column responsive={['lg']} title="Total Orders" dataIndex="total_orders" key="total_orders" />
            <Column
                title=""
                key="action"
                fixed={'right'}
                render={(text, record) => {
                    if(record.active==='False'){
                        return ''
                    }else{
                    return(
                    <Space size="middle">
                        <Button onClick={()=>BlockCustomer(record.key)} type="link">Block</Button>
                    </Space>
                    )
                }}}
                />
        </Table>
        </>
        
        
    );
}