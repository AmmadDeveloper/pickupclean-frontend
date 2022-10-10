import React,{useState,useEffect} from "react";
import { Button, Table,Space,Select,DatePicker,Input } from "antd";
import { AlignRightOutlined } from '@ant-design/icons';
import { useOutletContext } from "react-router-dom";
import { AdminClient } from "../../Misc/Api";

const {Column}=Table;
const {Option}=Select;
const {Search}=Input;
const {RangePicker}=DatePicker;

export default function PaymentTable(){
    const [loading,collection,setCollection,refundPayment]=useOutletContext();
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
            const resp=await AdminClient.get(`payment/${filter}`);
            setCollection([...resp.data.payments]);
        }
        fetchData(filter);
        
    },[typeFilter, dateFilter, searchFilter]);


    return(
        <>
        <h1>Payments<span style={{float:'right'}}> <Search placeholder="Order id" onChange={(x)=>setSearchFilter(x.target.value)} onSearch={(x)=>setSearchFilter(x)} style={{ width: 200 }} /></span></h1>
        <div style={{float:'right',marginTop:'10px',marginBottom:'20px',position:'relative',zIndex:'1'}}><AlignRightOutlined/> filters: 
            <Select onChange={(x)=>setTypeFilter(x)} defaultValue="all" style={{ width: '150px',marginRight:'10px',marginLeft:'10px' }} allowClear>
                <Option value="all">All</Option>
                <Option value="refunded">Refunded</Option>
            </Select>
            <RangePicker onChange={(x)=>setDateFilter(x)} />
        </div>
        <Table loading={loading} scroll={{ x: '80vw' }} style={{marginTop:'20px'}} showHeader={true} pagination={true} dataSource={collection}>
            <Column responsive={['lg']} title="Payment Id" dataIndex="id" key="id" />
            <Column responsive={['lg']} title="Order Id" dataIndex="order_id" key="order_id" />
            <Column title="Customer Name" dataIndex="fullname" key="fullname" />
            <Column responsive={['lg']} title="Email" dataIndex="email" key="email" />
            <Column title="Amount" dataIndex="amount" key="amount" />
            <Column responsive={['lg']} title="Date" dataIndex="date" key="date" />
            <Column responsive={['lg']} title="Refunded" dataIndex="refund" key="refund" />
            <Column
                title="Action"
                key="action"
                fixed={'right'}
                render={(text, record) =>{
                    if(record.refund==='No'){
                        return (<Space size="middle">
                        <Button onClick={()=>refundPayment(record.id)} type="link">Refund</Button>
                    </Space>)
                    }else{
                        <Space size="middle"></Space>
                    }
                    
                }}
                />
        </Table>
        </>
        
        
    );
}