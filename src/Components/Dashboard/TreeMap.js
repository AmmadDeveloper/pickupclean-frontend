import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Treemap } from '@ant-design/plots';
import { Card,Row,Col } from 'antd';
import { AdminClient } from '../../Misc/Api';
const TreeMapGraph = () => {
    const [data,setData]=useState({})
    useEffect(()=>{
        const fetchData=async ()=>{
          const resp = await AdminClient.get('orderarea')
          setData({...resp.data.data})
        }
        fetchData()
    },[])

  const config = {
    data,
    colorField: 'name',
  };
  return (
    <Card style={{height:'500px',marginTop:'20px'}}>
    <Row style={{marginBottom:'20px'}}>
      <Col span={12}>
        <h3>Order Areas</h3>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        {Object.keys(data).length!==0?<Treemap {...config} />:<div style={{textAlign:'center'}}>No Record Found</div>}
      </Col>
    </Row>
  </Card>
    );
};


export default TreeMapGraph;