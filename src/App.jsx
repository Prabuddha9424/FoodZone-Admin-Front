import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DashboardMain from "./layouts/DashboardMain.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import Customers from "./pages/Customers.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FoodItems from "./pages/FoodItems.jsx";
import Orders from "./pages/Orders.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
function App() {


  return (
    <Router>
      <Routes>
          <Route path='/' element={<DashboardMain/>}>
              <Route path='admin-user' element={<AdminUsers/>}/>
              <Route path='customers' element={<Customers/>}/>
              <Route path='' element={<Dashboard/>}/>
              <Route path='food-items' element={<FoodItems/>}/>
              <Route path='orders' element={<Orders/>}/>
              <Route path='reset-password' element={<ResetPassword/>}/>
          </Route>
      </Routes>

    </Router>
  )
}

export default App
