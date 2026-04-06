import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/auth/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import VendorManagement from './pages/admin/VendorManagement';
import ProductModeration from './pages/admin/ProductModeration';
import AnalyticsReports from './pages/admin/AnalyticsReports';
import CouponManagement from './pages/admin/CouponManagement';
import OrderManagement from './pages/admin/OrderManagement';
import SecurityControl from './pages/admin/SecurityControl';

/**
 * App Component
 *
 * Root application with React Router + Auth.
 *
 * Public Routes:
 *   /login     → Login Page
 *
 * Protected Routes (require authentication):
 *   /          → Admin Dashboard
 *   /users     → User Management
 *   /vendors   → Vendor Management
 *   /products  → Product Moderation
 *   /analytics → Analytics & Reports
 *   /coupons   → Coupon Management
 *   /orders    → Order Management
 *   /security  → Security & Control
 *   *          → Redirects to /
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/vendors" element={<VendorManagement />} />
            <Route path="/products" element={<ProductModeration />} />
            <Route path="/analytics" element={<AnalyticsReports />} />
            <Route path="/coupons" element={<CouponManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/security" element={<SecurityControl />} />
          </Route>

          {/* Catch-all: redirect unknown routes to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
