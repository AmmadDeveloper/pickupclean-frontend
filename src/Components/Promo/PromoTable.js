import React from "react";
import { Button, Table,Space } from "antd";

import { Link, useOutletContext } from "react-router-dom";

const {Column}=Table;



export default function PromoTable(){
    const [loading,collection,setCollection,deleteData]=useOutletContext();
    return(
        <>
        <h1>Promo Codes<span style={{float:'right'}}><Link to="/panel/promo/new" type="primary">Add New</Link></span></h1>
        <Table loading={loading} scroll={{ x: '80vw' }} style={{marginTop:'20px'}} showHeader={true} pagination={true} dataSource={collection}>
            <Column title="Title" dataIndex="title" key="title" />
            <Column responsive={['lg']} title="Code" dataIndex="code" key="code" />
            <Column title="Valid until" dataIndex="until" key="until" />
            <Column responsive={['lg']} title="Type" dataIndex="type" key="type" />
            <Column title="Value" dataIndex="value" key="value" />
            
            <Column
                title="Action"
                key="action"
                fixed={'right'}
                render={(text, record) => (
                    <Space size="middle">
                        <Button onClick={()=>deleteData(record.key)} type="link">Delete</Button>
                    </Space>
                )}
                />
        </Table>
        </>
        
        
    );
}