import React,{useEffect, useRef} from "react";
import { Card,Form,Input,Button,notification } from "antd";
import { Link, useOutletContext,useNavigate } from "react-router-dom";
import { AdminClient } from "../../Misc/Api";


const EditPostalCode=()=>{
    const [loading,collection,setCollection,deleteData,editData,editpost,seteditpost]=useOutletContext();
    const navigate=useNavigate();
    const editPostCodeForm=useRef();
    const backLink=useRef();
    const goBack=()=>{
        backLink.current.click()
    }
    const openNotificationWithIcon = data => {
        notification['error']({
          message: data.statuscode,
          description:data.message
        });
    };
    const editPostalCode=async values=>{
        values.id=editpost.id
        const resp=await AdminClient.patch('postcode',{...values});
        if (resp.data.statuscode===200){
            setCollection([...resp.data.postcodes]);
            editPostCodeForm.current.resetFields();
            backLink.current.click()
        }else{
            openNotificationWithIcon(resp.data);

        }
        // setFormData({"picture":picture,"icon":icon,"name":values.name,"description":values.description});
    }
    const submitForm=()=>{
        editPostCodeForm.current.submit();
    }

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
        },
        number: {
        range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */
    return(
        <>
            <h1>Edit Postal Code</h1>
            <Card style={{ width: '100%' }}>
                <Form ref={editPostCodeForm} initialValues={{...editpost}} name="nest-messages" onFinish={editPostalCode} validateMessages={validateMessages}>
                    <Form.Item name={[ 'name']} label="Area Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter name" />
                    </Form.Item>
                    <Form.Item name={['country']} label="Country" rules={[{ required: true }]}>
                        <Input placeholder="Enter country name" />
                    </Form.Item>
                    <Form.Item name={['code']} label="Postal Code" rules={[{ required: true }]}>
                        <Input placeholder="Enter postal code"/>
                    </Form.Item>
                    <Form.Item name={['description']} label="Short Description">
                        <Input.TextArea placeholder="Enter short description"/>
                    </Form.Item>
                </Form>
                <div style={{float:'right'}}>
                    <Button.Group style={{float:'right',marginTop:'20px'}}>
                        <Link ref={backLink} to={'/panel/postcode/list'}></Link>
                        <Button onClick={goBack} type="danger" style={{margin:'5px'}}>Cancel</Button>
                        <Button type="primary" onClick={submitForm} style={{margin:'5px'}} >Update</Button>
                    </Button.Group>
                </div>
            </Card>
        </>
        
    );
}


export default EditPostalCode;