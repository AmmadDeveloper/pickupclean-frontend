import React,{useEffect,useState} from 'react';
import { Line } from '@ant-design/charts';
import {Col,Row,Card,Button} from 'antd';
import { AdminClient } from '../../Misc/Api';

export default function LineChart() {
  const [data,setData]=useState([])
  useEffect(()=>{
    const fetchData=async ()=>{
      const resp = await AdminClient.get('sales?span=weekly')
      setData([...resp.data.data])
    };
    fetchData();
},[])
  // const data = [
  //   { label: '1991', amount: 3 },
  //   { label: '1992', amount: 4 },
  //   { label: '1993', amount: 3.5 },
  //   { label: '1994', amount: 5 },
  //   { label: '1995', amount: 4.9 },
  //   { label: '1996', amount: 6 },
  //   { label: '1997', amount: 7 },
  //   { label: '1998', amount: 9 },
  //   { label: '1999', amount: 13 },
  // ];
  const getData=async (span)=>{
    const resp = await AdminClient.get(`sales?span=${span}`)
    setData([...resp.data.data])
  }

  const config = {
    data,
    height: 400,
    xField: 'label',
    yField: 'amount',
    point: {
      size: 7,
      shape: 'diamond',
    },
  };
  return (
    <Card style={{height:'550px'}}>
      <Row style={{marginBottom:'20px'}}>
        <Col lg={12} md={12} sm={24} xs={24} span={12}>
          <h3>Total Sales</h3>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24} span={12}>
          <Button.Group style={{float:'right'}}>
            <Button onClick={()=>{getData('weekly')}}>Weekly</Button>
            <Button onClick={()=>{getData('monthly')}}>Monthly</Button>
            <Button onClick={()=>{getData('yearly')}}>Yearly</Button>
          </Button.Group>
        </Col>
      </Row>
      <Row style={{marginBottom:'50px'}}>
        <Col span={24}>
          {data.length>0?<Line {...config} />:<div style={{textAlign:'center'}}>There is no data to show</div>}
        
        </Col>
      </Row>
    </Card>
  );
}
