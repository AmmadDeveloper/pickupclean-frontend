import React from "react";
import { Button, Table,Space } from "antd";

import { Link, useOutletContext } from "react-router-dom";

const {Column}=Table;



export default function TypesTable(){
    const [loading,collection,setCollection,deleteData,editData,edittype,setedittype]=useOutletContext();
    return(
        <>
        <h1>Types<span style={{float:'right'}}><Link to="/panel/types/new" type="primary">Add New</Link></span></h1>
        <Table loading={loading} style={{marginTop:'20px'}} scroll={{ x: '80vw' }} showHeader={true} pagination={true} dataSource={collection}>
            <Column title="Name" dataIndex="name" key="name" />
            <Column responsive={['lg']} title="Description" dataIndex="description" key="description" />
            <Column
                title=""
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
        </>
        
        
    );
}