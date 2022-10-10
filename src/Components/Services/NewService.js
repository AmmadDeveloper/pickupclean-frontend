import React,{useEffect, useRef,useState} from "react";
import { Card,Form,Input,InputNumber,Button,Select } from "antd";
import { Link, useOutletContext } from "react-router-dom";
import CategorySelect from "./CategorySelect";
import { AdminClient } from "../../Misc/Api";
import TypeSelect from "./TypeSelect";



const {Option}=Select; 
const NewService=()=>{
    const [loading,collection,isModalVisible,showModal,handleCancel,handleOk,deleteData,onFinish,ServiceForm,SelectChange,editData,editservice,seteditservice,onEditFinish,SetTypeChange,geteditData]=useOutletContext();
    const backLink=useRef();
    const [items, setItems] = useState([]);
    const [types,setTypes]=useState([]);


    useEffect(()=>{
        async function fetchCategories(){
            const catresp=await AdminClient.get('category');
            const typeresp=await AdminClient.get('types');
            setItems([...catresp.data.categories]);
            setTypes([...typeresp.data.types])
        }
        fetchCategories();
        
    },[]);
    const goBack=()=>{
        backLink.current.click()
    }
    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
        },
        number: {
        range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */
    return(
        <>
            <h1>New Service</h1>
            <Card style={{ width: '100%' }}>
                <Form ref={ServiceForm} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={[ 'name']} label="Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter name" />
                    </Form.Item>
                    <Form.Item label={"Type"}>
                        <TypeSelect types={types} setItems={setTypes} SelectChange={SetTypeChange} />
                    </Form.Item>
                    <Form.Item name={[ 'cat']} label="Category">
                        <CategorySelect items={items} setItems={setItems} SelectChange={SelectChange} />
                    </Form.Item>
                    <Form.Item name={[ 'price']} label="Price" rules={[{ required: true }]}>
                        <InputNumber placeholder="Enter price" style={{width:'100%'}} />
                    </Form.Item>
                    <Form.Item name={[ 'delivery_time']} label="Delivery Time (days)" rules={[{ required: true }]}>
                        <Select>
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                            <Option value="6">6</Option>
                            <Option value="7">7</Option>
                            <Option value="8">8</Option>
                            <Option value="9">9</Option>
                            <Option value="10">10</Option>
                            <Option value="11">11</Option>
                            <Option value="12">12</Option>
                            <Option value="13">13</Option>
                            <Option value="14">14</Option>
                            <Option value="15">15</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={['description']} label="Short Description">
                        <Input.TextArea placeholder="Enter short description"/>
                    </Form.Item>
                </Form>
                <div style={{float:'right'}}>
                <Button.Group style={{float:'right',marginTop:'20px'}}>
                    <Link ref={backLink} to={'/panel/services/list'}></Link>
                    <Button onClick={goBack} type="danger" style={{margin:'5px'}}>Cancel</Button>
                    <Button type="primary" onClick={handleOk} style={{margin:'5px'}} >Save</Button>
                </Button.Group>
                </div>
            </Card>
        </>
        
    );
}


export default NewService;