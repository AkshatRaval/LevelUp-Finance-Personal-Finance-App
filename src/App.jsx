import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoutes";
import DashboardLayouts from "./pages/Layouts/DashboardLayouts";
import PreUserInfoForm from "./pages/PreUserInfoForm";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Profile from "./pages/Profile";
import AddTransaction from "./pages/AddTransaction";


function App() {

  const [userAutheticated, setUserAutheticated] = useState(false)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/preUserInfoForm" element={
          <PrivateRoute>
            <PreUserInfoForm />
          </PrivateRoute>
        } />
        {/* Later you'll add /login, /signup, /dashboard etc */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayouts />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />         {/* /dashboard */}
          <Route path="transactions" element={<Transactions />} />  {/* /dashboard/transactions */}
          <Route path="budget" element={<Budget />} />        {/* /dashboard/budget */}
          <Route path="profile" element={<Profile />} />      {/* /dashboard/profile */}
          <Route path="addtransactions" element={<AddTransaction />} />      {/* /dashboard/addTransaction */}

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
