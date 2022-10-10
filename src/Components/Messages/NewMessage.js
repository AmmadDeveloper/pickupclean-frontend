import React, { useState } from "react";
import {Card,Form,Button, Input,Row,Col,notification, Select} from 'antd';
import { AdminClient } from "../../Misc/Api";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserSelection from "../../Common/UserSelection";

const NewMessage =()=>{
    const [loading,collection,setCollection]=useOutletContext();
        const [showPhone,setShowPhone]=useState(false);
        const [smsBody,setSmsBody]=useState('');
        const [value, setValue] = useState([]);
        const navigate=useNavigate();
        
        async function fetchUserList(username) {
            const resp=await AdminClient.get(`contact?name=${username}`);
            return resp.data.users.map((x)=>({
                key:x.id,
                label: `${x.firstname} ${x.lastname}`,
                value: x.phone[0],
                disabled: x.phone.length>0?false:true
            }));
            
        }

        const goBack=()=>{
            navigate('/panel/messages/list');
        }
        const changePhoneSelection=(val)=>{
            if(val==='individual'){
                setShowPhone(true)
            }else{
                setShowPhone(false)
            }
        }


        const validatePhone=(phone)=>{
            return String(phone).toLowerCase().match(
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            )
        }



        const openNotificationWithIcon = data => {
            notification['error']({
              message: data.statuscode,
              description:data.message
            });
        };

        const openNotificationWithIconSuccess = data => {
            notification[data.message]({
              message: data.statusmessge,
              description:data.message
            });
        };

        const SMSSend=async ()=>{
            var values={}
            if(showPhone){
                var valid=true;
                value.forEach(element => {
                    if(!validatePhone(element.value)){
                        let data={
                            "statuscode":"Phone not valid",
                            "message":element.value
                        }
                        openNotificationWithIcon(data);
                        valid=false
                    }
                });
                if (!valid){return}
                
                values.body=smsBody
                values.phones=value.map((x)=>x.value)
                values.to='individual'
                await AdminClient.post('sendSms/',{...values}).then((res)=>{
                    setValue([])
                    setSmsBody('')
                    openNotificationWithIconSuccess(res.data);
                    setCollection([...res.data.records]);
                    goBack();
                }).catch((res)=>{
                    openNotificationWithIcon(res.data);
                })
                
            }else{
                values.body=smsBody
                values.to='all'
                await AdminClient.post('sendSms/',{...values}).then((res)=>{
                    openNotificationWithIconSuccess(res.data);
                    setSmsBody('');
                    setCollection([...res.data.records]);
                    goBack();
                }).catch((res)=>{
                    openNotificationWithIcon(res.data);
                })
            }
        }

        return(
            <>
            <Row>
                <Col style={{padding:'20px'}} span={12} sm={24} xs={24} md={24} lg={24} xl={24} xxl={24}>
                    <Card title="New Message" style={{ width: '100%',marginTop:'2%',minHeight:'500px' }}>
                        <Row>
                        <Col lg={8} md={24} xs={24} sm={24}>
                                <Form.Item label={'To:'}>
                                    <Select onChange={changePhoneSelection} defaultValue="everyone">
                                        <Select.Option value={"everyone"}>Everyone</Select.Option>
                                        <Select.Option value={"individual"}>Individual</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item  style={{display:`${!showPhone?'none':'block'}`}} label={'Phone Numbers:'}>
                                <UserSelection
                                    mode="multiple"
                                    value={value}
                                    placeholder="Select users"
                                    fetchOptions={fetchUserList}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                        console.log(value);
                                    }}
                                    style={{
                                        width: '100%',
                                    }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Input.TextArea value={smsBody} onChange={(e)=>setSmsBody(e.target.value)} rows={10} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Button type="primary" onClick={SMSSend} style={{margin:'5px',float:'right',marginTop:'2%'}} >Send</Button>
                                <Button onClick={goBack} type="danger" style={{margin:'5px',float:'right',marginTop:'2%'}} >Cancel</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>      
        </>
        );
}

export default NewMessage;