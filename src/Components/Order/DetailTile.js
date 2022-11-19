import React from "react";
import { Row,Col } from "antd";


export default function DetailTile(props){
    return(
        <>
            <Row>
                <Col span={3} lg={3} sm={6} xs={5}>
                    <img width={'100%'} height={'100%'} src={`${props.src}`} alt="not found"/>
                </Col>
                <Col span={14} lg={14} sm={12}  xs={14}><p style={{marginTop:'2%'}}><strong >{props.name}</strong><br/>{props.amount} X {props.qty}</p></Col>
                <Col span={5} lg={5} sm={6} xs={5}><p style={{textAlign:'right',marginTop:'2%'}}><b>£{props.total}</b></p></Col>
                
            </Row>
            <hr style={{marginLeft:'70px',marginRight:'70px',borderColor:'ghostwhite'}}/>
        </>
    )
}