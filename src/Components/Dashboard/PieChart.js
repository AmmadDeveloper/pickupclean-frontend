import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { Row,Col,Card } from 'antd';
import { AdminClient } from '../../Misc/Api';

const PieChart = () => {
  const [data,setData]=useState([])
  useEffect(()=>{
    const fetchData=async ()=>{
      const resp=await AdminClient.get('orderstatus')
      setData([...resp.data.data])
    }
    fetchData()
  },[])

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name} - {percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <Card style={{height:'500px',marginTop:'20px'}}>
      <Row style={{marginBottom:'20px'}}>
        <Col span={12}>
          <h3>Order Status</h3>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {data.length===0?<div style={{textAlign:'center'}}>No Record Found</div>:<></>}
          <Pie {...config} />
        </Col>
      </Row>
    </Card>
  );
};


export default PieChart;