
import React,{createRef} from 'react';
import { Layout, Menu,Image,Dropdown,Badge,Drawer,Card,Row,Col } from 'antd';
import {
  AppstoreAddOutlined,
  PieChartOutlined,
  CopyOutlined,
  DollarOutlined,
  PushpinOutlined,
  LogoutOutlined,
  SettingOutlined,
  WalletOutlined,
  PercentageOutlined,
  UserOutlined,
  NotificationOutlined,
  SmileOutlined,
  MailOutlined,
  MessageOutlined,
  ApartmentOutlined
} from '@ant-design/icons';

import { Outlet,Link } from 'react-router-dom';

import logo from '../Static/imgs/logonew.png'
import { AdminClient, eraseCookie } from '../Misc/Api';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

class AppLayout extends React.Component {
  constructor(props){
    super(props);
    this.navigate=createRef();
    this.state = {
      collapsed: false,
      visible:false,
      notifications:[],
      broken:false
    };
    this.logout=this.logout.bind(this);
  }
  


  fetchNotification=()=>{
    setInterval(async()=>{
      const resp=await AdminClient.get('notifications/');
      if(resp.data.nums!==0){
        this.setState({notifications:[...resp.data.notifications]})
        
      }
    },10000)
  }

  markallasread=async ()=>{
    const resp=await AdminClient.get('marknotifications/');
    if(resp.data.statuscode===200){
      this.setState({notifications:[]})
    }
  }

  markasread=async (id)=>{
    const resp=await AdminClient.get(`notifications/?id=${id}`);
    if(resp.data.statuscode===200){
      this.setState({notifications:[...resp.data.notifications]})
      
    }
  }

  componentDidMount(){
    this.fetchNotification()
  }

  showDrawer = () => {
    this.setState({visible:true});
  };

  onClose = () => {
    this.setState({visible:false});
  };
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
    });
  };
  logout=()=>{
    eraseCookie('authtoken');
    this.props.setUser(false);
    this.navigate.current.click();
  }

  items = [
  getItem(<Link to="/panel/dashboard">Dashboard</Link>, 'SideMenu1', <PieChartOutlined />),
  getItem(<Link to="/panel/services/list">Services</Link>, 'SideMenu2', <AppstoreAddOutlined />),
  getItem(<Link to="/panel/category/list">Categories</Link>, 'SideMenu3', <CopyOutlined />),
  getItem(<Link to="/panel/types/list">Types</Link>, 'SideMenu4', <ApartmentOutlined />),
  getItem(<Link to="/panel/postcode/list">Postal Codes</Link>, 'SideMenu5', <PushpinOutlined />),
  getItem(<Link to="/panel/order/list">Orders</Link>, 'SideMenu6', <DollarOutlined />),
  getItem(<Link to="/panel/payment/list">Payments</Link>, 'SideMenu7', <WalletOutlined />),
  getItem(<Link to="/panel/promo/list">Promo Codes</Link>, 'SideMenu8',  <PercentageOutlined />),
  getItem(<Link to="/panel/customer/list">Customers</Link>, 'SideMenu9',  <UserOutlined />),
  getItem("Marketing", 'SideMenu10',  <NotificationOutlined style={{transform:'rotate(-30deg)'}} />, [
    getItem(<Link to="/panel/email/list">Email</Link>, 'SubSidemenu1',<MailOutlined/>),
    getItem(<Link to="/panel/messages/list">Messages</Link>, 'SubSidemenu2',<MessageOutlined/>),
  ]),
  getItem(<Link to="/panel/settings">Settings</Link>, 'SideMenu11', <SettingOutlined />),
  getItem(<a href='/#' onClick={this.logout}>Logout</a>, 'SideMenu12', <LogoutOutlined />),
];


//<Menu.Item key="menu-password">
 //     <Link to="/panel/password">
 //       Change Password
 //     </Link>
 //   </Menu.Item>

 menu = (
  <Menu>
    <Menu.Item key="menu-profile">
      <Link to="/panel/settings">
        Settings
      </Link>
    </Menu.Item>
    <Menu.Item key="menu-logout">
      <a onClick={this.logout}>
        Logout
      </a>
    </Menu.Item>
  </Menu>
);


  render() {
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Drawer title="Notifications" placement="right" onClose={this.onClose} visible={this.state.visible}>
          {this.state.notifications.length>0?<Row><Col span={24}><a onClick={this.markallasread} style={{float:'right'}}>Mark all as read</a></Col></Row>:<div style={{textAlign:'center'}}>No new notifications</div>}
          {this.state.notifications.map((element)=>{
            return(
            <Card key={element.id} style={{ width: '100%',marginTop:'5%' }}>
              <Row>
                <Col span={3}><SmileOutlined style={{fontSize:'24px',color:'rgb(82, 196, 26)'}}/></Col>
                <Col span={21}>
                  <h3>{element.heading}</h3>
                  <p>{element.message}</p>
                  <a onClick={()=>this.markasread(element.id)} style={{float:'right'}}>Mark as read</a>
                </Col>
              </Row>
              
            </Card>)
          })}
      </Drawer>
        <Link style={{visibility:'hidden'}} ref={this.navigate} to={"/"}></Link>
        <Sider theme='light' style={{position:'relative',zIndex:'2'}} breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        this.setState({broken:broken})
      }}
      onCollapse={this.onCollapse}>
          <img alt='not found' src={logo} style={{display:'block',marginLeft:'auto',marginRight:'auto',width:'70%',marginTop:'6%',marginBottom:'7%'}}/>
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={this.items} />
        </Sider>
        <Layout className="site-layout">
          <Header style={{backgroundColor:'white',borderBottom:'1px solid lightgray !important',padding:`${this.state.broken?'0px':'0px 20px'}` }} >
              <Menu style={{justifyContent:`${this.state.broken?'normal':'end'}`}} theme="light" mode="horizontal">
                <Menu.Item key={"menu0"} style={{marginRight:'auto',display:`${this.state.broken?"block":"none"}`}} className='logo'>
                    <img src={logo} style={{width:'80%',maxWidth:'140px'}} alt="not found"/>
                </Menu.Item>
                  {/* <Menu.Item key={"menu1"}>
                    <Dropdown overlay={this.menu} placement="bottom">
                      <div style={{float:'revert'}}> {"Menu"} <DownOutlined /></div>
                    </Dropdown>
                  </Menu.Item> */}
                  <Menu.Item key={'menu2'} onClick={this.showDrawer}>
                    <div>
                      {(this.state.notifications.length===0)?<NotificationOutlined  style={{fontSize:'16px'}}/>:<Badge count={this.state.notifications.length}>
                        <NotificationOutlined  style={{fontSize:'16px'}}/>
                      </Badge>}
                      
                    </div>
                  </Menu.Item>
              </Menu>
          </Header>
          
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet/>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Pick Up Clean © 2022
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default () => <AppLayout />;