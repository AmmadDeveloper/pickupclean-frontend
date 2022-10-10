import React, { useEffect, useState } from "react";
import { Outlet,useNavigate } from 'react-router-dom';
import { AdminClient } from "../Misc/Api";
const Types =()=>{
    
    const navigate=useNavigate();
    const [collection,setCollection]=useState([]);
    const [edittype,setedittype]=useState({});
    const [loading,setLoading]=useState(true);


    useEffect(()=>{
        async function fetchTypes(){
            const resp=await AdminClient.get('types');
            setCollection([...resp.data.types]);
            setLoading(false);
        }
        fetchTypes();
        
    },[]);
    
    const deleteData=async (id)=>{
        const resp=await AdminClient.delete('types',{params:{id:id}});
        if(resp.data.statuscode===200){
            let newData=collection.filter((x)=>x.id!==id);
            setCollection(newData);
        }
        
    }

    const editData=async (id)=>{
        const resp=await AdminClient.get(`types?id=${id}`);
        setedittype({...resp.data.type});
        navigate('/panel/types/edit');
    }
        
    return(
        <>
            <Outlet context={[loading,collection,setCollection,deleteData,editData,edittype,setedittype]}/> 
        </>
    );
}

export default Types;