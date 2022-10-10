import React from "react";
import { Button, Table,Space } from "antd";

import { Link, useOutletContext } from "react-router-dom";

const {Column}=Table;



export default function PostalCodeTable(){
    const [loading,collection,setCollection,deleteData,editData,editpost,seteditpost]=useOutletContext();
    return(
        <>
        <h1>Postal Code<span style={{float:'right'}}><Link to="/panel/postcode/new" type="primary">Add New</Link></span></h1>
        <Table loading={loading} scroll={{ x: '80vw' }} style={{marginTop:'20px',textAlign:'center'}} showHeader={true} pagination={false} dataSource={collection}>
            <Column title="Area Name" dataIndex="name" key="name" />
            <Column title="Country" dataIndex="country" key="country" />
            <Column title="Postal Code" dataIndex="code" key="code" />
            <Column responsive={['lg']} title="Description" dataIndex="description" key="description" />
            <Column
                title=""
                key="action"
                fixed={'right'}
                render={(text, record) => (
                    <Space size="middle">
                        <Button onClick={()=>editData(record.key)} type="link">Edit</Button> |
                        <Button onClick={()=>deleteData(record.key)} type="link">Delete</Button>
                    </Space>
                )}
                />
        </Table>
        </>
        
        
    );
}