import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import PageLoader from "./components/PageLoader";
import { useCurrentUser } from "./hooks/useCurrentUser";

// Public pages
const LoginPage = React.lazy(() => import("./views/LoginPage/Login"));
const RegistrationPage = React.lazy(() => import("./views/RegistrationPage/Register"));

// Dashboard pages
const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const ProductionUpdatePage = React.lazy(() => import("./views/Dashboard/ProductionUpdatePage"));
const SystemManagementPage = React.lazy(() => import("./views/Dashboard/SystemMangementPage"));
const UserProfile = React.lazy(() => import("./views/Dashboard/UserProfile"));
const HelpPage = React.lazy(() => import("./views/Dashboard/HelpPage"));
const SettingPage = React.lazy(() => import("./views/Dashboard/SettingPage"));
const DayPlanUpload = React.lazy(() => import("./views/Dashboard/DayPlan/DayPlanUpload"));
const DayPlanReport = React.lazy(() => import("./views/Dashboard/DayPlanReport/DayPlanReport"));
const DayPlanSummary = React.lazy(() => import("./views/Dashboard/DayPlanSummary/DayPlanSummary"));

// Administration pages
const UserManagement = React.lazy(() => import("./views/Dashboard/UserManagement/UserManagement"));
const UserAccessManagement = React.lazy(() => import("./views/Dashboard/UserAccessManagement/UserAccessManagement"));
const UserAccessManagementSystem = React.lazy(() => import("./views/Dashboard/UserAccessManagementSystem/UserAccessManagementSystem"));


const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MainLayout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useCurrentUser();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/production" element={<ProductionUpdatePage />} />
        <Route path="/systemManagement" element={<SystemManagementPage />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/dayPlan" element={<DayPlanUpload />} />
        <Route path="/dayReport" element={<DayPlanReport />} />
        <Route path="/daySummary" element={<DayPlanSummary />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/userAccessManagement" element={<UserAccessManagement />} />
        <Route path="/userAccessManagementSystem" element={<UserAccessManagementSystem />} />
      </Route>

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
