import React, { useState,useRef } from 'react';
import { Select, Divider, Modal,message,Input, Typography, Space, Form,notification,Upload,Button } from 'antd';
import { PlusOutlined,UploadOutlined } from '@ant-design/icons';
import { AdminClient, Serverurl } from '../../Misc/Api';

const { Option } = Select;

const TypeSelect = ({types,setItems,SelectChange,id}) => {
  const addTypeForm=useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [picture,setPicture]=useState("");

  // useEffect(()=>{
  //   async function create(){
  //     if(formData.name!==""){
  //       const resp=await AdminClient.post('types',{...formData});
  //       if (resp.data.statuscode===200){
  //         setItems([...types, resp.data.type]);
  //         addTypeForm.current.resetFields();
  //         setIsModalVisible(false);
  //       }else{
  //         openNotificationWithIcon(resp.data);
  //       }
  //     }
  //   }
  //   create()
  //   // setFormData({...data})
    
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

  const addTypeOk = e => {
    addTypeForm.current.submit();
    e.preventDefault();
  };
  const addType=async values=>{
    
    if(values.name!=="" && picture!==""){
      values['picture']=picture
      const resp=await AdminClient.post('types',{...values});
      if (resp.data.statuscode===200){
        setItems([...types, resp.data.type]);
        addTypeForm.current.resetFields();
        setIsModalVisible(false);
      }else{
        openNotificationWithIcon(resp.data);
      }
    }
      // setFormData({"name":values.name});
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
      defaultValue={(id!=='nest-messages_type_id')?id:[]}
      style={{ width: '100%' }}
      placeholder="Select Type"
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
      {types.map(item =>(
            <Option key={`Type${item.id}`} value={item.id}>{item.name}</Option>
          ))}
    </Select>
    <Modal title="New Service Type" visible={isModalVisible} onOk={addTypeOk} onCancel={handleCancel}>
        <Form ref={addTypeForm} onFinish={addType} >
            <Form.Item name={[ 'name']} label="Name" placeholder="Enter name" rules={[{ required: true }]}>
                <Input />
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
      </Modal>
    </>
  );
};

export default TypeSelect;