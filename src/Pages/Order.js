import React,{useState,useEffect, useRef} from "react";
import { Link,Outlet} from 'react-router-dom';
import { AdminClient } from "../Misc/Api";

export default function Order(){
    const navigate=useRef()
    const [collection,setCollection]=useState([]);
    const [detailId,setDetailId]=useState(0);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        async function fetchOrders(){
            const resp=await AdminClient.get('order');
            setCollection([...resp.data.orders]);
            setLoading(false);
        }
        fetchOrders();
        
    },[]);

    const reloadOrders=async ()=>{
        const resp=await AdminClient.get('order');
        setCollection([...resp.data.orders]);
    }

    const viewData=async (id)=>{
        setDetailId(id)
        navigate.current.click();
        
    }

    return(
        <>
            <Link style={{visibility:'hidden'}} ref={navigate} to={"/panel/order/details"}></Link>
            <Outlet context={[loading,collection,setCollection,viewData,detailId,setDetailId,reloadOrders]} />
        </>
    );
}