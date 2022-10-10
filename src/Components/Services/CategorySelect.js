import React, { useState,useRef, useEffect } from 'react';
import { Select,message, Divider, Modal,Input, Typography, Space, Form,Upload,Button,notification } from 'antd';
import { PlusOutlined,UploadOutlined } from '@ant-design/icons';
import { AdminClient, Serverurl } from '../../Misc/Api';

const { Option } = Select;
const data={
  "name":"",
  "icon":"",
  "picture":"",
  "description":"",
  "short_description":""
}
const CategorySelect = ({items,setItems,SelectChange,id}) => {
  const addCatForm=useRef();
  const [formData,setFormData]=useState({...data});
  const [icon,setIcon]=useState("");
  const [picture,setPicture]=useState("");
  const [value,setvalue]=useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // useEffect(()=>{
  //   async function create(){
  //     if(formData.name!==""){
  //       const resp=await AdminClient.post('category',{...formData});
  //       if (resp.data.statuscode===200){
  //         setItems([...items, resp.data.category]);
  //         addCatForm.current.resetFields();
  //         setIsModalVisible(false);
  //       }else{
  //         openNotificationWithIcon(resp.data);
  //       }
  //     }
  //   }
  //   create()
    
  // },[formData])


  const openNotificationWithIcon = data => {
    notification['error']({
      message: data.statuscode,
      description:data.message
    });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addItem = e => {
    addCatForm.current.submit();
    e.preventDefault();
  };

  const addCategory=async values=>{
    if(values.name!==""){
      const resp=await AdminClient.post('category',{"picture":picture,"icon":icon,"name":values.name,"description":values.description,"short_description":values.short_description});
      if (resp.data.statuscode===200){
        setItems([...items, resp.data.category]);
        addCatForm.current.resetFields();
        setIsModalVisible(false);
      }else{
        openNotificationWithIcon(resp.data);
      }
    }
  }

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
  
  return (
      <>
    <Select
      defaultValue={(id!=='nest-messages_cat')?id:[]}
      style={{ width: '100%' }}
      placeholder="Select Category"
      onChange={SelectChange}
      dropdownRender={menu => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space align="center" style={{ padding: '0 8px 4px',textAlign:'center' }}>
            <Typography.Link onClick={showModal} style={{ whiteSpace: 'nowrap' }}>
              <PlusOutlined /> New item
            </Typography.Link>
          </Space>
        </>
      )}
    >
      {items.map(item =>(
            <Option key={`Cat${item.id}`} value={item.id}>{item.name}</Option>
          ))}
    </Select>
    <Modal title="New Category" visible={isModalVisible} onOk={addItem} onCancel={handleCancel}>
        <Form ref={addCatForm} onFinish={addCategory} >
        <Form.Item name={[ 'name']} label="Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter name" />
                    </Form.Item>
                    <Form.Item name={[ 'icon']} label="Icon" rules={[{ required: true }]}>
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <Upload
                                action={`${Serverurl}/panel/api/upload`}
                                listType="picture"
                                maxCount={1}
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
      </Modal>
    </>
  );
};

export default CategorySelect;