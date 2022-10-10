import React, { useEffect, useState } from "react";
import { Button, Table,Space,Tag,DatePicker,Select,Input } from "antd";
import { AlignRightOutlined } from '@ant-design/icons';
import {  useOutletContext } from "react-router-dom";
import { AdminClient } from "../../Misc/Api";
import moment from "moment";

const {Column}=Table;
const {RangePicker}=DatePicker;
const {Option}=Select;
const {Search}=Input;
export default function OrderTable(){
    const [loading,collection,setCollection,viewData]=useOutletContext();
    const [typeFilter,setTypeFilter]=useState('');
    const [dateFilter,setDateFilter]=useState('');
    const [searchFilter,setSearchFilter]=useState('');

    useEffect(()=>{
        var filter="?"
        if(searchFilter!==''){
            filter+=`search=${searchFilter}`
        }
        if(typeFilter!==''){
            filter+=`&status=${typeFilter}`
        }
        if(dateFilter!=='' && dateFilter!=null){
            var vals=dateFilter.map((x)=>x.format('YYYY-MM-DD HH:mm:ss'))
            filter+=`&fromdate=${vals[0]}&todate=${vals[1]}`
        }
        const fetchData=async (filter)=>{
            const resp=await AdminClient.get(`order/${filter}`);
            setCollection([...resp.data.orders]);
        }
        fetchData(filter);
        
    },[typeFilter, dateFilter, searchFilter]);
    return(
        <>
        <h1>Orders<span style={{float:'right'}}> <Search placeholder="Order id" onChange={(x)=>setSearchFilter(x.target.value)} onSearch={(x)=>setSearchFilter(x)} style={{ width: 200 }} /></span></h1>
        <div style={{float:'right',marginTop:'10px',marginBottom:'20px',position:'relative',zIndex:'1'}}><AlignRightOutlined/> filters: 
            <Select onChange={(x)=>setTypeFilter(x)} defaultValue="all" style={{ width: '150px',marginRight:'10px',marginLeft:'10px' }} allowClear>
                <Option value="all">All</Option>
                <Option value="confirmed">Confirmed</Option>
                <Option value="declined">Declined</Option>
                <Option value="refunded">Refunded</Option>
                <Option value="pickedup">Pickedup</Option>
                <Option value="processing">Processing</Option>
                <Option value="shipped">Shipped</Option>
                <Option value="delivered">Delivered</Option>
            </Select>
            <RangePicker onChange={(x)=>setDateFilter(x)} />
        </div>
        
        <Table loading={loading} scroll={{ x: '80vw' }} style={{marginTop:'20px'}} showHeader={true} pagination={true} dataSource={collection}>
            <Column title="Order #" dataIndex="id" key="id" />
            <Column title="Customer Name" dataIndex="fullname" key="fullname" />
            <Column responsive={['lg']} title="Phone" dataIndex="phone" key="phone" />
            <Column responsive={['lg']} title="Email" dataIndex="email" key="email" />
            <Column responsive={['lg']} title="Postal Code" dataIndex="postcode" key="postcode" />
            <Column responsive={['lg']} title="Order Date" dataIndex="order_date" key="order_date" />
            <Column responsive={['lg']} title="Status" dataIndex="status" key="status" render={
                (status)=>{
                    switch(status){
                        case "confirmed":
                            return(<Tag color="#fadb14">{status}</Tag>);
                        case "declined":
                            return(<Tag color="#f5222d">{status}</Tag>);
                        case "refunded":
                            return(<Tag color="#1890ff">{status}</Tag>)
                        case "pickedup":
                            return(<Tag color="#fa8c16">{status}</Tag>)
                        case "processing":
                            return(<Tag color="#000000">{status}</Tag>)
                        case "shipped":
                            return(<Tag color="#722ed1">{status}</Tag>)
                        case "delivered":
                            return(<Tag color="#52c41a">{status}</Tag>)
                        default:
                            return(<Tag color="#1890ff">{status}</Tag>)
                    }
                    
                    
                }
            } />
            <Column title="Total" dataIndex="total" key="total" />
            <Column
                title=""
                key="action"
                fixed={'right'}
                render={(text, record) => (
                    <Space size="middle">
                        <Button onClick={()=>viewData(record.key)} type="link">Details</Button>
                    </Space>
                )}
                />
        </Table>
        </>
        
        
    );
}