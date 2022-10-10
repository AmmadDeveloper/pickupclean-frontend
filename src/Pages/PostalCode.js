import React,{useState,useEffect} from "react";
import { Outlet,useNavigate } from 'react-router-dom';
import { AdminClient } from "../Misc/Api";

export default function PostalCode(){
    const navigate=useNavigate();
    const [collection,setCollection]=useState([]);
    const [editpost,seteditpost]=useState({});
    const [loading,setLoading]=useState(true);
    

    useEffect(()=>{
        async function fetchPostCode(){
            const resp=await AdminClient.get('postcode');
            setCollection([...resp.data.postcodes]);
            setLoading(false);
        }
        fetchPostCode();
    },[]);
    
    const editData=async (id)=>{
        const resp=await AdminClient.get(`postcode?id=${id}`);
        seteditpost({...resp.data.postcode});
        navigate('/panel/postcode/edit');
    }

    const deleteData=async (id)=>{
        const resp=await AdminClient.delete('postcode',{params:{id:id}});
        if(resp.data.statuscode===200){
            let newData=collection.filter((x)=>x.id!==id);
            setCollection(newData);
        }
        
    }

    return(
        <>
            <Outlet context={[loading,collection,setCollection,deleteData,editData,editpost,seteditpost]} />
        </>
    );
}