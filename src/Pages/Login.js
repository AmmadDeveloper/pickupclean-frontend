import React from "react";
import LoginForm from "../Components/LoginForm";
import Logo from "../Static/imgs/logonew.png";
import BG from "../Static/imgs/Background.jpg";
import { Row,Col,Card,notification } from "antd";


export default class Login extends React.Component{
    openNotificationWithIcon = data => {
        notification['error']({
          message: data.statuscode,
          description:data.message
        });
      };
    state={username:"",password:""}
    render(){
        return(
            <Row style={{padding:'10%',backgroundImage:`url(${BG})`,backgroundSize:'cover',backgroundPosition:'center',minHeight:"100vh"}}>
                <Col lg={{ span: 6}} md={24} sm={24} xs={{span:24,offset:2}}></Col>
                <Col lg={{ span: 6}} md={24} sm={24} xs={24}>
                    <Card style={{ width: '100%' }}>
                        <Row>
                            <Col lg={{span:24}}>
                            <img style={{width:"80%",marginLeft:'auto',marginRight:'auto',display:'block',marginBottom:'10%'}} src={Logo} alt="Not Found" />
                            </Col>
                        </Row>
                        <LoginForm setUser={this.props.setUser} showNotification={this.openNotificationWithIcon}/>
                    </Card>
                </Col>
                <Col lg={{ span: 6 }} md={24} sm={24} xs={24}></Col>
            </Row>
        );
    }
}