import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Layout from './Common/Layout';
import Services from './Pages/Services';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import NewService from './Components/Services/NewService';
import ServicesTable from './Components/Services/ServicesTable';
import PostalCodeTable from './Components/PostalCode/PostalCodeTable';
import NewPostalCode from './Components/PostalCode/NewPostalCode';
import Category from './Pages/Category';
import CategoryTable from './Components/Category/CategoryTable';
import NewCategory from './Components/Category/NewCategory';
import PostalCode from './Pages/PostalCode';
import Order from './Pages/Order';
import OrderTable from './Components/Order/OrderTable';
import Settings from './Pages/Settings';
import Promo from './Pages/Promo';
import PromoTable from './Components/Promo/PromoTable';
import NewPromo from './Components/Promo/NewPromo';
import Payment from './Pages/Payment';
import PaymentTable from './Components/Payment/PaymentTable';
import OrderDetail from './Components/Order/OrderDetail';
import CustomerTable from './Components/Customers/CustomerTable';
import CustomerDetail from './Components/Customers/CustomerDetail';
import Customers from './Pages/Customers';
import EditPostalCode from './Components/PostalCode/EditPostalCode';
import EditCategory from './Components/Category/EditCategory';
import EditService from './Components/Services/EditService';
import Types from './Pages/Types';
import TypesTable from './Components/Types/TypesTable';
import NewType from './Components/Types/NewType';
import EditType from './Components/Types/EditType';
import Messages from './Pages/Messages';
import MessagesTable from './Components/Messages/MessagesTable';
import NewMessage from './Components/Messages/NewMessage';
import Email from './Pages/Email';
import EmailTable from './Components/Email/EmailTable';
import NewEmail from './Components/Email/NewEmail';
import { useState } from 'react';
import { getCookie } from './Misc/Api';

const ProtectedRoute = ({
  user,
  setUser,
  redirectPath = '/login',
  children,
}) => {
    var token=getCookie('authtoken')
    if (token!==undefined && token!=='' && token!=null){
      setUser(true)
      return children ? children : <Navigate to={redirectPath} replace />;
      // 
    }else{
      return <Navigate to={redirectPath} replace />;
    }
  
};



function App() {
  const [user,setUser]=useState(false);
  // useEffect(()=>{
  //   var login=window.localStorage.getItem('login');
  //   if (login!==undefined){
  //     setUser(true)
  //   }
  // },[])
  return (
    <>
    <BrowserRouter basename='/admin'>
      <Routes>
        <Route index element={<Login setUser={setUser}/>}></Route>
        <Route path="login" element={<Login setUser={setUser}/>}></Route>
        <Route path="panel" element={<ProtectedRoute setUser={setUser} user={user}><Layout setUser={setUser} /></ProtectedRoute>}>
          <Route path="dashboard" element={<ProtectedRoute setUser={setUser} user={user}><Dashboard/></ProtectedRoute>}/>
          <Route path="services" element={<ProtectedRoute setUser={setUser} user={user}><Services/></ProtectedRoute>}>
            <Route path="list" element={<ProtectedRoute setUser={setUser} user={user}><ServicesTable/></ProtectedRoute>}/>
            <Route path="new" element={<ProtectedRoute setUser={setUser} user={user}><NewService/></ProtectedRoute>}/>
            <Route path="edit" element={<ProtectedRoute setUser={setUser} user={user}><EditService/></ProtectedRoute>}/>
          </Route>
          <Route path="category" element={<ProtectedRoute setUser={setUser} user={user}><Category/></ProtectedRoute>}>
            <Route path="list" element={<ProtectedRoute setUser={setUser} user={user}><CategoryTable/></ProtectedRoute>}/>
            <Route path="new" element={<ProtectedRoute setUser={setUser} user={user}><NewCategory/></ProtectedRoute>}/>
            <Route path="edit" element={<ProtectedRoute setUser={setUser} user={user}><EditCategory/></ProtectedRoute>}/>
          </Route>
          <Route path="types" element={<ProtectedRoute setUser={setUser} user={user}><Types/></ProtectedRoute>}>
            <Route path="list" element={<ProtectedRoute setUser={setUser} user={user}><TypesTable/></ProtectedRoute>}/>
            <Route path="new" element={<ProtectedRoute setUser={setUser} user={user}><NewType/></ProtectedRoute>}/>
            <Route path="edit" element={<ProtectedRoute setUser={setUser} user={user}><EditType/></ProtectedRoute>}/>
          </Route>
          <Route path="postcode" element={<ProtectedRoute setUser={setUser} user={user}><PostalCode/></ProtectedRoute>}>
            <Route path="list" element={<ProtectedRoute setUser={setUser} user={user}><PostalCodeTable/></ProtectedRoute>}/>
            <Route path="new" element={<ProtectedRoute setUser={setUser} user={user}><NewPostalCode/></ProtectedRoute>}/>
            <Route path="edit" element={<ProtectedRoute setUser={setUser} user={user}><EditPostalCode/></ProtectedRoute>}/>
          </Route>
          <Route path="promo" element={<ProtectedRoute setUser={setUser} user={user}><Promo/></ProtectedRoute>}>
            <Route path="list" element={<ProtectedRoute setUser={setUser} user={user}><PromoTable/></ProtectedRoute>}/>
            <Route path="new" element={<ProtectedRoute setUser={setUser} user={user}><NewPromo/></ProtectedRoute>}/>
          </Route>
          <Route path="payment" element={<ProtectedRoute setUser={setUser} user={user}><Payment/></ProtectedRoute>}>
            <Route path="list" element={<ProtectedRoute setUser={setUser} user={user}><PaymentTable/></ProtectedRoute>}/>
          </Route>
          <Route path="order" element={<ProtectedRoute setUser={setUser} user={user}><Order/></ProtectedRoute>}>
            <Route path="list" element={<ProtectedRoute setUser={setUser} user={user}><OrderTable/></ProtectedRoute>}/>
            <Route path="details" element={<ProtectedRoute setUser={setUser} user={user}><OrderDetail/></ProtectedRoute>}/>
          </Route>
          <Route path="customer" element={<ProtectedRoute setUser={setUser} user={user}><Customers/></ProtectedRoute>}>
            <Route path="list" element={<ProtectedRoute setUser={setUser} user={user}><CustomerTable/></ProtectedRoute>}/>
            <Route path="details" element={<ProtectedRoute setUser={setUser} user={user}><CustomerDetail/></ProtectedRoute>}/>
          </Route>
          <Route path="email" element={<ProtectedRoute setUser={setUser} user={user}><Email/></ProtectedRoute>}>
            <Route path="list" element={<ProtectedRoute setUser={setUser} user={user}><EmailTable/></ProtectedRoute>}/>
            <Route path="new" element={<ProtectedRoute setUser={setUser} user={user}><NewEmail/></ProtectedRoute>}/>
          </Route>
          <Route path="messages" element={<ProtectedRoute setUser={setUser} user={user}><Messages/></ProtectedRoute>}>
            <Route path="list" element={<ProtectedRoute setUser={setUser} user={user}><MessagesTable/></ProtectedRoute>}/>
            <Route path="new" element={<ProtectedRoute setUser={setUser} user={user}><NewMessage/></ProtectedRoute>}/>
          </Route>
          <Route path="settings" element={<ProtectedRoute setUser={setUser} user={user}><Settings/></ProtectedRoute>}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
