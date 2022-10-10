import React,{useRef} from "react";
import { Card,Form,Input,Button,notification, DatePicker, Select } from "antd";
import { Link, useOutletContext,useNavigate } from "react-router-dom";
import { AdminClient } from "../../Misc/Api";


const NewPromo=()=>{
    const [loading,collection,setCollection,deleteData]=useOutletContext();
    const navigate=useNavigate();
    const addPromoCodeForm=useRef();
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


    const addPromoCode=async values=>{
        values.until=values.until.format('YYYY-MM-DD HH:mm:ss')
        values.value=+values.value
        const resp=await AdminClient.post('promo',{...values});
        if (resp.data.statuscode===200){
            setCollection([...collection, resp.data.promo]);
            addPromoCodeForm.current.resetFields();
            navigate('/panel/promo/list');
        }else{
            openNotificationWithIcon(resp.data);

        }
        
            console.log(values);
        // setFormData({"picture":picture,"icon":icon,"name":values.name,"description":values.description});
    }
    const submitForm=()=>{
        addPromoCodeForm.current.submit();
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
            <h1>New Promo Code</h1>
            <Card style={{ width: '100%' }}>
                <Form ref={addPromoCodeForm} name="nest-messages" onFinish={addPromoCode} validateMessages={validateMessages}>
                    <Form.Item name={[ 'title']} label="Title" rules={[{ required: true }]}>
                        <Input placeholder="Enter promo title"/>
                    </Form.Item>
                    <Form.Item name={['until']} label="Valid until" rules={[{ required: true }]}>
                        <DatePicker style={{width:'100%'}} />
                    </Form.Item>
                    <Form.Item name={['type']} label="Type" rules={[{ required: true }]}>
                        <Select placeholder="Select a type">
                            <Select.Option value="percentage">Percentage</Select.Option>
                            <Select.Option value="amount">Amount</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={['value']} label="Value">
                        <Input placeholder="Enter promo value" />
                    </Form.Item>
                </Form>
                <div style={{float:'right'}}>
                    <Button.Group style={{float:'right',marginTop:'20px'}}>
                        <Link ref={backLink} to={'/panel/promo/list'}></Link>
                        <Button onClick={goBack} type="danger" style={{margin:'5px'}}>Cancel</Button>
                        <Button type="primary" onClick={submitForm} style={{margin:'5px'}} >Save</Button>
                    </Button.Group>
                </div>
            </Card>
        </>
        
    );
}


export default NewPromo;