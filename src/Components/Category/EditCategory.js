import React,{useState,useRef, useEffect} from "react";
import { Form,Button,Upload,Input,Space,message,Card,notification } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { Link, useOutletContext } from "react-router-dom";
import { AdminClient, Serverurl } from "../../Misc/Api";
import {useNavigate} from 'react-router-dom';


export default function EditCategory(){
    const [loading,collection,setCollection,deleteData,editData,editcategory,seteditcategory]=useOutletContext();


    const [icon,setIcon]=useState("");
    const [picture,setPicture]=useState("");
    const navigate=useNavigate();
    const backLink=useRef();
    const goBack=()=>{
        backLink.current.click()
    }
    const editCatForm=useRef();


    const openNotificationWithIcon = data => {
        notification['error']({
          message: data.statuscode,
          description:data.message
        });
    };
    const uiprops={
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
          // if (info.file.status !== 'uploading') {
          //   console.log(info.file, info.fileList);
          // }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setIcon(info.file.response.name);
                //info.file.response.name
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    }
    
    
    const upprops={
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
          // if (info.file.status !== 'uploading') {
          //   console.log(info.file, info.fileList);
          // }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setPicture(info.file.response.name);
                //info.file.response.name
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
      }
    const editCategory=async values=>{
        values.icon=icon;
        values.picture=picture;
        values.id=editcategory.id
        const resp=await AdminClient.patch('category',{...values});
        if (resp.data.statuscode===200){
            setCollection([...resp.data.categories]);
            editCatForm.current.resetFields();
            navigate('/panel/category/list');
        }else{
            openNotificationWithIcon(resp.data);

        }
        // setFormData({"picture":picture,"icon":icon,"name":values.name,"description":values.description});
    }
    const submitForm=()=>{
        editCatForm.current.submit();
    }

    useEffect(()=>{
        setIcon(editcategory.icon_path)
        setPicture(editcategory.picture_path)
        
    },[])
    
    return(
        <>
        <h1>Edit Category</h1>
            <Card style={{ width: '100%' }}>
                <Form initialValues={{...editcategory}} ref={editCatForm} onFinish={editCategory} >
                    <Form.Item name={[ 'name']} label="Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter name"/>
                    </Form.Item>
                    <Form.Item name={[ 'icon']} label="Icon" rules={[{ required: true }]}>
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <Upload
                                action={`${Serverurl}/panel/api/upload`}
                                listType="picture"
                                maxCount={1}
                                defaultFileList={[...editcategory.icon]}
                                {...uiprops}
                            >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                        </Space>
                    </Form.Item>
                    <Form.Item name={[ 'picture']} label="Background" rules={[{ required: true }]}>
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <Upload
                                action={`${Serverurl}/panel/api/upload`}
                                listType="picture"
                                maxCount={1}
                                defaultFileList={[...editcategory.picture]}
                                {...upprops}
                            >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                        </Space>
                    </Form.Item>
                    <Form.Item name={['short_description']} label="Short Description">
                        <Input placeholder="Enter short description" />
                    </Form.Item>
                    <Form.Item name={['description']} label="Description">
                        <Input.TextArea placeholder="Enter description" />
                    </Form.Item>
                </Form>
                <div style={{float:'right'}}>
                <Button.Group style={{float:'right',marginTop:'20px'}}>
                    <Link ref={backLink} to={'/panel/category/list'}></Link>
                    <Button onClick={goBack} type="danger" style={{margin:'5px'}}>Cancel</Button>
                    <Button type="primary" onClick={submitForm} style={{margin:'5px'}} >Update</Button>
                </Button.Group>
                </div>
            </Card>
        </>
    )
}