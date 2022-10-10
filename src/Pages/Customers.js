import React,{useState,useEffect} from "react";
import { Outlet} from 'react-router-dom';
import { AdminClient } from "../Misc/Api";

export default function Customers(){

    const [collection,setCollection]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        async function fetchPostCode(){
            const resp=await AdminClient.get('customer');
            setCollection([...resp.data.users]);
            setLoading(false);
        }
        fetchPostCode();
        
    },[]);

    const BlockCustomer=async (id)=>{
        const resp=await AdminClient.delete('block',{params:{id:id}});
        if(resp.data.statuscode===200){
            debugger;
            const data=[...collection]
            const newData=data.map((rec) =>{
                if(rec.id===id){
                    rec.active='False'
                }
                return rec;
            })
            setCollection([...newData])
        }
        
    }

    return(
        <>
            <Outlet context={[loading,collection,setCollection,BlockCustomer]} />
        </>
    );
}