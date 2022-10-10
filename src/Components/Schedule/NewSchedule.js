import React,{useRef} from "react";
import { Card,Form,Input,Button,notification,TimePicker,Select } from "antd";
import { Link, useOutletContext,useNavigate } from "react-router-dom";
import { AdminClient } from "../../Misc/Api";


const initalData=[
    {
    "weekday":"Monday",
    "timeslots":[]
    },
    {
        "weekday":"Tuesday",
        "timeslots":[]
    },
    {
        "weekday":"Wednesday",
        "timeslots":[]
    },
    {
        "weekday":"Thursday",
        "timeslots":[]
    },
    {
        "weekday":"Friday",
        "timeslots":[]
    },
    {
        "weekday":"Saturday",
        "timeslots":[]
    },
    {
        "weekday":"Sunday",
        "timeslots":[]
    }
]

const initialTimeSlot={
    "slot":"",
    "eco":false
}

const NewSchedule=()=>{
    const {RangePicker}=TimePicker;
    const {Option}=Select;
    const [collection,setCollection]=useOutletContext();
    const navigate=useNavigate();
    const addScheduleForm=useRef();
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


    const addSchedule=async values=>{
        // const resp=await AdminClient.post('postcode',{...values});
        // if (resp.data.statuscode===200){
        //     setCollection([...collection, resp.data.postcode]);
        //     addScheduleForm.current.resetFields();
        //     navigate('/admin/postcode/list');
        // }else{
        //     openNotificationWithIcon(resp.data);

        // }
            console.log(values);
        // setFormData({"picture":picture,"icon":icon,"name":values.name,"description":values.description});
    }
    const submitForm=()=>{
        addScheduleForm.current.submit();
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
            <h1>Set Schedule</h1>
            <Card style={{ width: '100%' }}>
                
                <Form ref={addScheduleForm} name="nest-messages" onFinish={addSchedule} validateMessages={validateMessages}>
                    <Form.Item name={[ 'monday']} label="Monday" rules={[{ required: true }]}>
                        <RangePicker style={{width:'100%'}} />
                    </Form.Item>
                    <Form.Item name={[ 'tuesday']} label="Tuesday" rules={[{ required: true }]}>
                        <RangePicker />
                    </Form.Item>
                    <Form.Item name={[ 'wednesday']} label="Wednesday" rules={[{ required: true }]}>
                        <RangePicker />
                    </Form.Item>
                    <Form.Item name={[ 'thursday']} label="Thursday" rules={[{ required: true }]}>
                        <RangePicker />
                    </Form.Item>
                    <Form.Item name={[ 'friday']} label="Friday" rules={[{ required: true }]}>
                        <RangePicker />
                    </Form.Item>
                    <Form.Item name={[ 'saturday']} label="Saturday" rules={[{ required: true }]}>
                        <RangePicker />
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


export default NewSchedule;