import React,{useState,useEffect} from "react";
import { Outlet} from 'react-router-dom';
import { AdminClient } from "../Misc/Api";

export default function Schedule(){

    const [collection,setCollection]=useState([]);

    useEffect(()=>{
        async function fetchPostCode(){
            const resp=await AdminClient.get('timeslot');
            setCollection([...resp.data.postcodes]);
        }
        fetchPostCode();
        
    },[]);

    const deleteData=async (id)=>{
        const resp=await AdminClient.delete('timeslot',{params:{id:id}});
        if(resp.data.statuscode===200){
            let newData=collection.filter((x)=>x.id!==id);
            setCollection(newData);
        }
        
    }

    return(
        <>
            <Outlet context={[collection,setCollection,deleteData]} />
        </>
    );
}