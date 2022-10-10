import React, { useEffect, useState } from "react";
import { Statistic, Card, Row, Col } from 'antd';
import {TeamOutlined,FieldTimeOutlined} from '@ant-design/icons';
import PieChart from "../Components/Dashboard/PieChart";
import LineChart from "../Components/Dashboard/LineChart";
import TreeMapGraph from "../Components/Dashboard/TreeMap";
import { AdminClient } from "../Misc/Api";

const Dashboard=() => {
  const [totalUser,setTotalUser]=useState(0);
  const [totalMonthSale,setTotalMonthSale]=useState(0);
  const [totalYearSale,setTotalYearSale]=useState(0);
  const [pendingOrders,setPendingOrders]=useState(0);
  useEffect(()=>{
    const fetchData=async ()=>{
      const resp=await AdminClient.get('dashboard')
      setTotalUser(resp.data.data.total_users);
      setTotalMonthSale(resp.data.data.total_month_sales);
      setTotalYearSale(resp.data.data.total_year_sales);
      setPendingOrders(resp.data.data.total_pending_orders);
    }
    fetchData()
  },[])
  return(
    // <Statistic
    //         title="New Users"
    //         value={11}
    //         precision={2}
    //         valueStyle={{ color: '#3f8600' }}
    //         prefix={<UserAddOutlined />}
    //         suffix="%"
    //       />
  <div className="site-statistic-demo-card">
    <Row gutter={16}>
    <Col style={{marginTop:'1%'}} lg={6} sm={24} xs={24} span={8}>
        <Card theme='dark'>
          <Statistic
            title="Total Users"
            value={totalUser}
            valueStyle={{ color: '#3f8600' }}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>
      <Col style={{marginTop:'1%'}} lg={6} sm={24} xs={24} span={8}>
        <Card>
          <Statistic
            title="Total Sales (Last 30 days)"
            value={totalMonthSale}
            precision={2}
            valueStyle={{ color: '#1890ff' }}
            prefix={'£'}
          />
        </Card>
      </Col>
      <Col style={{marginTop:'1%'}} lg={6} sm={24} xs={24} span={8}>
        <Card>
          <Statistic
            title="Total Sales (Last Year)"
            value={totalYearSale}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={'£'}
          />
        </Card>
      </Col>
      <Col style={{marginTop:'1%'}} lg={6} sm={24} xs={24} span={8}>
        <Card>
          <Statistic
            title="Pending Orders"
            value={pendingOrders}
            valueStyle={{ color: '#444444' }}
            prefix={<FieldTimeOutlined />}
          />
        </Card>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col lg={12} sm={24} xs={24} span={12}>
          <PieChart/>
      </Col>
      <Col lg={12} sm={24} xs={24} span={12}>
      <TreeMapGraph/>
      </Col>
      <Col style={{marginTop:'20px'}} lg={24} sm={24} xs={24} span={12}>
        <LineChart/>
      </Col>
    </Row>
  </div>
)};



export default Dashboard;