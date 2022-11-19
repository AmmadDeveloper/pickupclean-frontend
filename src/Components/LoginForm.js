import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginClient, setCookie } from '../Misc/Api';
import {useNavigate} from 'react-router-dom';


const LoginForm = ({showNotification,setUser}) => {
  const navigate=useNavigate();
  const onFinish = async (values) => {
    const resp=await LoginClient.post('token',{"email":values.username,"password":values.password});
    if (resp.data.statuscode===200){
      let cookie="";
      if(values.remember){
        cookie=setCookie("authtoken",resp.data.token,30)
      }else{
        cookie=setCookie("authtoken",resp.data.token,.20)
      }
      document.cookie = cookie;
      //document.cookie=`authtoken=${resp.data.token}`;
      navigate('/panel/dashboard');
    }else{
      showNotification(resp.data);
    }
    //const resp=await AdminClient.post('token',{username:values.name,password:values.password})
    
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox defaultChecked={false}>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button style={{width:'100%'}} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;