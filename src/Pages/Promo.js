import React,{useState,useEffect} from "react";
import { Outlet} from 'react-router-dom';
import { AdminClient } from "../Misc/Api";

export default function Promo(){

    const [collection,setCollection]=useState([]);
    const [loading,setLoading]=useState(true);



    useEffect(()=>{
        async function fetchPostCode(){
            const resp=await AdminClient.get('promo');
            setCollection([...resp.data.promo]);
            setLoading(false);
        }
        fetchPostCode();
        
    },[]);

    const deleteData=async (id)=>{
        const resp=await AdminClient.delete('promo',{params:{id:id}});
        if(resp.data.statuscode===200){
            let newData=collection.filter((x)=>x.id!==id);
            setCollection(newData);
        }
        
    }

    return(
        <>
            <Outlet context={[loading,collection,setCollection,deleteData]} />
        </>
    );
}