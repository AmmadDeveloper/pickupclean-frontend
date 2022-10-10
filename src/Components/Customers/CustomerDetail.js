import React,{useRef} from "react";
import { Card,Form,Input,Button,notification } from "antd";
import { Link, useOutletContext,useNavigate } from "react-router-dom";
import { AdminClient } from "../../Misc/Api";


const CustomerDetail=()=>{
    const [collection,setCollection]=useOutletContext();
    const navigate=useNavigate();
    const addPostCodeForm=useRef();
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


    const addPostalCode=async values=>{
        const resp=await AdminClient.post('postcode',{...values});
        if (resp.data.statuscode===200){
            setCollection([...collection, resp.data.postcode]);
            addPostCodeForm.current.resetFields();
            navigate('/admin/postcode/list');
        }else{
            openNotificationWithIcon(resp.data);

        }
            console.log(values);
        // setFormData({"picture":picture,"icon":icon,"name":values.name,"description":values.description});
    }
    const submitForm=()=>{
        addPostCodeForm.current.submit();
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
            <h1>New Postal Code</h1>
            <Card style={{ width: '100%' }}>
                <Form ref={addPostCodeForm} name="nest-messages" onFinish={addPostalCode} validateMessages={validateMessages}>
                    <Form.Item name={[ 'name']} label="Area Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['country']} label="Country" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['code']} label="Postal Code" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['description']} label="Short Description">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
                <div style={{float:'right'}}>
                    <Button.Group style={{float:'right',marginTop:'20px'}}>
                        <Link ref={backLink} to={'/admin/services/list'}></Link>
                        <Button onClick={goBack} type="danger" style={{margin:'5px'}}>Cancel</Button>
                        <Button type="primary" onClick={submitForm} style={{margin:'5px'}} >Save</Button>
                    </Button.Group>
                </div>
            </Card>
        </>
        
    );
}


export default CustomerDetail;