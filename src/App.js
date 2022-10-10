import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
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
function App() {
  return (
    <>
    <BrowserRouter basename='/admin'>
      <Routes>
        <Route index element={<Login/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="panel" element={<Layout/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="services" element={<Services/>}>
            <Route path="list" element={<ServicesTable/>}/>
            <Route path="new" element={<NewService/>}/>
            <Route path="edit" element={<EditService/>}/>
          </Route>
          <Route path="category" element={<Category/>}>
            <Route path="list" element={<CategoryTable/>}/>
            <Route path="new" element={<NewCategory/>}/>
            <Route path="edit" element={<EditCategory/>}/>
          </Route>
          <Route path="types" element={<Types/>}>
            <Route path="list" element={<TypesTable/>}/>
            <Route path="new" element={<NewType/>}/>
            <Route path="edit" element={<EditType/>}/>
          </Route>
          <Route path="postcode" element={<PostalCode/>}>
            <Route path="list" element={<PostalCodeTable/>}/>
            <Route path="new" element={<NewPostalCode/>}/>
            <Route path="edit" element={<EditPostalCode/>}/>
          </Route>
          <Route path="promo" element={<Promo/>}>
            <Route path="list" element={<PromoTable/>}/>
            <Route path="new" element={<NewPromo/>}/>
          </Route>
          <Route path="payment" element={<Payment/>}>
            <Route path="list" element={<PaymentTable/>}/>
          </Route>
          <Route path="order" element={<Order/>}>
            <Route path="list" element={<OrderTable/>}/>
            <Route path="details" element={<OrderDetail/>}/>
          </Route>
          <Route path="customer" element={<Customers/>}>
            <Route path="list" element={<CustomerTable/>}/>
            <Route path="details" element={<CustomerDetail/>}/>
          </Route>
          <Route path="email" element={<Email/>}>
            <Route path="list" element={<EmailTable/>}/>
            <Route path="new" element={<NewEmail/>}/>
          </Route>
          <Route path="messages" element={<Messages/>}>
            <Route path="list" element={<MessagesTable/>}/>
            <Route path="new" element={<NewMessage/>}/>
          </Route>
          <Route path="settings" element={<Settings/>}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
