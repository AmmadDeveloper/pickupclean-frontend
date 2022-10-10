import React,{useState,useEffect} from "react";
import { Outlet} from 'react-router-dom';
import { AdminClient } from "../Misc/Api";
export default function Messages(){
    const [collection,setCollection]=useState([]);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        async function fetchMessages(){
            const resp=await AdminClient.get('listMessages');
            setCollection([...resp.data.records]);
            setLoading(false);
        }
        fetchMessages();
        
    },[]);

    

    return(
        <>
            <Outlet context={[loading,collection,setCollection]} />
        </>
    );
}