import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import DashBoard from "../Pages/Dashboard";
import Analytics from "../Pages/Analytics";
import MainLayout from "../routes/MainLayout";
import DailyLog from "../Pages/Daily_Logs";
import MonthlyHerald from "../Pages/MonthlyHerald";
import MyClasses from "../Pages/MyClasses";
import MonthlyPlans from "../Pages/MonthlyPlans";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="dailylog" element={<DailyLog />} />
        <Route path="monthlyherald" element={<MonthlyHerald />} />
        <Route path="myclasses" element={<MyClasses />} />
        <Route path="monthlyherald/:id" element={<MonthlyPlans></MonthlyPlans>}></Route>
      </Route>

    </Routes>
  );
};

export default AppRoutes;
