import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import DashboardMain from "./layouts/DashboardMain.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import Customers from "./pages/Customers.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FoodItems from "./pages/FoodItems.jsx";
import Orders from "./pages/Orders.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/signup.jsx";
import Cookies from 'js-cookie';
//import {getLocalStorageData} from "./helpers/StorageHelper.js";
function App() {
    const token = Cookies.get('token');
  return (
    <Router>
      <Routes>
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<SignUp/>}/>
          {(token !== null) && (token !== "") ? (
              <Route path='/' element={<DashboardMain/>}>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route exact path="/dashboard" element={<Dashboard />} />

                  <Route path='admin-user' element={<AdminUsers/>}/>
                  <Route path='customers' element={<Customers/>}/>
                  <Route path='food-items' element={<FoodItems/>}/>
                  <Route path='orders' element={<Orders/>}/>
                  <Route path='reset-password' element={<ResetPassword/>}/>
              </Route>
          ):(
                  <Route path="*" element={<Navigate to="/login" />} />
              )
          }
      </Routes>

    </Router>
  )
}

export default App
