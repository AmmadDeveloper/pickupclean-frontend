import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate} from 'react-router-dom';
import { AdminClient } from "../Misc/Api";
import {notification} from 'antd';
const Services =()=>{
    
    const [collection,setCollection]=useState([]);
    const [isModalVisible,setIsModalVisible]=useState(false);
    const [editservice,seteditservice]=useState({});
    const ServiceForm=useRef();
    const navigate=useNavigate();
    const [categoryId, setCategoryId]=useState(0);
    const [typeId, setTypeId]=useState(0);
    const [loading,setLoading]=useState(true);




    const SelectChange=(e)=>{
        setCategoryId(e);
      }
    const SetTypeChange=(e)=>{
      setTypeId(e);
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
  
    const handleOk = () => {
        ServiceForm.current.submit();
    };
  
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const deleteData=async (id)=>{
        const resp=await AdminClient.delete('service',{params:{id:id}});
        if(resp.data.statuscode===200){
            let newData=collection.filter((x)=>x.id!==id);
            setCollection(newData);
        }
        
    }

    const editData=async (id)=>{
      localStorage.setItem("EditServiceId",id);
      const resp=await AdminClient.get(`service?id=${id}`);
      seteditservice({...resp.data.service });
      navigate('/panel/services/edit');
    }

    const geteditData=async (id)=>{
      const resp=await AdminClient.get(`service?id=${id}`);
      seteditservice({...resp.data.service });
    }



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
      useEffect(()=>{
        async function fetchServices(){
            const resp=await AdminClient.get('service');
            setCollection([...resp.data.services]);
            setLoading(false);
        }
        fetchServices();
        
    },[]);


    const onEditFinish = async (values) => {
      debugger;
      values.id=editservice.id;
      let valid=true;
        if (categoryId!==0){
          values.category_id=categoryId
        }else if(values.cat!==0){
          values.category_id=values.cat
        }else{
          valid=false
        }
        if(typeId!==0){
          values.type_id=typeId
        }else if(values.type_id!==0){
          valid=true
        }else{
          valid=false
        }


        if(valid){
            const resp=await AdminClient.patch('service',{...values});
            if (resp.data.statuscode===200){
                setCollection([...resp.data.services])
                ServiceForm.current.resetFields();
                openNotificationWithIconSuccess(resp.data);
                navigate('/panel/services/list')
            }else{
              openNotificationWithIcon(resp.data);
            }
        }else{
          let resp={
            data:{
              statuscode:400,
              message:"Please enter valid data"
            }
          }
          openNotificationWithIcon(resp)
        }
        values['key']=values.name;
      
    };
    
    const onFinish = async (values) => {
      let valid=true;
        if (categoryId!==0 && typeId!==0){
          values.category_id=categoryId;
          values.type_id=typeId
        }else{
          valid=false
        }
        
        if(valid){
            const resp=await AdminClient.post('service',{...values});
            if (resp.data.statuscode===200){
                setCollection([...collection,resp.data.service])
                ServiceForm.current.resetFields();
                openNotificationWithIconSuccess(resp.data);
                navigate('/panel/services/list')
            }else{
              openNotificationWithIcon(resp.data);
            }
          }else{
            let resp={
              data:{
                statuscode:400,
                message:"Please enter valid data"
              }
            }
            openNotificationWithIcon(resp)
          }
        values['key']=values.name;
        
      };
    
        
        return(
            <>
                <Outlet context={[loading,collection,isModalVisible,showModal,handleCancel,handleOk,deleteData,onFinish,ServiceForm,SelectChange,editData,editservice,seteditservice,onEditFinish,SetTypeChange,geteditData]}/> 
            </>
        );
}

export default Services;