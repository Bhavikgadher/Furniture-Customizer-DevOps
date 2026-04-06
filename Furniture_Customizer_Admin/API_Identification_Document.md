# Furniture Customizer Admin Panel — API Identification Document

> **Purpose:** Map every React UI component, action, and data point to a concrete backend API endpoint so the backend team knows exactly what to build.
>
> **Frontend Stack:** React 18 + Vite + Tailwind CSS v3 + React Router v6
>
> **Convention used below:**
> - `(R)` = **Read** / GET — data the UI needs to render
> - `(C)` = **Create** / POST
> - `(U)` = **Update** / PUT or PATCH
> - `(D)` = **Delete** / DELETE
> - `(A)` = **Auth-related** action

---

## Table of Contents

1. [Shared / Global (Layout, Sidebar, Header)](#1-shared--global-layout-sidebar-header)
2. [Admin Dashboard (`/`)](#2-admin-dashboard-)
3. [User Management (`/users`)](#3-user-management-users)
4. [Vendor Management (`/vendors`)](#4-vendor-management-vendors)
5. [Product Moderation (`/products`)](#5-product-moderation-products)
6. [Analytics & Reports (`/analytics`)](#6-analytics--reports-analytics)
7. [Coupon & Offer Management (`/coupons`)](#7-coupon--offer-management-coupons)
8. [Order Management (`/orders`)](#8-order-management-orders)
9. [Security & Control (`/security`)](#9-security--control-security)
10. [Authentication & Authorization](#10-authentication--authorization)
11. [API Summary Table](#11-api-summary-table)

---

## 1. Shared / Global (Layout, Sidebar, Header)

**Files:** `AdminLayout.jsx`, `Sidebar.jsx`, `Header.jsx`, `dashboardData.jsx`

### 1.1 Sidebar Navigation

| UI Element | Current Data Source | Required API |
|---|---|---|
| Navigation items list (icon, label, route) | `sidebarNavItems` from `dashboardData.jsx` | Static config (no API needed) — OR — `(R) GET /api/admin/navigation` if nav items should be role-based |
| Active route highlighting | `useLocation()` from React Router | Client-side only |
| Brand logo & name | Hardcoded in JSX | Static config (no API needed) |
| Help Center button | Hardcoded button | `(R) GET /api/support/articles` (optional, if support content is dynamic) |

### 1.2 Header — Search

| UI Element | Current Data Source | Required API |
|---|---|---|
| Global search input | Not connected | **`(R) GET /api/admin/search?q={query}&type={orders,products,users,vendors}`** |

**Request Parameters:**
```
GET /api/admin/search?q=oak+desk&type=all&limit=10
```

**Expected Response:**
```json
{
  "results": [
    { "type": "product", "id": 42, "title": "Modern Oak Desk", "url": "/products/42" },
    { "type": "order",   "id": 101, "title": "#ORD-2847", "url": "/orders/101" }
  ],
  "totalCount": 2
}
```

### 1.3 Header — Notifications

| UI Element | Current Data Source | Required API |
|---|---|---|
| Notification bell badge (unread count) | Hardcoded red dot | **`(R) GET /api/admin/notifications?unread=true&limit=10`** |
| Notification dropdown list | `notifications` from `dashboardData.jsx` | (same endpoint as above) |
| "Mark all as read" button | Click handler not wired | **`(U) PATCH /api/admin/notifications/mark-all-read`** |
| "View All Notifications" button | Not wired | Navigates to a notifications page (client-side route) |

**Expected Response for notifications:**
```json
{
  "notifications": [
    {
      "id": 1,
      "message": "New vendor application from Nordic Nest",
      "time": "2 minutes ago",
      "isRead": false,
      "highlight": true,
      "highlightColor": "text-primary",
      "link": "/vendors"
    }
  ],
  "unreadCount": 3
}
```

### 1.4 Header — User Profile Menu

| UI Element | Current Data Source | Required API |
|---|---|---|
| User name, role, avatar | Hardcoded ("Admin User", "Super Admin", Google image) | **`(R) GET /api/admin/me`** (current logged-in user profile) |
| User dropdown menu items | `userMenuItems` from `dashboardData.jsx` | Static config (no API needed) |
| "Logout" button | Not wired | **`(A) POST /api/auth/logout`** |

**Expected Response for `/api/admin/me`:**
```json
{
  "id": 1,
  "name": "Admin User",
  "email": "admin@furnicustom.com",
  "role": "Super Admin",
  "avatarUrl": "https://...",
  "permissions": ["users.manage", "vendors.manage", "products.moderate", "orders.manage", "analytics.view", "coupons.manage", "security.manage"]
}
```

---

## 2. Admin Dashboard (`/`)

**Files:** `AdminDashboard.jsx`, `dashboardData.jsx`, `SalesChart/SalesChart.jsx`

### 2.1 KPI Stats Cards

| UI Element | Current Data Source | Required API |
|---|---|---|
| Total Revenue, Active Users, Total Orders, Conversion Rate (4 cards) | `statsData` from `dashboardData.jsx` | **`(R) GET /api/admin/dashboard/stats`** |

**Expected Response:**
```json
{
  "stats": [
    { "label": "Total Revenue", "value": "$128,430", "trend": "+12.5%", "trendDirection": "up", "icon": "payments" },
    { "label": "Active Users", "value": "8,420", "trend": "+4.2%", "trendDirection": "up", "icon": "group" },
    { "label": "Total Orders", "value": "2,145", "trend": "-2.4%", "trendDirection": "down", "icon": "shopping_cart" },
    { "label": "Conversion Rate", "value": "3.2%", "trend": "+1.8%", "trendDirection": "up", "icon": "ads_click" }
  ]
}
```

### 2.2 Sales Growth Chart

| UI Element | Current Data Source | Required API |
|---|---|---|
| Daily/Monthly toggle | Local state (`activeTab`) | Query parameter |
| Chart data (labels + dataset) | `salesChartData` from `dashboardData.jsx` | **`(R) GET /api/admin/dashboard/sales-chart?period={daily|monthly}`** |

**Expected Response:**
```json
{
  "period": "daily",
  "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "datasets": [
    { "label": "This Week", "data": [12000, 19000, 15000, 22000, 18000, 25000, 21000] },
    { "label": "Last Week", "data": [10000, 15000, 13000, 18000, 14000, 20000, 17000] }
  ]
}
```

### 2.3 Conversion Rate Widget

| UI Element | Current Data Source | Required API |
|---|---|---|
| Conversion rate percentage, bar chart | `conversionRateData` from `dashboardData.jsx` | **`(R) GET /api/admin/dashboard/conversion`** |

### 2.4 Recent Activity Feed

| UI Element | Current Data Source | Required API |
|---|---|---|
| Activity list (icon, message, time) | `recentActivities` from `dashboardData.jsx` | **`(R) GET /api/admin/dashboard/activity?limit=5`** |

**Expected Response:**
```json
{
  "activities": [
    { "id": 1, "icon": "shopping_cart", "message": "John Doe placed an order for Custom Oak Desk.", "time": "2 minutes ago", "link": "/orders/1234" },
    { "id": 2, "icon": "person_add", "message": "New vendor Nordic Nest registered.", "time": "15 minutes ago", "link": "/vendors/5" }
  ]
}
```

### 2.5 Top Selling Models

| UI Element | Current Data Source | Required API |
|---|---|---|
| Top products list (name, sales, revenue, gradient) | `topSellingModels` from `dashboardData.jsx` | **`(R) GET /api/admin/dashboard/top-products?limit=5`** |

---

## 3. User Management (`/users`)

**Files:** `UserManagement.jsx`, `userManagementData.js`

### 3.1 Page Load — Stats & Users List

| UI Element | Current Data Source | Required API |
|---|---|---|
| KPI stats (Total Users, Active Users, New Users Today) | `pageStats` from `userManagementData.js` | **`(R) GET /api/admin/users/stats`** |
| Users table data | `usersData` from `userManagementData.js` | **`(R) GET /api/admin/users?page=1&limit=10&search={q}&role={role}&status={status}`** |

**Expected Response for users list:**
```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Customer",
      "status": "Active",
      "joinDate": "Oct 15, 2023",
      "avatarUrl": null
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 245, "totalPages": 25 }
}
```

### 3.2 Filters & Search

| UI Element | Current Data Source | Required API |
|---|---|---|
| Search by name/email | Local filter on `usersData` | Query params on `GET /api/admin/users?search={q}` |
| Role filter dropdown | `roleFilterOptions` from `userManagementData.js` | Query params on `GET /api/admin/users?role={role}` |
| Status filter dropdown | `statusFilterOptions` from `userManagementData.js` | Query params on `GET /api/admin/users?status={status}` |

### 3.3 Actions

| UI Element / Action | Current Behavior | Required API |
|---|---|---|
| **Create User** (modal → form submit) | Adds to local state | **`(C) POST /api/admin/users`** |
| **Toggle User Status** (Active ↔ Inactive toggle button) | Updates local state | **`(U) PATCH /api/admin/users/{id}/status`** |
| **View User Profile** (if added) | Not yet implemented | **`(R) GET /api/admin/users/{id}`** |
| **Edit User** (if added) | Not yet implemented | **`(U) PUT /api/admin/users/{id}`** |
| **Delete User** (if added) | Not yet implemented | **`(D) DELETE /api/admin/users/{id}`** |

**POST `/api/admin/users` Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "Customer",
  "status": "Active"
}
```

**PATCH `/api/admin/users/{id}/status` Request Body:**
```json
{
  "status": "Inactive"
}
```

---

## 4. Vendor Management (`/vendors`)

**Files:** `VendorManagement.jsx`, `vendorManagementData.js`

### 4.1 Page Load — Stats, Applications & Active Vendors

| UI Element | Current Data Source | Required API |
|---|---|---|
| KPI stats (Total Vendors, New Applications, Active Vendors) | `vendorStats` from `vendorManagementData.js` | **`(R) GET /api/admin/vendors/stats`** |
| Vendor applications table | `vendorApplications` from `vendorManagementData.js` | **`(R) GET /api/admin/vendors/applications?status=pending&page=1&limit=10`** |
| Active vendors directory | `activeVendors` from `vendorManagementData.js` | **`(R) GET /api/admin/vendors?status=active&search={q}&page=1&limit=10`** |

### 4.2 Filters & Search

| UI Element | Current Data Source | Required API |
|---|---|---|
| Search active vendors by name | Local filter | Query params on `GET /api/admin/vendors?search={q}` |

### 4.3 Actions

| UI Element / Action | Current Behavior | Required API |
|---|---|---|
| **Approve Vendor Application** | Moves from applications to active vendors in state | **`(U) PATCH /api/admin/vendors/applications/{id}/approve`** |
| **Reject Vendor Application** | Removes from applications in state | **`(U) PATCH /api/admin/vendors/applications/{id}/reject`** |
| **Invite Vendor** (modal → form submit) | Adds to active vendors in state | **`(C) POST /api/admin/vendors/invite`** |
| **Export Vendors to CSV** | Client-side CSV download | **`(R) GET /api/admin/vendors/export?format=csv`** (returns file download) |
| **View Vendor Profile** (hover card / click) | Hover effect only | **`(R) GET /api/admin/vendors/{id}`** |
| **Edit Vendor** (if added) | Not yet implemented | **`(U) PUT /api/admin/vendors/{id}`** |
| **Deactivate Vendor** (if added) | Not yet implemented | **`(U) PATCH /api/admin/vendors/{id}/status`** |

**POST `/api/admin/vendors/invite` Request Body:**
```json
{
  "name": "Nordic Nest",
  "email": "contact@nordicnest.com",
  "phone": "+1-555-0123"
}
```

**PATCH `/api/admin/vendors/applications/{id}/approve` Request Body:**
```json
{
  "note": "Approved after review"  // optional
}
```

---

## 5. Product Moderation (`/products`)

**Files:** `ProductModeration.jsx`, `productModerationData.js`

### 5.1 Page Load — Stats, Pending Approvals & Product Catalog

| UI Element | Current Data Source | Required API |
|---|---|---|
| KPI stats (Total Products, Pending Approval, Featured Products) | `productStats` from `productModerationData.js` | **`(R) GET /api/admin/products/stats`** |
| Pending approvals table | `pendingApprovals` from `productModerationData.js` | **`(R) GET /api/admin/products/pending?page=1&limit=10`** |
| All products catalog table | `allProducts` from `productModerationData.js` | **`(R) GET /api/admin/products?category={cat}&status={status}&page=1&limit=10`** |

### 5.2 Filters

| UI Element | Current Data Source | Required API |
|---|---|---|
| Category filter dropdown (Living Room, Workspace, Decor, Dining, Bedroom) | `categoryOptions` array in component | Query params on `GET /api/admin/products?category={cat}` |
| Status filter dropdown (Live, Featured, Disabled, Pending) | `statusOptions` array in component | Query params on `GET /api/admin/products?status={status}` |

### 5.3 Actions on Pending Approvals

| UI Element / Action | Current Behavior | Required API |
|---|---|---|
| **Approve Product** (approve button) | Moves from pending to catalog in state | **`(U) PATCH /api/admin/products/pending/{id}/approve`** |
| **Reject Product** (reject button) | Removes from pending in state | **`(U) PATCH /api/admin/products/pending/{id}/reject`** |

**PATCH `/api/admin/products/pending/{id}/reject` Request Body:**
```json
{
  "reason": "Images do not meet quality standards"  // optional
}
```

### 5.4 Actions on Catalog Products

| UI Element / Action | Current Behavior | Required API |
|---|---|---|
| **Add Product** (modal → form submit) | Adds to products state | **`(C) POST /api/admin/products`** |
| **View Product** (action menu → View) | Opens view modal | **`(R) GET /api/admin/products/{id}`** |
| **Edit Product** (action menu → Edit → form submit) | Updates product in state | **`(U) PUT /api/admin/products/{id}`** |
| **Delete Product** (action menu → Delete) | Removes from state | **`(D) DELETE /api/admin/products/{id}`** |

**POST `/api/admin/products` Request Body:**
```json
{
  "name": "Modern Oak Desk",
  "vendor": "WoodWorks",
  "category": "Workspace",
  "status": "Live",
  "price": 450.00,
  "sku": "WW-OD-001",
  "description": "Handcrafted modern oak desk",
  "images": ["base64_or_url"]
}
```

**PUT `/api/admin/products/{id}` Request Body:**
```json
{
  "name": "Modern Oak Desk (Updated)",
  "vendor": "WoodWorks",
  "category": "Workspace",
  "status": "Featured"
}
```

---

## 6. Analytics & Reports (`/analytics`)

**Files:** `AnalyticsReports.jsx`, `analyticsData.js`

### 6.1 Page Load — KPIs & Charts

| UI Element | Current Data Source | Required API |
|---|---|---|
| KPI cards (Total Revenue, Avg. Order Value, Conversion Rate, Net Profit) | `dateRangeData` object in component | **`(R) GET /api/admin/analytics/kpis?range={oct|q3|h1|ytd|custom}&from={date}&to={date}`** |
| Revenue Analytics line chart (SVG) | Hardcoded SVG paths | **`(R) GET /api/admin/analytics/revenue-chart?range={range}`** |
| Sales by Category donut chart | `salesByCategory` from `analyticsData.js` | **`(R) GET /api/admin/analytics/sales-by-category?range={range}`** |
| Vendor Performance bar chart | `vendorPerformance` from `analyticsData.js` | **`(R) GET /api/admin/analytics/vendor-performance?range={range}`** |
| User Growth Metrics line chart | Hardcoded SVG paths | **`(R) GET /api/admin/analytics/user-growth?range={range}`** |

### 6.2 Interactions

| UI Element / Action | Current Behavior | Required API |
|---|---|---|
| **Date Range Picker** (Oct, Q3, H1, YTD presets) | Switches local data, shows toast | All the above GET endpoints accept `?range=` parameter |
| **Export Data** dropdown (CSV, Excel, PDF) | Not functional | **`(R) GET /api/admin/analytics/export?format={csv|excel|pdf}&range={range}`** (returns file download) |

**Expected Response for KPIs:**
```json
{
  "range": "oct",
  "rangeLabel": "Oct 1 – Oct 31, 2023",
  "kpis": [
    { "label": "Total Revenue", "value": "$128,430", "trendValue": "12%", "trendDirection": "up" },
    { "label": "Avg. Order Value", "value": "$450", "trendValue": "2%", "trendDirection": "down" },
    { "label": "Conversion Rate", "value": "3.2%", "trendValue": "0.5%", "trendDirection": "up" },
    { "label": "Net Profit", "value": "$42,100", "trendValue": "8%", "trendDirection": "up" }
  ],
  "totalSales": "$84k"
}
```

**Expected Response for Sales by Category:**
```json
{
  "categories": [
    { "name": "Living Room", "percentage": 40, "amount": "$33,772" },
    { "name": "Bedroom", "percentage": 25, "amount": "$21,108" },
    { "name": "Dining", "percentage": 20, "amount": "$16,886" },
    { "name": "Office", "percentage": 15, "amount": "$12,664" }
  ]
}
```

**Expected Response for Revenue Chart:**
```json
{
  "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  "currentYear": [25000, 30000, 28000, 45000, 40000, 55000, 50000, 60000, 80000, 120000, 90000, 95000],
  "previousYear": [20000, 22000, 18000, 35000, 30000, 42000, 38000, 45000, 55000, 65000, 70000, 72000]
}
```

---

## 7. Coupon & Offer Management (`/coupons`)

**Files:** `CouponManagement.jsx`, `couponManagementData.js`

### 7.1 Page Load — KPIs & Coupons Table

| UI Element | Current Data Source | Required API |
|---|---|---|
| KPI stats (Total Active Coupons, Total Discount Given, Most Used Coupon) | `couponKPIs` from `couponManagementData.js` | **`(R) GET /api/admin/coupons/stats`** |
| Coupons table data | `couponsData` from `couponManagementData.js` | **`(R) GET /api/admin/coupons?tab={all|active|expired}&search={code}&page=1&limit=10`** |

### 7.2 Filters & Tabs

| UI Element | Current Data Source | Required API |
|---|---|---|
| Tab navigation (All Coupons, Active Only, Expired) | `couponTabs` from `couponManagementData.js` | Query params on `GET /api/admin/coupons?tab={all|active|expired}` |
| Search by coupon code | Search input (not wired) | Query params on `GET /api/admin/coupons?search={code}` |
| Filter button | Not wired | Additional query params (category, discount type, etc.) |

### 7.3 Actions

| UI Element / Action | Current Behavior | Required API |
|---|---|---|
| **Create New Coupon** (modal → form submit) | Opens modal, no submit handler | **`(C) POST /api/admin/coupons`** |
| **Edit Coupon** (edit icon per row) | Not wired | **`(U) PUT /api/admin/coupons/{id}`** |
| **Toggle Coupon Visibility** (visibility icon per row) | Not wired | **`(U) PATCH /api/admin/coupons/{id}/visibility`** |
| **Delete Coupon** (delete icon per row) | Not wired | **`(D) DELETE /api/admin/coupons/{id}`** |
| **Pagination** (page buttons) | Hardcoded "Showing 1 to 3 of 12" | Handled by `?page=` query param |

**POST `/api/admin/coupons` Request Body:**
```json
{
  "code": "SUMMER2024",
  "discountType": "percentage",
  "discountValue": 20,
  "expiryDate": "2024-12-31",
  "usageLimit": 1000,
  "description": "Summer sale campaign"
}
```

**PATCH `/api/admin/coupons/{id}/visibility` Request Body:**
```json
{
  "isVisible": false
}
```

**Expected Response for coupons list:**
```json
{
  "coupons": [
    {
      "id": 1,
      "code": "SAVE20",
      "discountType": "percentage",
      "discountValue": 20,
      "displayDiscount": "20% Off",
      "expiryDate": "2024-12-31",
      "usageCurrent": 842,
      "usageMax": 1000,
      "usagePercent": 84,
      "status": "Active",
      "tag": "Flash Sale",
      "isVisible": true,
      "createdAt": "2024-01-15T00:00:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 12, "totalPages": 2 }
}
```

---

## 8. Order Management (`/orders`)

**Files:** `OrderManagement.jsx`, `orderManagementData.js`

### 8.1 Page Load — KPIs & Orders Table

| UI Element | Current Data Source | Required API |
|---|---|---|
| KPI stats (Total Orders, Revenue, Pending Fulfillment) | `orderKPIs` from `orderManagementData.js` | **`(R) GET /api/admin/orders/stats`** |
| Orders table data | `ordersData` from `orderManagementData.js` | **`(R) GET /api/admin/orders?page=1&limit=10&status={status}&payment={payment}&dateFrom={date}&dateTo={date}`** |

### 8.2 Filters

| UI Element | Current Data Source | Required API |
|---|---|---|
| Order Status filter (All, Placed, Confirmed, Shipped, Delivered, Cancelled) | `statusFilterOptions` from `orderManagementData.js` | Query params on `GET /api/admin/orders?status={status}` |
| Payment filter (All, Success, Pending, Failed) | `paymentFilterOptions` from `orderManagementData.js` | Query params on `GET /api/admin/orders?payment={payment}` |
| Date From / Date To inputs | Local state | Query params on `GET /api/admin/orders?dateFrom={date}&dateTo={date}` |
| Reset Filters button | Clears all filter states | Client-side action (re-fetches with no filters) |

### 8.3 Actions

| UI Element / Action | Current Behavior | Required API |
|---|---|---|
| **Create Order** (modal → form submit) | Adds to orders state | **`(C) POST /api/admin/orders`** |
| **Export CSV** (export button) | Client-side CSV download | **`(R) GET /api/admin/orders/export?format=csv&status={status}&payment={payment}&dateFrom={date}&dateTo={date}`** |
| **Manual Status Override** (change status icon → modal → confirm) | Updates order status in state | **`(U) PATCH /api/admin/orders/{id}/status`** |
| **View Invoice** (receipt icon per row) | Not wired | **`(R) GET /api/admin/orders/{id}/invoice`** |
| **View Order Details** (more_vert icon per row) | Not wired | **`(R) GET /api/admin/orders/{id}`** |

**POST `/api/admin/orders` Request Body:**
```json
{
  "customerName": "John Doe",
  "total": 1299.99,
  "paymentStatus": "Pending",
  "orderStatus": "Placed"
}
```

**PATCH `/api/admin/orders/{id}/status` Request Body:**
```json
{
  "status": "Shipped",
  "reason": "Customer requested expedited shipping"
}
```

**Expected Response for orders list:**
```json
{
  "orders": [
    {
      "id": 1,
      "orderId": "#ORD-2847",
      "customerName": "John Doe",
      "customerInitials": "JD",
      "date": "Oct 24, 2023",
      "total": "$1,299.99",
      "paymentStatus": "Success",
      "orderStatus": "Delivered"
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 156, "totalPages": 16 }
}
```

---

## 9. Security & Control (`/security`)

**Files:** `SecurityControl.jsx`, `securityData.js`

### 9.1 Page Load — Stats, Roles & Audit Logs

| UI Element | Current Data Source | Required API |
|---|---|---|
| Stats cards (Total Admins, Active Sessions, Security Alerts) | `securityStats` from `securityData.js` | **`(R) GET /api/admin/security/stats`** |
| System roles table | `rolesData` from `securityData.js` | **`(R) GET /api/admin/security/roles`** |
| Recent audit logs | `auditLogs` from `securityData.js` | **`(R) GET /api/admin/security/audit-logs?page=1&limit=10`** |

### 9.2 Tabs

| UI Element | Current Data Source | Required API |
|---|---|---|
| "Roles & Permissions" tab | `securityTabs` array | Shows roles table (already loaded) |
| "User Assignment" tab | Not implemented content | **`(R) GET /api/admin/security/user-assignments?page=1&limit=10`** |
| "Security Logs" tab | Shows audit logs | Same as audit logs endpoint |

### 9.3 Actions

| UI Element / Action | Current Behavior | Required API |
|---|---|---|
| **Add Role** (button) | Not wired | **`(C) POST /api/admin/security/roles`** |
| **Edit Role** (edit icon per row) | Not wired | **`(U) PUT /api/admin/security/roles/{id}`** |
| **Delete Role** (if added) | Not present | **`(D) DELETE /api/admin/security/roles/{id}`** |
| **Export Logs** (header button) | Not wired | **`(R) GET /api/admin/security/audit-logs/export?format=csv`** |
| **Refresh Data** (header button) | Not wired | Re-fetches all security endpoints (client-side orchestration) |
| **View All Logs** (link) | Not wired | Navigates to full logs view or paginated endpoint |

**POST `/api/admin/security/roles` Request Body:**
```json
{
  "name": "Content Manager",
  "description": "Can manage catalog and blog content",
  "accessLevel": "Restricted",
  "permissions": ["products.read", "products.write", "content.manage"]
}
```

**Expected Response for audit logs:**
```json
{
  "logs": [
    {
      "id": 1,
      "timestamp": "Oct 24, 2023 • 14:22:01",
      "userName": "Alex Kim",
      "userInitials": "AK",
      "action": "User banned",
      "ip": "192.168.1.45",
      "status": "info",
      "severity": "warning"
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 248, "totalPages": 25 }
}
```

---

## 10. Authentication & Authorization

**Not yet implemented in the frontend, but required for backend integration.**

| Action | Required API |
|---|---|
| Admin Login | **`(A) POST /api/auth/login`** |
| Admin Registration (if applicable) | **`(A) POST /api/auth/register`** |
| Forgot Password | **`(A) POST /api/auth/forgot-password`** |
| Reset Password | **`(A) POST /api/auth/reset-password`** |
| Refresh Token | **`(A) POST /api/auth/refresh-token`** |
| Logout | **`(A) POST /api/auth/logout`** |
| Get Current Session / Profile | **`(R) GET /api/admin/me`** |

**POST `/api/auth/login` Request Body:**
```json
{
  "email": "admin@furnicustom.com",
  "password": "securePassword123"
}
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "dGhpcyBpcyBhIH...",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@furnicustom.com",
    "role": "Super Admin",
    "avatarUrl": "https://..."
  },
  "expiresIn": 3600
}
```

---

## 11. API Summary Table

### Complete Endpoint Reference

| # | Method | Endpoint | Page(s) | Description |
|---|---|---|---|---|
| **AUTH** | | | | |
| 1 | POST | `/api/auth/login` | Login Page | Admin login |
| 2 | POST | `/api/auth/register` | Register Page | Admin registration |
| 3 | POST | `/api/auth/forgot-password` | Forgot Password | Send password reset email |
| 4 | POST | `/api/auth/reset-password` | Reset Password | Reset with token |
| 5 | POST | `/api/auth/refresh-token` | Global | Refresh JWT |
| 6 | POST | `/api/auth/logout` | Header | End session |
| **GLOBAL** | | | | |
| 7 | GET | `/api/admin/me` | Header | Current user profile |
| 8 | GET | `/api/admin/search` | Header | Global search |
| 9 | GET | `/api/admin/notifications` | Header | Fetch notifications |
| 10 | PATCH | `/api/admin/notifications/mark-all-read` | Header | Mark all read |
| **DASHBOARD** | | | | |
| 11 | GET | `/api/admin/dashboard/stats` | Dashboard | KPI cards |
| 12 | GET | `/api/admin/dashboard/sales-chart` | Dashboard | Sales chart data |
| 13 | GET | `/api/admin/dashboard/conversion` | Dashboard | Conversion metrics |
| 14 | GET | `/api/admin/dashboard/activity` | Dashboard | Recent activity |
| 15 | GET | `/api/admin/dashboard/top-products` | Dashboard | Top selling models |
| **USERS** | | | | |
| 16 | GET | `/api/admin/users/stats` | Users | User stats |
| 17 | GET | `/api/admin/users` | Users | List users (paginated, filtered) |
| 18 | GET | `/api/admin/users/{id}` | Users | Single user detail |
| 19 | POST | `/api/admin/users` | Users | Create user |
| 20 | PUT | `/api/admin/users/{id}` | Users | Update user |
| 21 | PATCH | `/api/admin/users/{id}/status` | Users | Toggle user status |
| 22 | DELETE | `/api/admin/users/{id}` | Users | Delete user |
| **VENDORS** | | | | |
| 23 | GET | `/api/admin/vendors/stats` | Vendors | Vendor stats |
| 24 | GET | `/api/admin/vendors` | Vendors | List active vendors |
| 25 | GET | `/api/admin/vendors/{id}` | Vendors | Single vendor detail |
| 26 | GET | `/api/admin/vendors/applications` | Vendors | Pending applications |
| 27 | POST | `/api/admin/vendors/invite` | Vendors | Invite vendor |
| 28 | PATCH | `/api/admin/vendors/applications/{id}/approve` | Vendors | Approve application |
| 29 | PATCH | `/api/admin/vendors/applications/{id}/reject` | Vendors | Reject application |
| 30 | PUT | `/api/admin/vendors/{id}` | Vendors | Update vendor |
| 31 | PATCH | `/api/admin/vendors/{id}/status` | Vendors | Activate/deactivate |
| 32 | GET | `/api/admin/vendors/export` | Vendors | Export CSV |
| **PRODUCTS** | | | | |
| 33 | GET | `/api/admin/products/stats` | Products | Product stats |
| 34 | GET | `/api/admin/products` | Products | List products (filtered) |
| 35 | GET | `/api/admin/products/{id}` | Products | Single product detail |
| 36 | GET | `/api/admin/products/pending` | Products | Pending approvals |
| 37 | POST | `/api/admin/products` | Products | Create product |
| 38 | PUT | `/api/admin/products/{id}` | Products | Update product |
| 39 | DELETE | `/api/admin/products/{id}` | Products | Delete product |
| 40 | PATCH | `/api/admin/products/pending/{id}/approve` | Products | Approve pending |
| 41 | PATCH | `/api/admin/products/pending/{id}/reject` | Products | Reject pending |
| **ANALYTICS** | | | | |
| 42 | GET | `/api/admin/analytics/kpis` | Analytics | KPI data by range |
| 43 | GET | `/api/admin/analytics/revenue-chart` | Analytics | Revenue chart data |
| 44 | GET | `/api/admin/analytics/sales-by-category` | Analytics | Category breakdown |
| 45 | GET | `/api/admin/analytics/vendor-performance` | Analytics | Vendor perf bars |
| 46 | GET | `/api/admin/analytics/user-growth` | Analytics | User growth chart |
| 47 | GET | `/api/admin/analytics/export` | Analytics | Export report file |
| **COUPONS** | | | | |
| 48 | GET | `/api/admin/coupons/stats` | Coupons | Coupon stats |
| 49 | GET | `/api/admin/coupons` | Coupons | List coupons (tabbed/filtered) |
| 50 | POST | `/api/admin/coupons` | Coupons | Create coupon |
| 51 | PUT | `/api/admin/coupons/{id}` | Coupons | Update coupon |
| 52 | PATCH | `/api/admin/coupons/{id}/visibility` | Coupons | Toggle visibility |
| 53 | DELETE | `/api/admin/coupons/{id}` | Coupons | Delete coupon |
| **ORDERS** | | | | |
| 54 | GET | `/api/admin/orders/stats` | Orders | Order stats |
| 55 | GET | `/api/admin/orders` | Orders | List orders (filtered/paginated) |
| 56 | GET | `/api/admin/orders/{id}` | Orders | Single order detail |
| 57 | POST | `/api/admin/orders` | Orders | Create order |
| 58 | PATCH | `/api/admin/orders/{id}/status` | Orders | Status override |
| 59 | GET | `/api/admin/orders/{id}/invoice` | Orders | Get invoice |
| 60 | GET | `/api/admin/orders/export` | Orders | Export CSV |
| **SECURITY** | | | | |
| 61 | GET | `/api/admin/security/stats` | Security | Security stats |
| 62 | GET | `/api/admin/security/roles` | Security | List roles |
| 63 | POST | `/api/admin/security/roles` | Security | Create role |
| 64 | PUT | `/api/admin/security/roles/{id}` | Security | Update role |
| 65 | DELETE | `/api/admin/security/roles/{id}` | Security | Delete role |
| 66 | GET | `/api/admin/security/audit-logs` | Security | List audit logs |
| 67 | GET | `/api/admin/security/audit-logs/export` | Security | Export logs |
| 68 | GET | `/api/admin/security/user-assignments` | Security | User-role assignments |

**Total: 68 endpoints**

---

## Notes for Backend Development

### Standard Response Format
All API responses should follow this structure:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "errors": null
}
```

### Error Response Format
```json
{
  "success": false,
  "data": null,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Email is required" }
  ]
}
```

### Pagination Parameters (Standard)
```
?page=1&limit=10&sortBy=createdAt&sortOrder=desc
```

### Authentication
- All `/api/admin/*` endpoints require `Authorization: Bearer <token>` header
- Token obtained from `POST /api/auth/login`
- Token refresh via `POST /api/auth/refresh-token`

### CORS
Backend must allow the frontend origin (e.g., `http://localhost:5173` in development)

### File Uploads
For product images and avatar uploads, use `multipart/form-data`:
- **`POST /api/admin/upload`** — generic file upload endpoint returning URL
- Or integrate directly into product/user endpoints

---

*Document generated from thorough analysis of all 8 admin panel pages, shared layout components, and 8 data files in the Furniture Customizer Admin frontend.*
