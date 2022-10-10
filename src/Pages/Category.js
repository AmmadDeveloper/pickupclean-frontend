import React, { useEffect, useState } from "react";
import { Outlet,useNavigate } from 'react-router-dom';
import { AdminClient } from "../Misc/Api";
const Category =()=>{
    
    const navigate=useNavigate();
    const [collection,setCollection]=useState([]);
    const [editcategory,seteditcategory]=useState({});
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        async function fetchCategories(){
            const resp=await AdminClient.get('category');
            setCollection([...resp.data.categories]);
            setLoading(false);
        }
        fetchCategories();
        
    },[]);
    
    const deleteData=async (id)=>{
        const resp=await AdminClient.delete('category',{params:{id:id}});
        if(resp.data.statuscode===200){
            let newData=collection.filter((x)=>x.id!==id);
            setCollection(newData);
        }
        
    }

    const editData=async (id)=>{
        const resp=await AdminClient.get(`category?id=${id}`);
        seteditcategory({...resp.data.category});
        navigate('/panel/category/edit');
    }
        
    return(
        <>
            <Outlet context={[loading,collection,setCollection,deleteData,editData,editcategory,seteditcategory]}/> 
        </>
    );
}

export default Category;