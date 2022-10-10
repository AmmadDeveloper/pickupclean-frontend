import React,{useState,useEffect} from "react";
import { Outlet} from 'react-router-dom';
import { AdminClient } from "../Misc/Api";
import {notification} from 'antd';

export default function Payment(){

    const [collection,setCollection]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        async function fetchPostCode(){
            const resp=await AdminClient.get('payment/');
            setCollection([...resp.data.payments]);
            setLoading(false);
        }
        fetchPostCode();
    },[]);
    const openNotificationWithIcon = data => {
        notification['error']({
          message: data.statuscode,
          description:data.message
        });
      };
      const openNotificationWithIconSuccess = data => {
        notification['success']({
          message: data.statuscode,
          description:data.message
        });
      };
    const refundPayment=async (id)=>{
        await AdminClient.delete('payment',{params:{id:id}}).then(async (resp)=>{
            if(resp.data.statuscode===200){
                openNotificationWithIconSuccess(resp.data)
                const res=await AdminClient.get('payment');
                setCollection([...res.data.payments]);
            }else{
                openNotificationWithIcon(resp.data)
            }
        });
        
        
    }

    return(
        <>
            <Outlet context={[loading,collection,setCollection,refundPayment]} />
        </>
    );
}