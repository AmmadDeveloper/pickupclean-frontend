import React,{useState,useRef} from "react";
import { Form,Button,Upload,Input,Space,message,Card,notification } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { Link, useOutletContext } from "react-router-dom";
import { AdminClient, Serverurl } from "../../Misc/Api";
import {useNavigate} from 'react-router-dom';


export default function NewType(){
    const [loading,collection,setCollection,deleteData,editData,edittype,setedittype]=useOutletContext();
    const [picture,setPicture]=useState("");
    const navigate=useNavigate();
    const backLink=useRef();
    const goBack=()=>{
        backLink.current.click()
    }
    const addTypeForm=useRef();


    const openNotificationWithIcon = data => {
        notification['error']({
          message: data.statuscode,
          description:data.message
        });
    };
    
    
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
    const addType=async values=>{
        values.picture=picture;
        const resp=await AdminClient.post('types',{...values});
        if (resp.data.statuscode===200){
            setCollection([...collection, resp.data.type]);
            addTypeForm.current.resetFields();
            navigate('/panel/types/list');
        }else{
            openNotificationWithIcon(resp.data);

        }
        // setFormData({"picture":picture,"icon":icon,"name":values.name,"description":values.description});
    }
    const submitForm=()=>{
        addTypeForm.current.submit();
    }
    return(
        <>
        <h1>New Type</h1>
            <Card style={{ width: '100%' }}>
                <Form ref={addTypeForm} onFinish={addType} >
                    <Form.Item name={[ 'name']} label="Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter name" />
                    </Form.Item>
                    <Form.Item name={[ 'picture']} label="Picture" rules={[{ required: true }]}>
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <Upload
                                action={`${Serverurl}/panel/api/upload`}
                                listType="picture"
                                maxCount={1}
                                {...upprops}
                            >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                        </Space>
                    </Form.Item>
                    <Form.Item name={['description']} label="Description">
                        <Input.TextArea placeholder="Enter description" />
                    </Form.Item>
                </Form>
                <div style={{float:'right'}}>
                <Button.Group style={{float:'right',marginTop:'20px'}}>
                    <Link ref={backLink} to={'/panel/types/list'}></Link>
                    <Button onClick={goBack} type="danger" style={{margin:'5px'}}>Cancel</Button>
                    <Button type="primary" onClick={submitForm} style={{margin:'5px'}} >Save</Button>
                </Button.Group>
                </div>
            </Card>
        </>
    )
}