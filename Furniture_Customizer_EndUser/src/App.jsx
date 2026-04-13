import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyAccount from './pages/auth/VerifyAccount';
import Home from './pages/customer/Home';
import Categories from './pages/customer/Categories';
import ProductListing from './pages/customer/ProductListing';
import ProductDetail from './pages/customer/ProductDetail';
import SearchResults from './pages/customer/SearchResults';
import Customizer from './pages/customer/Customizer';
import Preview3D from './pages/customer/Preview3D';
import Workshop from './pages/customer/Workshop';
import Wishlist from './pages/customer/Wishlist';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderConfirmation from './pages/customer/OrderConfirmation';
import Orders from './pages/customer/Orders';
import OrderDetail from './pages/customer/OrderDetail';
import TrackOrder from './pages/customer/TrackOrder';
import ReturnRequest from './pages/customer/ReturnRequest';
import Profile from './pages/customer/Profile';
import Addresses from './pages/customer/Addresses';
import ChangePassword from './pages/customer/ChangePassword';
import Settings from './pages/customer/Settings';
import Reviews from './pages/customer/Reviews';
import Support from './pages/customer/Support';
import Booking from './pages/customer/Booking';
// import VendorLogin from './pages/customer/VendorLogin';
// import VendorRegister from './pages/customer/VendorRegister';
// import VendorPending from './pages/customer/VendorPending';
// import VendorForgotPassword from './pages/customer/VendorForgotPassword';
// import VendorDashboard from './pages/vendor/VendorDashboard';
// import VendorAnalytics from './pages/vendor/VendorAnalytics';
// import VendorAddProduct from './pages/vendor/VendorAddProduct';
// import VendorEditProduct from './pages/vendor/VendorEditProduct';
// import VendorProducts from './pages/vendor/VendorProducts';
// import VendorUploadModel from './pages/vendor/VendorUploadModel';
// import VendorConfigurator from './pages/vendor/VendorConfigurator';
// import VendorOrders from './pages/vendor/VendorOrders';
// import VendorProduction from './pages/vendor/VendorProduction';
// import VendorOrderDetails from './pages/vendor/VendorOrderDetails';
// import VendorShipping from './pages/vendor/VendorShipping';
// import VendorRevenue from './pages/vendor/VendorRevenue';
// import VendorPerformance from './pages/vendor/VendorPerformance';
// import VendorSales from './pages/vendor/VendorSales';
// import VendorInventory from './pages/vendor/VendorInventory';
// import VendorStock from './pages/vendor/VendorStock';
// import VendorLowStock from './pages/vendor/VendorLowStock';
// import VendorFinancial from './pages/vendor/VendorFinancial';
// import VendorNotifications from './pages/vendor/VendorNotifications';
// import VendorChangePassword from './pages/vendor/VendorChangePassword';
// import VendorProfile from './pages/vendor/VendorProfile';
// import VendorQueries from './pages/vendor/VendorQueries';
// import VendorReviews from './pages/vendor/VendorReviews';

