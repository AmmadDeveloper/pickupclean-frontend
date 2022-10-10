import React, { useEffect, useState } from "react";
import {Card,Form,TimePicker,Button, Input,Row,Col,notification} from 'antd';
import moment from "moment";
import { AdminClient } from "../Misc/Api";
import UploadImage from "../Components/Settings/UploadImage";
const Settings =()=>{
    const {RangePicker}=TimePicker;


    // const [data,setData]=useState({
    //     "schedule":{
    //         "monday":[moment('09:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss')],
    //         "tuesday":[moment('09:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss')],
    //         "wednesday":[moment('09:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss')],
    //         "thursday":[moment('09:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss')],
    //         "friday":[moment('09:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss')],
    //         "saturday":[moment('09:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss')]
    //     },
    //     "emailConfig":{
    //         "email":"",
    //         "password":""
    //     },
    //     "phoneConfig":{
    //         "phone":""
    //     },
    //     "paymentConfig":{
    //         "publishablekey":'',
    //         "secretkey":''
    //     }
    // })

    const [scheduledata,setScheduleData]=useState({
            "monday":[moment('09:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss')],
            "tuesday":[moment('09:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss')],
            "wednesday":[moment('09:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss')],
            "thursday":[moment('09:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss')],
            "friday":[moment('09:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss')],
            "saturday":[moment('09:00:00', 'HH:mm:ss'), moment('15:00:00', 'HH:mm:ss')]
    })
    const [emailData,setEmailData]=useState({
            "email":"",
            "password":""

    })

    const [phoneData,setPhoneData]=useState({
        "phone":""
    })

    const [paymentData,setPaymentData]=useState({
        "paymentConfig":{
            "publishablekey":'',
            "secretkey":''
        }
    })

    useEffect(()=>{

        const getData=async ()=>{
            await AdminClient.get('settings').then((res)=>{
                let obj={}
                let settings=res.data.settings;
                for (const [key, value] of Object.entries(settings.schedule)) {
                    var vals=value.map((x)=>moment(x,'YYYY-MM-DD HH:mm:ss'))
                    obj[key]=vals
                }
                console.log(obj)
                console.log(res.data)
                setPhoneData({...res.data.settings.phoneConfig})
                setPaymentData({...res.data.settings.paymentConfig})
                setEmailData({...res.data.settings.emailConfig})
                setScheduleData(obj)
                // newData['schedule']=obj;
                // newData['emailConfig']=settings.emailConfig;
                // newData['phoneConfig']=settings.phoneConfig;
                // setData(newData);
    
            });
        }
        getData();
        

    },[])


    useEffect(()=>{
        console.log(phoneData.phone)
    },[phoneData])



    // useEffect(()=>{
    //     form.current.resetFields();
    //     emailform.current.resetFields();
    //     phoneform.current.resetFields();
    // },[data])

    
        const updateValue=(name,valname,value)=>{
            if(name==="schedule"){
                let data=scheduledata;
                data[valname]=value
                setScheduleData({...data})
            }else if(name==="emailConfig"){
                let data=emailData;
                data[valname]=value.target.value
                setEmailData({...data});
            }else if(name==="phoneConfig"){
                let data=phoneData;
                data[valname]=value.target.value
                setPhoneData({...data});
            }else if(name==="paymentConfig"){
                let data=paymentData;
                data[valname]=value.target.value
                setPaymentData({...data});
            }

        }
        
        const openNotificationWithIcon = data => {
            notification['success']({
              message: data.statuscode,
              description:data.message
            });
          };
        
        const submitForm=async ()=>{
            let obj={}
            for (const [key, value] of Object.entries(scheduledata)) {
                var vals=value.map((x)=>x.format('YYYY-MM-DD HH:mm:ss'))
                obj[key]=vals;
              }
            let reqObj={
                "phoneConfig":phoneData,
                "emailConfig":emailData,
                "paymentConfig":paymentData
            };
            reqObj['schedule']=obj;

            await AdminClient.post('settings',{...reqObj}).then((res)=>{
                // let newData={}
                // let obj={}
                // for (const [key, value] of Object.entries(res.data.settings['schedule'])) {
                //     var vals=value.map((x)=>moment(x,'YYYY-MM-DD HH:mm:ss'))
                //     obj[key]=vals
                // }
                // newData['schedule']=obj;
                // newData['emailConfig']=res.data.settings.emailConfig;
                // newData['phoneConfig']=res.data.settings.phoneConfig;
                // setData({...newData});
                openNotificationWithIcon(res.data)

            });
        }
        return(
            <>
            <Row>
                <Col style={{padding:'20px'}} span={12} sm={24} xs={24} md={24} lg={12} xl={12} xxl={8}>
                    <Card title="Setup Schedule" style={{ width: '100%',marginTop:'2%',minHeight:'500px' }}>
                            <Form.Item label="Monday" rules={[{ required: true }]}>
                                <RangePicker value={scheduledata.monday} onChange={(e)=>updateValue("schedule","monday",e)} />
                            </Form.Item>
                            <Form.Item label="Tuesday" rules={[{ required: true }]}>
                                <RangePicker value={scheduledata.tuesday} onChange={(e)=>updateValue("schedule","tuesday",e)}/>
                            </Form.Item>
                            <Form.Item label="Wednesday" rules={[{ required: true }]}>
                                <RangePicker value={scheduledata.wednesday} onChange={(e)=>updateValue("schedule","wednesday",e)}/>
                            </Form.Item>
                            <Form.Item label="Thursday" rules={[{ required: true }]}>
                                <RangePicker value={scheduledata.thursday} onChange={(e)=>updateValue("schedule","thursday",e)}/>
                            </Form.Item>
                            <Form.Item label="Friday" rules={[{ required: true }]}>
                                <RangePicker value={scheduledata.friday} onChange={(e)=>updateValue("schedule","friday",e)}/>
                            </Form.Item>
                            <Form.Item label="Saturday" rules={[{ required: true }]}>
                                <RangePicker value={scheduledata.saturday} onChange={(e)=>updateValue("schedule","saturday",e)}/>
                            </Form.Item>
                    </Card>
                </Col>
                <Col style={{padding:'20px'}} span={12} sm={24} xs={24} md={24} lg={12} xl={12} xxl={8}>
                    <Card title="Setup Email" style={{ width: '100%',marginTop:'2%',minHeight:'500px' }}>
                            <Form.Item label="Email" rules={[{ required: true }]}>
                                <Input value={emailData.email} style={{width:'100%'}} onChange={(e)=>updateValue("emailConfig","email",e)} />
                            </Form.Item>
                            <Form.Item label="password" rules={[{ required: true }]}>
                                <Input.Password value={emailData.password}  onChange={(e)=>updateValue("emailConfig","password",e)}/>
                            </Form.Item>
                    </Card>
                </Col>
                <Col style={{padding:'20px'}} span={12} sm={24} xs={24} md={24} lg={12} xl={12} xxl={8}>
                    <Card title="Setup Phone Number" style={{ width: '100%',marginTop:'2%',minHeight:'500px' }}>
                            <Form.Item label="Phone Number" rules={[{ required: true }]}>
                                <Input value={phoneData.phone} onChange={(e)=>updateValue("phoneConfig","phone",e)} />
                            </Form.Item>

                    </Card>
                </Col>
                <Col style={{padding:'20px'}} span={12} sm={24} xs={24} md={24} lg={12} xl={12} xxl={8}>
                    <Card title="Setup Payment Processor" style={{ width: '100%',marginTop:'2%',minHeight:'500px' }}>
                            <Form.Item label="Publishable Key" rules={[{ required: true }]}>
                                <Input value={paymentData.publishablekey} style={{width:'100%'}} onChange={(e)=>updateValue("paymentConfig","publishablekey",e)} />
                            </Form.Item>
                            <Form.Item label="Secret Key" rules={[{ required: true }]}>
                                <Input.Password value={paymentData.secretkey} onChange={(e)=>updateValue("paymentConfig","secretkey",e)}/>
                            </Form.Item>
                    </Card>
                </Col>
                <Col style={{padding:'20px'}} span={12} sm={24} xs={24} md={24} lg={12} xl={12} xxl={8}>
                    <Card title="Setup Homepage Images" style={{ width: '100%',marginTop:'2%',minHeight:'500px' }}>
                        <UploadImage/>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                <div style={{float:'right'}}>
                <Button.Group style={{float:'right',marginTop:'20px'}}>
                    <Button type="primary" onClick={submitForm} style={{margin:'5px'}} >Save</Button>
                </Button.Group>
            </div>
                </Col>
            </Row>
            
            
            
            
        </>
        );
}

export default Settings;