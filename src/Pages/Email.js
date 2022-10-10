import React,{useState,useEffect} from "react";
import {Outlet} from 'react-router-dom';
import { AdminClient } from "../Misc/Api";

export default function Email(){
    const [collection,setCollection]=useState([]);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        async function fetchRecords(){
            const resp=await AdminClient.get('listEmail');
            setCollection([...resp.data.records]);
            setLoading(false);
        }
        fetchRecords();
        
    },[]);

    

    return(
        <>
            <Outlet context={[loading,collection,setCollection]} />
        </>
    );
}