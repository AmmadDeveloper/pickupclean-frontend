import React from "react";
import { Button, Table,Space } from "antd";

import { Link, useOutletContext } from "react-router-dom";

const {Column}=Table;



export default function ScheduleTable(){
    const [collection,setCollection,deleteData]=useOutletContext();
    return(
        <>
        <h1>Schedules<span style={{float:'right'}}><Link to="/admin/schedule/new" type="primary">Add New</Link></span></h1>
        <Table style={{marginTop:'20px'}} showHeader={true} pagination={false} dataSource={collection}>
            <Column title="Area Name" dataIndex="name" key="name" />
            <Column title="Country" dataIndex="country" key="country" />
            <Column title="Postal Code" dataIndex="code" key="code" />
            <Column title="Description" dataIndex="description" key="description" />
            <Column
                title="Action"
                key="action"
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