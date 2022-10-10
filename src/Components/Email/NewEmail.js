import React, { useState } from "react";
import {Card,Form,Button,Row,Col,notification, Select, Input} from 'antd';

import Editor from "../Marketing/Editor";
import { AdminClient } from "../../Misc/Api";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserSelection from "../../Common/UserSelection";
const NewEmail =()=>{
        const [loading,collection,setCollection]=useOutletContext();
        const [showEmail,setShowEmail]=useState(false);
        const [emailContent,setEmailContent]=useState("");
        const [subject,setSubject]=useState("");
        const [resetForm,setresetForm]=useState(false);
        const [value, setValue] = useState([]);
        const navigate=useNavigate();
        
        async function fetchUserList(username) {
            const resp=await AdminClient.get(`contact?name=${username}`);
            return resp.data.users.map((x)=>({
                key:x.id,
                label: `${x.firstname} ${x.lastname}`,
                value: x.email
            }));
            
        }

        const goBack=()=>{
            navigate('/panel/email/list');
        }

        const changeEmailSelection=(val)=>{
            if(val==='individual'){
                setShowEmail(true)
            }else{
                setShowEmail(false)
            }
        }
        
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };


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



        const EmailSend=async ()=>{
            var values={}
            if(showEmail){
                var valid=true;
                value.forEach(element => {
                    if(!validateEmail(element.value)){
                        let data={
                            "statuscode":"Email not valid",
                            "message":element.value
                        }
                        openNotificationWithIcon(data);
                        valid=false
                    }
                });
                if (!valid){return}
                values.subject=subject;
                values.body=emailContent
                values.emails=value.map((x)=>x.value)
                values.to='individual'
                await AdminClient.post('sendEmail/',{...values}).then((res)=>{
                    setresetForm(true);
                    setValue([]);
                    setSubject("");
                    openNotificationWithIconSuccess(res.data);
                    setCollection([...res.data.records]);
                    goBack();
                }).catch((res)=>{
                    openNotificationWithIcon(res.data);
                })
            }else{
                values.body=emailContent
                values.subject=subject
                values.to='all'
                await AdminClient.post('sendEmail/',{...values}).then((res)=>{
                    setresetForm(true);
                    setSubject("");
                    openNotificationWithIconSuccess(res.data);
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
                    <Card title="New Email" style={{ width: '100%',marginTop:'2%',minHeight:'500px' }}>
                        <Row>
                            <Col lg={8} md={24} xs={24} sm={24}>
                                <Form.Item label={'Subject:'}>
                                    <Input onChange={(e)=>setSubject(e.target.value)} placeholder="Enter Message Subject"/>
                                </Form.Item>
                                <Form.Item label={'To:'}>
                                    <Select onChange={changeEmailSelection} defaultValue="everyone">
                                        <Select.Option value={"everyone"}>Everyone</Select.Option>
                                        <Select.Option value={"individual"}>Individual</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item style={{display:`${!showEmail?'none':'block'}`}} label={'Users:'}>
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
                                <Editor resetForm={resetForm} setresetForm={setresetForm} setemailContent={setEmailContent}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Button onClick={EmailSend} type="primary" style={{margin:'5px',float:'right',marginTop:'2%'}} >Send</Button>
                                <Button onClick={goBack} type="danger" style={{margin:'5px',float:'right',marginTop:'2%'}} >Cancel</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

        </>
        );
}

export default NewEmail;