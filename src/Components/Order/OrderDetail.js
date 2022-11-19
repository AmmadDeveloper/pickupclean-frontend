import React,{useEffect, useRef, useState} from "react";
import { Card,Badge,Button,Row,Col } from "antd";
import { Link, useOutletContext } from "react-router-dom";
import { AdminClient } from "../../Misc/Api";
import DetailTile from "./DetailTile";


const OrderDetail=()=>{
    const [loading,collection,setCollection,viewData,detailId,setDetailId,reloadOrders]=useOutletContext();
    const navigate=useRef();
    const [order,setorder]=useState({cartdata:[],paymentdata:{}})
    const goBack=()=>{
        navigate.current.click()
        
    }

    const updateStatus=async (status)=>{
        
        const resp=await AdminClient.patch(`/orderstatus/?id=${order.id}&status=${status}`);
        setorder(resp.data.order)
        reloadOrders();
    }
    useEffect(()=>{
        async function fetchPostCode(){
            const resp=await AdminClient.get(`orderdetail/?id=${detailId}`);
            setorder(resp.data.order)
        }
        fetchPostCode();
    },[])
    const ActionBtns=()=>{
        switch(order.status){
            case "in-progress":
                return(<>
                    <Button onClick={()=>updateStatus("completed")} type="primary">Completed</Button>
                    <Button onClick={()=>updateStatus("declined")} type="primary" danger style={{marginLeft:'5px'}}>Decline</Button>
                    <Button onClick={goBack} type="ghost" style={{marginLeft:'5px'}}>Back</Button></>)
            case "declined":
                return(<>
                    <Button onClick={goBack} type="ghost" style={{marginLeft:'5px'}}>Back</Button></>)
            case "refunded":
                return(<>
                    <Button onClick={goBack} type="ghost" style={{marginLeft:'5px'}}>Back</Button></>)
            // case "pickedup":
            //     return(<>
            //         <Button onClick={()=>updateStatus("processing")} type="primary">Start Processing</Button>
            //         <Button onClick={goBack} type="ghost" style={{marginLeft:'5px'}}>Back</Button></>)
            // case "processing":
            //     return(<>
            //         <Button onClick={()=>updateStatus("shipped")} type="primary">Ship</Button>
            //         <Button onClick={goBack} type="ghost" style={{marginLeft:'5px'}}>Back</Button></>)
            // case "shipped":
            //     return(<>
            //         <Button onClick={()=>updateStatus("delivered")} type="primary">Delivered</Button>
            //         <Button onClick={goBack} type="ghost" style={{marginLeft:'5px'}}>Back</Button></>)
            case "completed":
                return(<>
                    <Button onClick={goBack} type="ghost" style={{marginLeft:'5px'}}>Back</Button></>)
            default:
                break;
        }
    }
    const getColor=()=>{
        switch(order.status){
            case "in-progress":
                return('yellow');
            case "declined":
                return('red');
            case "refunded":
                return('blue')
            // case "pickedup":
            //     return('orange')
            // case "processing":
            //     return('black')
            // case "shipped":
            //     return('purple')
            case "completed":
                return('green')
            default:
                return('blue')
        }
    }
    /* eslint-enable no-template-curly-in-string */
    return(
        <>
        <Link style={{visibility:'hidden'}} ref={navigate} to={"/panel/order/list"}></Link>
            <h1>Order Details</h1>
            <Row align="top">
                <Col span={16} style={{marginTop:'1%'}} lg={16} xs={24} sm={24}>
                    <Card style={{ width: '100%' }}>
                        <h3 style={{marginBottom:'4%'}}>Cart List</h3>
                        {order.cartdata.map((data)=><DetailTile key={`${data.id}`} name={`${data.servicename} - ${data.categoryname}`} amount={data.price} total={data.total} qty={data.quantity} src={data.categoryimage}/>)}
                        <Row style={{marginTop:'20px'}}>
                            <Col span={17}></Col>
                            <Col span={5}><h2 style={{textAlign:'right'}}>Total: {order.totalamount}</h2></Col>
                        </Row>
                        
                    </Card>
                </Col>
                <Col style={{marginTop:'1%'}} span={7} lg={7} xs={24} sm={24}>
                    <Row>
                        <Col span={24}>
                            <Badge.Ribbon color={getColor()} text={order.status}>
                                <Card style={{ width: '100%' }}>
                                    <h3 style={{marginBottom:'30px'}}>Order Details</h3>
                                    <Row>
                                        <Col span={12}>
                                            <h4>Order Id</h4>
                                        </Col>
                                        <Col style={{textAlign:'right'}} span={12}>{order.id}</Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col span={12}>
                                            <h4>Customer Name</h4>
                                        </Col>
                                        <Col style={{textAlign:'right'}} span={12}>{order.fullname}</Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col span={12}>
                                            <h4>Phone</h4>
                                        </Col>
                                        <Col style={{textAlign:'right'}} span={12}>{order.phone}</Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col span={12}>
                                            <h4>Email</h4>
                                        </Col>
                                        <Col style={{textAlign:'right'}} span={12}>{order.email}</Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col span={12}>
                                            <h4>Order Date</h4>
                                        </Col>
                                        <Col style={{textAlign:'right'}} span={12}>{order.order_date}</Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col span={9}>
                                            <h4>Order Address</h4>
                                        </Col>
                                        <Col style={{textAlign:'right'}} span={15}>{order.address}</Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col span={12}>
                                            <h4>PickUp Time</h4>
                                        </Col>
                                        <Col style={{textAlign:'right'}} span={12}><b>({order.pickup_time}) {order.pickup_date}</b> </Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col span={12}>
                                            <h4>Dropoff Time</h4>
                                        </Col>
                                        <Col style={{textAlign:'right'}} span={12}><b>({order.dropoff_time}) {order.dropoff_date}</b> </Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col span={12}>
                                            <h4>Item Count</h4>
                                        </Col>
                                        <Col style={{textAlign:'right'}} span={12}>({order.item_count}) </Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col span={12}>
                                            <h4>Payment Id</h4>
                                        </Col>
                                        <Col style={{textAlign:'right'}} span={12}>{order.paymentdata.id}</Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col span={12}>
                                            <h4>Amount</h4>
                                        </Col>
                                        <Col style={{textAlign:'right'}} span={12}>£{order.paymentdata.amount/100}</Col>
                                    </Row>
                                    <Row style={{marginTop:'50px',textAlign:'right'}}>
                                        <Col span={24}>
                                                
                                                {ActionBtns()}
                                        </Col>
                                    </Row>
                                </Card>
                            </Badge.Ribbon>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
            
        </>
        
    );
}


export default OrderDetail;