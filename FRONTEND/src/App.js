import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import Details from "./Components/Details/Details";
import Cart from "./Components/Cart/Cart";
import adminLogin from "./Components/admin/adminLogin/adminLogin";
import dashboard from "./Components/admin/adminLogin/dashboard/dashboard";
import addProduct from "./Components/admin/adminLogin/dashboard/addProduct/addProduct";
import logout from "./Components/logout/logout";
import products from "./Components/admin/adminLogin/dashboard/product/products";
import recipts from "./Components/admin/adminLogin/dashboard/recipts/recipts";
import settings from "./Components/admin/adminLogin/dashboard/setting/setting";
import createNewAdmin from "./Components/admin/adminLogin/dashboard/create admin/createAdmin";
import orders from "./Components/admin/adminLogin/dashboard/orders/orders";
import userDetails from "./Components/admin/adminLogin/dashboard/user details/userDetails";
import carrerApplication from "./Components/admin/adminLogin/dashboard/carrerApplication/carrerApplication";
import MyOrder from "./Components/MyAccount/MyOrder/MyOrder";
import Carrer from "./Components/Carrer/Carrer";

function App() {
  return (
    <>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/admin/login' component={adminLogin} />
          <Route exact path='/admin/dashboard' component={dashboard} />
          <Route
            exact
            path='/admin/dashboard/addproduct'
            component={addProduct}
          />
          <Route exact path='/admin/dashboard/products' component={products} />
          <Route
            exact
            path='/admin/dashboard/createNewAdmin'
            component={createNewAdmin}
          />
          <Route exact path='/admin/dashboard/recipt' component={recipts} />
          <Route exact path='/admin/dashboard/settings' component={settings} />
          <Route exact path='/admin/dashboard/orderList' component={orders} />
          <Route
            exact
            path='/admin/dashboard/userDetails'
            component={userDetails}
          />
          <Route
            exact
            path='/admin/dashboard/carrerApplications'
            component={carrerApplication}
          />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/SignUp' component={SignUp} />
          <Route exact path='/Categories' component={Categories} />
          <Route exact path='/Products' component={Products} />
          <Route exact path='/Details' component={Details} />
          <Route exact path='/Cart' component={Cart} />
          <Route exact path='/Carrer' component={Carrer} />
          <Route exact path='/MyOrder' component={MyOrder} />
          <Route exact path='/Logout' component={logout} />
        </Switch>
      </div>
    </>
  );
}

export default App;