/**
 * App Component
 * 
 * Root application with React Router.
 * 
 * Routes:
 *   /                 → Home / Landing Page
 *   /categories       → Shop by Category Page
 *   /products         → Product Listing / Collection Page
 *   /product-detail   → Product Detail Page
 *   /search           → Search Results Page
 *   /customizer       → Product Customizer Page
 *   /preview-3d       → 3D Furniture Preview Page
 *   /workshop         → My Workshop / Saved Designs Page
 *   /wishlist         → Wishlist Page
 *   /cart             → Shopping Cart Page
 *   /checkout         → Checkout Page
 *   /order-confirmation → Order Confirmation Page
 *   /orders           → My Orders Page
 *   /order-detail     → Order Detail Page
 *   /track-order      → Track Order Page
 *   /return-request   → Return Request Page
 *   /profile          → User Profile Page
 *   /addresses        → My Addresses Page
 *   /change-password   → Change Password Page
 *   /settings          → Account Settings Page
 *   /reviews           → Reviews & Ratings Page
 *   /support           → Support Tickets Page
 *   /booking           → Book a Master Session Page
 *   /login            → Login Page
 *   /signup           → Register Page
 *   /forgot-password  → Forgot Password Page
 *   /verify-account   → OTP Verification Page
 *   *                 → Redirects to /
 * 
 * New pages should be added as additional <Route> entries.
 */
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth Routes without Header and Footer */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-account" element={<VerifyAccount />} />

                {/* Main EndUser UI with Header and Footer */}
                <Route element={<MainLayout />}>

                    <Route path="/home" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/products" element={<ProductListing />} />
                    <Route path="/product-detail" element={<ProductDetail />} />
                    <Route path="/product-detail/:id" element={<ProductDetail />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/customizer" element={<Customizer />} />
                    <Route path="/customizer/:id" element={<Customizer />} />
                    <Route path="/preview-3d" element={<Preview3D />} />

                    {/* Customer Protected Routes */}
                    <Route path="/workshop" element={<ProtectedRoute allowedRoles={['customer']}><Workshop /></ProtectedRoute>} />
                    <Route path="/wishlist" element={<ProtectedRoute allowedRoles={['customer']}><Wishlist /></ProtectedRoute>} />
                    <Route path="/cart" element={<ProtectedRoute allowedRoles={['customer']}><Cart /></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute allowedRoles={['customer']}><Checkout /></ProtectedRoute>} />
                    <Route path="/order-confirmation" element={<ProtectedRoute allowedRoles={['customer']}><OrderConfirmation /></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute allowedRoles={['customer']}><Orders /></ProtectedRoute>} />
                    <Route path="/orders/:id" element={<ProtectedRoute allowedRoles={['customer']}><OrderDetail /></ProtectedRoute>} />
                    <Route path="/order-detail/:id" element={<ProtectedRoute allowedRoles={['customer']}><OrderDetail /></ProtectedRoute>} />
                    <Route path="/track-order/:id" element={<ProtectedRoute allowedRoles={['customer']}><TrackOrder /></ProtectedRoute>} />
                    <Route path="/return-request" element={<ProtectedRoute allowedRoles={['customer']}><ReturnRequest /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute allowedRoles={['customer']}><Profile /></ProtectedRoute>} />
                    <Route path="/addresses" element={<ProtectedRoute allowedRoles={['customer']}><Addresses /></ProtectedRoute>} />
                    <Route path="/change-password" element={<ProtectedRoute allowedRoles={['customer']}><ChangePassword /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute allowedRoles={['customer']}><Settings /></ProtectedRoute>} />
                    <Route path="/reviews" element={<ProtectedRoute allowedRoles={['customer']}><Reviews /></ProtectedRoute>} />
                    <Route path="/support" element={<ProtectedRoute allowedRoles={['customer']}><Support /></ProtectedRoute>} />
                    <Route path="/booking" element={<ProtectedRoute allowedRoles={['customer']}><Booking /></ProtectedRoute>} />
                </Route>

                {/* Vendor application routes are disabled in this build */}
                {/* 
                <Route path="/vendor-login" element={<VendorLogin />} />
                <Route path="/vendor-register" element={<VendorRegister />} />
                <Route path="/vendor-pending" element={<VendorPending />} />
                <Route path="/vendor-forgot-password" element={<VendorForgotPassword />} />

                <Route path="/vendor-dashboard" element={<ProtectedRoute allowedRoles={['vendor']}><VendorDashboard /></ProtectedRoute>} />
                <Route path="/vendor-analytics" element={<ProtectedRoute allowedRoles={['vendor']}><VendorAnalytics /></ProtectedRoute>} />
                <Route path="/vendor-add-product" element={<ProtectedRoute allowedRoles={['vendor']}><VendorAddProduct /></ProtectedRoute>} />
                <Route path="/vendor-edit-product" element={<ProtectedRoute allowedRoles={['vendor']}><VendorEditProduct /></ProtectedRoute>} />
                <Route path="/vendor-products" element={<ProtectedRoute allowedRoles={['vendor']}><VendorProducts /></ProtectedRoute>} />
                <Route path="/vendor-upload-model" element={<ProtectedRoute allowedRoles={['vendor']}><VendorUploadModel /></ProtectedRoute>} />
                <Route path="/vendor-configurator" element={<ProtectedRoute allowedRoles={['vendor']}><VendorConfigurator /></ProtectedRoute>} />
                <Route path="/vendor-orders" element={<ProtectedRoute allowedRoles={['vendor']}><VendorOrders /></ProtectedRoute>} />
                <Route path="/vendor-production" element={<ProtectedRoute allowedRoles={['vendor']}><VendorProduction /></ProtectedRoute>} />
                <Route path="/vendor-order-details" element={<ProtectedRoute allowedRoles={['vendor']}><VendorOrderDetails /></ProtectedRoute>} />
                <Route path="/vendor-shipping" element={<ProtectedRoute allowedRoles={['vendor']}><VendorShipping /></ProtectedRoute>} />
                <Route path="/vendor-revenue" element={<ProtectedRoute allowedRoles={['vendor']}><VendorRevenue /></ProtectedRoute>} />
                <Route path="/vendor-performance" element={<ProtectedRoute allowedRoles={['vendor']}><VendorPerformance /></ProtectedRoute>} />
                <Route path="/vendor-sales" element={<ProtectedRoute allowedRoles={['vendor']}><VendorSales /></ProtectedRoute>} />
                <Route path="/vendor-inventory" element={<ProtectedRoute allowedRoles={['vendor']}><VendorInventory /></ProtectedRoute>} />
                <Route path="/vendor-stock" element={<ProtectedRoute allowedRoles={['vendor']}><VendorStock /></ProtectedRoute>} />
                <Route path="/vendor-low-stock" element={<ProtectedRoute allowedRoles={['vendor']}><VendorLowStock /></ProtectedRoute>} />
                <Route path="/vendor-financial" element={<ProtectedRoute allowedRoles={['vendor']}><VendorFinancial /></ProtectedRoute>} />
                <Route path="/vendor-notifications" element={<ProtectedRoute allowedRoles={['vendor']}><VendorNotifications /></ProtectedRoute>} />
                <Route path="/vendor-change-password" element={<ProtectedRoute allowedRoles={['vendor']}><VendorChangePassword /></ProtectedRoute>} />
                <Route path="/vendor-profile" element={<ProtectedRoute allowedRoles={['vendor']}><VendorProfile /></ProtectedRoute>} />
                <Route path="/vendor-queries" element={<ProtectedRoute allowedRoles={['vendor']}><VendorQueries /></ProtectedRoute>} />
                <Route path="/vendor-reviews" element={<ProtectedRoute allowedRoles={['vendor']}><VendorReviews /></ProtectedRoute>} />
                */}

                {/* Catch-all: redirect unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
