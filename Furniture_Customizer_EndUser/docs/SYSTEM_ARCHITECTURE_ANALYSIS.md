# 🪑 Furniture Marketplace — System Architecture Analysis

> **Author:** System Architect  
> **Date:** 2026-02-21  
> **Scope:** Admin, Vendor & Customer Application Architecture  
> **Database:** 38 Tables across 14 Modules  

---

## 📋 Table of Contents

1. [Business Domain Analysis](#1-business-domain-analysis)
2. [Role Responsibilities](#2-role-responsibilities)
3. [Database → Feature Mapping](#3-database--feature-mapping)
4. [Schema Validation](#4-schema-validation)
5. [Missing Tables, Fields & Relations](#5-missing-tables-fields--relations)
6. [Role-Based Access Control (RBAC)](#6-role-based-access-control-rbac)
7. [API / Module Breakdown](#7-api--module-breakdown)

---

## 1. Business Domain Analysis

### What is this system?

A **multi-vendor furniture marketplace** with a built-in **customization engine**. Unlike a standard e-commerce platform, this system allows customers to:

1. **Browse** furniture from multiple vendors
2. **Customize** products in real-time (material, color, fabric, size, add-ons)
3. **Save designs** for later
4. **Order** customized furniture with calculated pricing
5. **Book design consultations** with professional designers
6. **Pay via EMI plans** for high-value purchases

### Key Business Flows

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CUSTOMER JOURNEY                                 │
│                                                                         │
│  Browse Catalog → Select Model → Customize (Material/Color/Fabric/     │
│  Size/Add-ons) → Save Design → Add to Cart → Checkout → Payment →      │
│  Order Processing → Manufacturing → Shipping → Delivery → Review       │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         VENDOR JOURNEY                                  │
│                                                                         │
│  Register → Admin Approval → Add Products → Define Customization       │
│  Options → Manage Inventory → Process Orders → Track Settlements       │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                          ADMIN JOURNEY                                  │
│                                                                         │
│  Approve Vendors → Moderate Products → Manage Categories → Process     │
│  Disputes → Moderate Reviews → Manage Coupons → View Analytics →       │
│  Manage Users → Configure Permissions → Track Payments                  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Role Responsibilities

### 🔴 Admin Responsibilities (Platform Owner)

| Area | Responsibilities | Primary Tables |
|------|-----------------|----------------|
| **User Management** | Create/deactivate users, assign roles, verify accounts | `users`, `roles`, `role_permissions` |
| **Vendor Management** | Approve/reject vendor registrations, suspend vendors | `vendors`, `users` |
| **Product Moderation** | Approve/reject product listings, manage global categories | `furniture_models`, `categories` |
| **Customization Options** | Manage global materials, colors, fabrics, sizes, add-ons | `materials`, `colors`, `fabrics`, `sizes`, `add_ons` |
| **Order Oversight** | View all orders, handle escalations, process refunds | `orders`, `order_items`, `order_status_history` |
| **Payment & Finance** | View all payments, track revenue, manage commissions | `payments`, `daily_sales_summary` |
| **Review Moderation** | Approve/reject customer reviews | `reviews` |
| **Coupon Management** | Create/edit/deactivate coupons | `coupons`, `coupon_usage` |
| **Inventory Oversight** | Monitor stock levels across all vendors | `materials`, `inventory_logs` |
| **Designer Management** | Approve designers, view consultations | `designers`, `consultations` |
| **EMI Configuration** | Manage EMI plans and bank partnerships | `emi_plans` |
| **Analytics & Reports** | Sales dashboards, user analytics, revenue reports | `daily_sales_summary`, `user_activity_logs` |
| **Security & Access** | Manage permissions, monitor suspicious activity | `permissions`, `role_permissions`, `password_resets` |

### 🟢 Vendor Capabilities

| Area | Capabilities | Primary Tables |
|------|-------------|----------------|
| **Profile Management** | Edit company profile, GST details | `vendors`, `users` |
| **Product Management** | CRUD own products, set base prices, upload images | `furniture_models` (own vendor_id only) |
| **Customization Setup** | Define which materials/colors/fabrics/sizes/add-ons apply to each product | `model_materials`, `model_colors`, `model_fabrics`, `model_sizes`, `model_addons` |
| **Category Browse** | View existing categories (cannot create new) | `categories` (read-only) |
| **Order Management** | View/process orders for own products, update status | `orders`, `order_items` (filtered by own products) |
| **Inventory Management** | Restock materials, view stock levels, log changes | `materials` (stock_quantity), `inventory_logs` |
| **Review Viewing** | View reviews on own products (cannot delete) | `reviews` (filtered by own models) |
| **Sales Analytics** | View own sales data, revenue, top products | Derived from `orders` + `order_items` |

### 🔵 Customer Capabilities

| Area | Capabilities | Primary Tables |
|------|-------------|----------------|
| **Account Management** | Register, login, edit profile, manage addresses | `users`, `user_addresses`, `password_resets` |
| **Browse & Search** | Browse catalog by category, search, filter | `furniture_models`, `categories` |
| **Product Customization** | Select material, color, fabric, size, add-ons with live pricing | All customization + junction tables |
| **Design Saving** | Save customized designs for later | `saved_designs` |
| **Cart Management** | Add designs to cart, update quantity, remove items | `carts`, `cart_items` |
| **Checkout & Orders** | Place orders, select address, apply coupons | `orders`, `order_items`, `coupon_usage` |
| **Payment** | Pay via multiple methods, view payment status | `payments` |
| **Order Tracking** | Track order status, view history | `orders`, `order_status_history` |
| **Reviews** | Write and submit reviews on delivered products | `reviews` |
| **Coupon Application** | Apply discount coupons during checkout | `coupons`, `coupon_usage` |
| **EMI Calculator** | Calculate EMI options for expensive items | `emi_plans` |
| **Design Consultation** | Book consultations with designers | `consultations` |
| **Recommendations** | Get AI-based recommendations | `user_activity_logs` |

### 🟡 Designer Capabilities

| Area | Capabilities | Primary Tables |
|------|-------------|----------------|
| **Profile Management** | Edit bio, experience, view own rating | `designers`, `users` |
| **Consultation Management** | Accept/reject bookings, mark complete | `consultations` |
| **Client Designs** | View client's saved designs during consultation | `saved_designs` (read-only, by consultation) |

---

## 3. Database → Feature Mapping

### Table-by-Table Feature Matrix

| Table | Admin | Vendor | Customer | Designer |
|-------|:-----:|:------:|:--------:|:--------:|
| `users` | CRUD All | Read/Update Own | Read/Update Own | Read/Update Own |
| `roles` | CRUD | — | — | — |
| `permissions` | CRUD | — | — | — |
| `role_permissions` | CRUD | — | — | — |
| `user_addresses` | Read All | — | CRUD Own | — |
| `password_resets` | Monitor | Use Own | Use Own | Use Own |
| `vendors` | CRUD (Approve) | Read/Update Own | — | — |
| `designers` | CRUD (Approve) | — | — | Read/Update Own |
| `categories` | CRUD | Read | Read | Read |
| `furniture_models` | CRUD All (Moderate) | CRUD Own | Read (Active) | Read |
| `materials` | CRUD | Read | Read | — |
| `colors` | CRUD | Read | Read | — |
| `fabrics` | CRUD | Read | Read | — |
| `sizes` | CRUD | Read | Read | — |
| `add_ons` | CRUD | Read | Read | — |
| `model_materials` | Read All | CRUD Own Models | Read | — |
| `model_colors` | Read All | CRUD Own Models | Read | — |
| `model_fabrics` | Read All | CRUD Own Models | Read | — |
| `model_sizes` | Read All | CRUD Own Models | Read | — |
| `model_addons` | Read All | CRUD Own Models | Read | — |
| `saved_designs` | Read All | Read (Own Products) | CRUD Own | Read (by consultation) |
| `carts` | — | — | CRUD Own | — |
| `cart_items` | — | — | CRUD Own | — |
| `orders` | Read/Update All | Read Own Products | Create/Read Own | — |
| `order_items` | Read All | Read Own Products | Read Own | — |
| `order_status_history` | CRUD | Create (Own Products) | Read Own | — |
| `payments` | Read All | Read Own Products | Read Own | — |
| `inventory_logs` | Read All | CRUD Own | — | — |
| `reviews` | CRUD (Moderate) | Read Own Products | Create/Read | — |
| `coupons` | CRUD | Read | Read/Apply | — |
| `coupon_usage` | Read All | — | Create/Read Own | — |
| `consultations` | Read All | — | Create/Read Own | CRUD Own |
| `emi_plans` | CRUD | Read | Read | — |
| `user_activity_logs` | Read All | Read Own Products | Auto-Create | — |
| `daily_sales_summary` | Read | Read Own (if extended) | — | — |

---

## 4. Schema Validation

### ✅ Multi-Vendor Product Management — **SUPPORTED**

```
vendors (user_id) → furniture_models (vendor_id)
                          ↓
              model_materials, model_colors, model_fabrics,
              model_sizes, model_addons (per-model customization)
```

**Verdict:** Each product (`furniture_models`) has a `vendor_id` FK, correctly scoping products to vendors. Junction tables allow per-model customization options. ✅

### ✅ Order Lifecycle — **SUPPORTED**

```
Pending → Confirmed → Manufacturing → Shipped → Delivered → Cancelled → Returned
```

**Verdict:** `orders.status` holds the current status, `order_status_history` tracks the full lifecycle with timestamps. `customization_snapshot` (JSON) in `order_items` freezes the design at order time. ✅

### ⚠️ Payments, Commissions & Settlements — **PARTIALLY SUPPORTED**

| Feature | Status | Notes |
|---------|--------|-------|
| Payment recording | ✅ Supported | `payments` table with method, transaction_id, status |
| Commission tracking | ❌ **Missing** | No table/field to track platform commission per order/vendor |
| Vendor payouts | ❌ **Missing** | No mechanism to track settlements to vendors |
| Split payments | ❌ **Missing** | Multi-vendor orders have no per-vendor payment split |

---

## 5. Missing Tables, Fields & Relations

### 🔴 Critical — Must Have

#### 5.1 `vendor_commissions` (NEW TABLE)
Track the platform's commission structure per vendor or globally.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | PK |
| `vendor_id` | UUID | FK → vendors.id (NULL = global default) |
| `commission_rate` | DECIMAL(5,2) | Platform commission percentage (e.g., 10.00 = 10%) |
| `effective_from` | DATE | When this rate takes effect |
| `effective_to` | DATE | NULL = currently active |

#### 5.2 `vendor_settlements` (NEW TABLE)
Track payouts from platform to vendor.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | PK |
| `vendor_id` | UUID | FK → vendors.id |
| `order_id` | UUID | FK → orders.id |
| `order_amount` | DECIMAL(12,2) | Vendor's portion of order |
| `commission_amount` | DECIMAL(12,2) | Platform commission deducted |
| `net_amount` | DECIMAL(12,2) | Amount payable to vendor |
| `status` | VARCHAR | Pending / Processed / Paid |
| `settlement_date` | TIMESTAMP | When payout was made |
| `transaction_reference` | VARCHAR | Bank/UPI transfer reference |

#### 5.3 `order_items` — Add `vendor_id` Column
**Why:** Currently, to find which vendor an order belongs to, you must JOIN `order_items → furniture_models → vendors`. Adding `vendor_id` directly to `order_items` enables:
- Efficient vendor-scoped order queries
- Per-vendor order totals for settlement calculations
- Faster dashboard analytics

```sql
ALTER TABLE order_items ADD COLUMN vendor_id UUID REFERENCES vendors(id);
```

#### 5.4 `notifications` (NEW TABLE)
Essential for all three applications.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | PK |
| `user_id` | UUID | FK → users.id |
| `type` | VARCHAR | ORDER_UPDATE, PAYMENT, REVIEW, VENDOR_APPROVAL, etc. |
| `title` | VARCHAR | Notification title |
| `message` | TEXT | Notification body |
| `reference_id` | UUID | Link to the related entity |
| `reference_type` | VARCHAR | Table name of the related entity |
| `is_read` | BOOLEAN | DEFAULT false |
| `created_at` | TIMESTAMP | When notification was created |

#### 5.5 `wishlists` / `wishlist_items` (NEW TABLES)
Customer must be able to save products they like without customizing.

**`wishlists`**
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | PK |
| `user_id` | UUID | FK → users.id, UNIQUE |

**`wishlist_items`**
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | PK |
| `wishlist_id` | UUID | FK → wishlists.id |
| `model_id` | UUID | FK → furniture_models.id |
| `added_at` | TIMESTAMP | DEFAULT NOW() |

---

### 🟡 Important — Should Have

#### 5.6 `furniture_models` — Missing Fields

| Missing Field | Type | Reason |
|---------------|------|--------|
| `sku` | VARCHAR(UNIQUE) | Product identifier for inventory/vendor reference |
| `min_order_qty` | INT | Minimum order quantity (some furniture is made-to-order) |
| `delivery_days` | INT | Estimated manufacturing + delivery time |
| `weight_kg` | DECIMAL | Needed for shipping cost calculation |
| `is_featured` | BOOLEAN | Admin can feature products on homepage |
| `created_at` | TIMESTAMP | Track when product was listed |
| `updated_at` | TIMESTAMP | Track last edit |

#### 5.7 `furniture_model_images` (NEW TABLE)
Currently only `base_image` exists. Products need multiple images.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | PK |
| `model_id` | UUID | FK → furniture_models.id |
| `image_url` | TEXT | Image URL/path |
| `alt_text` | VARCHAR | Accessibility text |
| `sort_order` | INT | Display order |
| `is_primary` | BOOLEAN | DEFAULT false |

#### 5.8 `orders` — Missing Fields

| Missing Field | Type | Reason |
|---------------|------|--------|
| `order_number` | VARCHAR(UNIQUE) | Human-readable order reference (e.g., `ORD-2026-001234`) |
| `notes` | TEXT | Customer notes for delivery |
| `estimated_delivery` | DATE | Expected delivery date |
| `updated_at` | TIMESTAMP | Track last modification |

#### 5.9 `vendors` — Missing Fields

| Missing Field | Type | Reason |
|---------------|------|--------|
| `logo_url` | TEXT | Vendor brand logo |
| `description` | TEXT | About the vendor |
| `address` | TEXT | Business address |
| `city` | VARCHAR | For location-based filtering |
| `state` | VARCHAR | For regional analytics |
| `rating` | DECIMAL(3,2) | Average vendor rating |
| `bank_account_name` | VARCHAR | For settlements |
| `bank_account_number` | VARCHAR | For settlements |
| `bank_ifsc` | VARCHAR | For settlements |
| `updated_at` | TIMESTAMP | Last profile update |

#### 5.10 `return_requests` (NEW TABLE)
Orders table has `Returned` status but no return workflow.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | PK |
| `order_id` | UUID | FK → orders.id |
| `order_item_id` | UUID | FK → order_items.id |
| `user_id` | UUID | FK → users.id |
| `reason` | TEXT | Return reason |
| `status` | VARCHAR | Requested → Approved → Picked Up → Refunded → Rejected |
| `refund_amount` | DECIMAL(12,2) | Amount to refund |
| `created_at` | TIMESTAMP | Request time |
| `updated_at` | TIMESTAMP | Last status change |

---

### 🟢 Nice to Have

#### 5.11 `shipping_addresses_snapshot` on `orders`
Currently `orders.address_id` FK references `user_addresses`. If user edits/deletes their address later, order history breaks. Add:

```sql
ALTER TABLE orders ADD COLUMN shipping_address_snapshot JSON;
```

#### 5.12 `categories` — Missing Fields

| Missing Field | Type | Reason |
|---------------|------|--------|
| `image_url` | TEXT | Category thumbnail for browsing |
| `slug` | VARCHAR(UNIQUE) | SEO-friendly URL slug |
| `is_active` | BOOLEAN | Toggle category visibility |
| `sort_order` | INT | Custom display ordering |

#### 5.13 `coupons` — Missing Fields

| Missing Field | Type | Reason |
|---------------|------|--------|
| `is_active` | BOOLEAN | Toggle without deleting |
| `per_user_limit` | INT | Max uses per user |
| `vendor_id` | UUID | Vendor-specific coupons |
| `category_id` | UUID | Category-specific coupons |

#### 5.14 `user_sessions` / `refresh_tokens` (NEW TABLE)

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | PK |
| `user_id` | UUID | FK → users.id |
| `refresh_token` | TEXT | JWT refresh token (hashed) |
| `device_info` | VARCHAR | Device/browser info |
| `ip_address` | VARCHAR | Login IP |
| `expires_at` | TIMESTAMP | Token expiry |
| `created_at` | TIMESTAMP | Session start |

---

## 6. Role-Based Access Control (RBAC)

### Proposed Permission Structure

Using the existing `roles`, `permissions`, and `role_permissions` tables:

#### Permission Naming Convention
```
{action}_{module}
```

#### Complete Permission Matrix

```
MODULE: users
├── view_users          → Admin
├── create_users        → Admin
├── update_users        → Admin
├── delete_users        → Admin
├── view_own_profile    → Admin, Vendor, Customer, Designer
└── update_own_profile  → Admin, Vendor, Customer, Designer

MODULE: vendors
├── view_vendors        → Admin
├── approve_vendors     → Admin
├── suspend_vendors     → Admin
├── view_own_vendor     → Vendor
└── update_own_vendor   → Vendor

MODULE: products
├── view_all_products   → Admin
├── moderate_products   → Admin
├── create_product      → Vendor
├── update_own_product  → Vendor
├── delete_own_product  → Vendor
├── view_active_products → Customer, Designer
└── feature_product     → Admin

MODULE: customization
├── manage_materials    → Admin
├── manage_colors       → Admin
├── manage_fabrics      → Admin
├── manage_sizes        → Admin
├── manage_addons       → Admin
├── assign_model_options → Vendor (own models)
└── view_options        → Customer, Designer

MODULE: categories
├── create_category     → Admin
├── update_category     → Admin
├── delete_category     → Admin
└── view_categories     → Admin, Vendor, Customer, Designer

MODULE: orders
├── view_all_orders     → Admin
├── update_any_order    → Admin
├── view_vendor_orders  → Vendor (filtered)
├── update_vendor_order → Vendor (own products)
├── create_order        → Customer
├── view_own_orders     → Customer
└── cancel_own_order    → Customer

MODULE: payments
├── view_all_payments   → Admin
├── process_refund      → Admin
├── view_vendor_payments → Vendor
└── view_own_payments   → Customer

MODULE: reviews
├── moderate_reviews    → Admin
├── view_all_reviews    → Admin
├── view_product_reviews → Vendor (own products)
├── create_review       → Customer
├── update_own_review   → Customer
├── delete_own_review   → Customer
└── view_reviews        → Customer

MODULE: coupons
├── create_coupon       → Admin
├── update_coupon       → Admin
├── delete_coupon       → Admin
├── view_all_coupons    → Admin
└── apply_coupon        → Customer

MODULE: inventory
├── view_all_inventory  → Admin
├── manage_inventory    → Vendor (own materials)
└── view_stock          → Vendor

MODULE: consultations
├── view_all_consultations  → Admin
├── book_consultation       → Customer
├── view_own_consultations  → Customer, Designer
├── update_consultation     → Designer (own)
└── cancel_consultation     → Customer, Designer

MODULE: analytics
├── view_platform_analytics → Admin
├── view_vendor_analytics   → Vendor (own data)
└── view_ai_recommendations → Customer

MODULE: settings
├── manage_emi_plans    → Admin
├── manage_permissions  → Admin
├── manage_roles        → Admin
└── view_emi_plans      → Customer, Vendor

MODULE: notifications
├── view_all_notifications → Admin
├── send_notification      → Admin
└── view_own_notifications → Admin, Vendor, Customer, Designer
```

### Middleware Authorization Flow

```
Request → JWT Decode → Extract user_id + role_id
    → Query role_permissions + permissions
    → Check required permission for endpoint
    → Allow / Deny (403)
```

---

## 7. API / Module Breakdown

### 🔴 ADMIN Application API Modules

```
📦 Admin API (Base: /api/admin)
│
├── 📁 /auth
│   ├── POST   /login                    → Admin login
│   ├── POST   /logout                   → Clear session
│   └── POST   /refresh-token            → Refresh JWT
│
├── 📁 /dashboard
│   ├── GET    /stats                    → Total users, orders, revenue, active vendors
│   ├── GET    /sales-chart              → Daily/monthly sales data
│   └── GET    /recent-activity          → Recent orders, registrations, reviews
│
├── 📁 /users
│   ├── GET    /                         → List all users (paginated, filterable)
│   ├── GET    /:id                      → User detail
│   ├── PATCH  /:id/status               → Activate/deactivate user
│   ├── PATCH  /:id/role                 → Change user role
│   └── DELETE /:id                      → Soft delete user
│
├── 📁 /vendors
│   ├── GET    /                         → List all vendors (filter: pending/approved/suspended)
│   ├── GET    /:id                      → Vendor detail + stats
│   ├── PATCH  /:id/approve              → Approve vendor
│   ├── PATCH  /:id/suspend              → Suspend vendor
│   └── GET    /:id/products             → Vendor's product list
│
├── 📁 /designers
│   ├── GET    /                         → List all designers
│   ├── GET    /:id                      → Designer detail
│   └── PATCH  /:id/approve              → Approve designer
│
├── 📁 /products
│   ├── GET    /                         → List all products (filter by vendor, category, status)
│   ├── GET    /:id                      → Product detail with customization options
│   ├── PATCH  /:id/status               → Activate/deactivate product
│   ├── PATCH  /:id/feature              → Feature/unfeature product
│   └── DELETE /:id                      → Remove product
│
├── 📁 /categories
│   ├── GET    /                         → List category tree
│   ├── POST   /                         → Create category
│   ├── PUT    /:id                      → Update category
│   └── DELETE /:id                      → Delete category (cascade check)
│
├── 📁 /customization
│   ├── 📁 /materials
│   │   ├── GET    /                     → List all materials
│   │   ├── POST   /                     → Create material
│   │   ├── PUT    /:id                  → Update material
│   │   └── DELETE /:id                  → Delete material
│   ├── 📁 /colors                       → Same CRUD pattern
│   ├── 📁 /fabrics                      → Same CRUD pattern
│   ├── 📁 /sizes                        → Same CRUD pattern
│   └── 📁 /addons                       → Same CRUD pattern
│
├── 📁 /orders
│   ├── GET    /                         → List all orders (filter by status, date, vendor)
│   ├── GET    /:id                      → Order detail (items, status history, payment)
│   ├── PATCH  /:id/status               → Update order status
│   └── POST   /:id/refund              → Initiate refund
│
├── 📁 /payments
│   ├── GET    /                         → List all payments
│   ├── GET    /:id                      → Payment detail
│   └── GET    /summary                  → Revenue summary (daily/monthly/yearly)
│
├── 📁 /reviews
│   ├── GET    /                         → List all reviews (filter: pending/approved/rejected)
│   ├── PATCH  /:id/approve              → Approve review
│   └── DELETE /:id                      → Delete review
│
├── 📁 /coupons
│   ├── GET    /                         → List all coupons
│   ├── POST   /                         → Create coupon
│   ├── PUT    /:id                      → Update coupon
│   ├── DELETE /:id                      → Delete coupon
│   └── GET    /:id/usage               → Coupon usage stats
│
├── 📁 /inventory
│   ├── GET    /                         → Stock levels across all materials
│   ├── GET    /logs                     → Inventory change log
│   └── GET    /alerts                   → Low stock alerts
│
├── 📁 /settlements  *(NEW - requires new tables)*
│   ├── GET    /                         → List all settlements
│   ├── GET    /pending                  → Pending vendor payouts
│   ├── POST   /:id/process             → Process settlement
│   └── GET    /vendor/:id              → Vendor settlement history
│
├── 📁 /emi-plans
│   ├── GET    /                         → List EMI plans
│   ├── POST   /                         → Create EMI plan
│   ├── PUT    /:id                      → Update EMI plan
│   └── DELETE /:id                      → Delete EMI plan
│
├── 📁 /analytics
│   ├── GET    /sales                    → Sales analytics
│   ├── GET    /users                    → User growth analytics
│   ├── GET    /products                 → Product performance
│   ├── GET    /vendors                  → Vendor performance comparison
│   └── GET    /exports                  → Export reports (CSV/PDF)
│
├── 📁 /notifications  *(NEW - requires new table)*
│   ├── GET    /                         → All notifications
│   ├── POST   /broadcast                → Send to all/role
│   └── POST   /user/:id                → Send to specific user
│
└── 📁 /settings
    ├── 📁 /roles
    │   ├── GET    /                     → List roles
    │   ├── POST   /                     → Create role
    │   └── PUT    /:id                  → Update role
    └── 📁 /permissions
        ├── GET    /                     → List permissions
        └── PUT    /role/:id            → Update role permissions
```

---

### 🟢 VENDOR Application API Modules

```
📦 Vendor API (Base: /api/vendor)
│
├── 📁 /auth
│   ├── POST   /register                → Vendor registration (creates user + vendor)
│   ├── POST   /login                   → Vendor login
│   ├── POST   /logout                  → Clear session
│   ├── POST   /forgot-password         → Send reset email
│   └── POST   /reset-password          → Reset with token
│
├── 📁 /profile
│   ├── GET    /                        → Get own vendor profile
│   ├── PUT    /                        → Update profile (company name, GST, bank details)
│   └── GET    /approval-status         → Check approval status
│
├── 📁 /dashboard
│   ├── GET    /stats                   → Own stats (products, orders, revenue, pending settlements)
│   ├── GET    /sales-chart             → Own sales over time
│   ├── GET    /recent-orders           → Recent orders for own products
│   └── GET    /top-products            → Best-selling own products
│
├── 📁 /products
│   ├── GET    /                        → List own products (paginated, filterable)
│   ├── GET    /:id                     → Product detail with customization options
│   ├── POST   /                        → Create new product
│   ├── PUT    /:id                     → Update product (validates vendor ownership)
│   ├── DELETE /:id                     → Soft delete product
│   ├── PATCH  /:id/status              → Toggle active/inactive
│   │
│   ├── 📁 /:id/images  *(requires new table)*
│   │   ├── GET    /                    → List product images
│   │   ├── POST   /                    → Upload image
│   │   ├── PUT    /:imageId            → Update image metadata
│   │   └── DELETE /:imageId            → Delete image
│   │
│   └── 📁 /:id/options
│       ├── GET    /                    → Get all customization options for this model
│       ├── PUT    /materials           → Set available materials
│       ├── PUT    /colors              → Set available colors
│       ├── PUT    /fabrics             → Set available fabrics
│       ├── PUT    /sizes               → Set available sizes
│       └── PUT    /addons              → Set available add-ons
│
├── 📁 /categories
│   └── GET    /                        → Browse category tree (read-only)
│
├── 📁 /customization-library
│   ├── GET    /materials               → List all available materials
│   ├── GET    /colors                  → List all available colors
│   ├── GET    /fabrics                 → List all available fabrics
│   ├── GET    /sizes                   → List all available sizes
│   └── GET    /addons                  → List all available add-ons
│
├── 📁 /orders
│   ├── GET    /                        → List orders containing own products
│   ├── GET    /:id                     → Order detail (own products only)
│   ├── PATCH  /:id/status              → Update status (Confirmed → Manufacturing → Shipped)
│   └── GET    /stats                   → Order stats (pending, processing, delivered)
│
├── 📁 /inventory
│   ├── GET    /                        → Stock levels for materials used in own products
│   ├── POST   /restock                 → Log restock (IN entry)
│   ├── GET    /logs                    → Inventory log history
│   └── GET    /alerts                  → Low stock warnings
│
├── 📁 /reviews
│   ├── GET    /                        → Reviews on own products
│   └── GET    /stats                   → Rating breakdown for own products
│
├── 📁 /settlements  *(NEW - requires new tables)*
│   ├── GET    /                        → Settlement history
│   ├── GET    /pending                 → Pending payouts
│   └── GET    /summary                 → Total earnings, commissions, net payouts
│
├── 📁 /analytics
│   ├── GET    /sales                   → Own sales analytics
│   ├── GET    /products                → Product performance (views, orders, revenue)
│   └── GET    /customers               → Customer demographics for own products
│
└── 📁 /notifications  *(NEW - requires new table)*
    ├── GET    /                        → Own notifications
    ├── PATCH  /:id/read               → Mark as read
    └── PATCH  /read-all               → Mark all as read
```

---

### 🔵 CUSTOMER Application API Modules

```
📦 Customer API (Base: /api/customer)
│
├── 📁 /auth
│   ├── POST   /register                → Customer registration
│   ├── POST   /login                   → Customer login
│   ├── POST   /logout                  → Clear session
│   ├── POST   /verify-email            → Email verification
│   ├── POST   /forgot-password         → Send reset email
│   ├── POST   /reset-password          → Reset with token
│   └── POST   /refresh-token           → Refresh JWT
│
├── 📁 /profile
│   ├── GET    /                        → Get own profile
│   ├── PUT    /                        → Update profile
│   ├── PUT    /change-password         → Change password
│   │
│   └── 📁 /addresses
│       ├── GET    /                    → List own addresses
│       ├── POST   /                    → Add address
│       ├── PUT    /:id                 → Update address
│       ├── DELETE /:id                 → Delete address
│       └── PATCH  /:id/default         → Set as default
│
├── 📁 /catalog
│   ├── GET    /products                → Browse products (paginated, filtered, sorted)
│   ├── GET    /products/:id            → Product detail + customization options
│   ├── GET    /products/:id/reviews    → Product reviews
│   ├── GET    /categories              → Category tree for navigation
│   ├── GET    /categories/:id/products → Products by category
│   ├── GET    /search                  → Full-text search
│   ├── GET    /featured                → Featured products
│   └── GET    /vendor/:id              → Vendor store page
│
├── 📁 /customizer
│   ├── GET    /product/:id/options     → Get all customization options for a model
│   ├── POST   /calculate-price         → Real-time price calculation
│   ├── POST   /save-design             → Save a customized design
│   ├── GET    /designs                 → List saved designs
│   ├── GET    /designs/:id             → Get saved design detail
│   └── DELETE /designs/:id             → Delete saved design
│
├── 📁 /cart
│   ├── GET    /                        → Get cart with items
│   ├── POST   /items                   → Add saved design to cart
│   ├── PATCH  /items/:id               → Update quantity
│   ├── DELETE /items/:id               → Remove item
│   └── DELETE /                        → Clear cart
│
├── 📁 /checkout
│   ├── POST   /validate                → Validate cart, stock, prices before order
│   ├── POST   /apply-coupon            → Validate and apply coupon
│   ├── DELETE /coupon                   → Remove applied coupon
│   ├── POST   /create-order            → Create order from cart
│   └── GET    /emi-options             → Get EMI plans for order amount
│
├── 📁 /orders
│   ├── GET    /                        → List own orders (paginated, filterable)
│   ├── GET    /:id                     → Order detail (items, status, payment)
│   ├── GET    /:id/tracking            → Order status history
│   ├── POST   /:id/cancel              → Cancel order (if allowed)
│   └── POST   /:id/return              → Request return *(requires new table)*
│
├── 📁 /payments
│   ├── POST   /initiate                → Initiate payment (Razorpay/Stripe)
│   ├── POST   /verify                  → Verify payment callback
│   └── GET    /history                 → Payment history
│
├── 📁 /reviews
│   ├── POST   /                        → Write review (only for delivered orders)
│   ├── PUT    /:id                     → Update own review
│   ├── DELETE /:id                     → Delete own review
│   └── GET    /my-reviews              → List own reviews
│
├── 📁 /wishlist  *(NEW - requires new tables)*
│   ├── GET    /                        → Get wishlist
│   ├── POST   /items                   → Add product to wishlist
│   ├── DELETE /items/:id               → Remove from wishlist
│   └── GET    /check/:modelId          → Check if product is in wishlist
│
├── 📁 /consultations
│   ├── GET    /designers               → Browse available designers
│   ├── POST   /book                    → Book a consultation
│   ├── GET    /                        → List own consultations
│   ├── GET    /:id                     → Consultation detail
│   └── POST   /:id/cancel              → Cancel consultation
│
├── 📁 /recommendations  *(powered by user_activity_logs)*
│   ├── GET    /for-you                 → Personalized recommendations
│   ├── GET    /similar/:modelId        → Similar products
│   └── GET    /trending                → Trending products
│
└── 📁 /notifications  *(NEW - requires new table)*
    ├── GET    /                        → Own notifications
    ├── PATCH  /:id/read               → Mark as read
    ├── PATCH  /read-all               → Mark all as read
    └── GET    /unread-count            → Unread notification count
```

---

## 📐 Architecture Diagram — How the Three Apps Interact

```
                    ┌─────────────────────┐
                    │   SHARED DATABASE    │
                    │   (38+ Tables)       │
                    └─────────┬───────────┘
                              │
                    ┌─────────┴───────────┐
                    │   SHARED BACKEND     │
                    │   (Node.js/Express)  │
                    │                      │
                    │  ┌────────────────┐  │
                    │  │  Auth Middleware│  │
                    │  │  (JWT + RBAC)  │  │
                    │  └───────┬────────┘  │
                    │          │           │
                    │  ┌───────┴────────┐  │
                    │  │  Route Groups  │  │
                    │  │                │  │
                    │  │  /api/admin/*  │◄─┤──── Admin Frontend (React - existing)
                    │  │  /api/vendor/* │◄─┤──── Vendor Frontend (React - new)
                    │  │  /api/customer/*│◄─┤──── Customer Frontend (React - new)
                    │  │                │  │
                    │  └───────┬────────┘  │
                    │          │           │
                    │  ┌───────┴────────┐  │
                    │  │  Service Layer │  │
                    │  │  (Business     │  │
                    │  │   Logic)       │  │
                    │  └───────┬────────┘  │
                    │          │           │
                    │  ┌───────┴────────┐  │
                    │  │  Data Layer    │  │
                    │  │  (Models/ORM)  │  │
                    │  └────────────────┘  │
                    └─────────────────────┘
```

### Recommended Backend Architecture

```
📦 backend/
├── 📁 config/
│   ├── database.js
│   ├── auth.js
│   └── constants.js
│
├── 📁 middleware/
│   ├── authenticate.js          → JWT verification
│   ├── authorize.js             → RBAC permission check
│   ├── validateRequest.js       → Request validation (Joi/Zod)
│   └── errorHandler.js          → Global error handler
│
├── 📁 models/                   → One model per table
│   ├── User.js
│   ├── Role.js
│   ├── Vendor.js
│   ├── FurnitureModel.js
│   ├── Order.js
│   └── ... (all 38+ tables)
│
├── 📁 services/                 → Business logic layer
│   ├── authService.js
│   ├── userService.js
│   ├── vendorService.js
│   ├── productService.js
│   ├── customizerService.js
│   ├── cartService.js
│   ├── orderService.js
│   ├── paymentService.js
│   ├── inventoryService.js
│   ├── reviewService.js
│   ├── couponService.js
│   ├── consultationService.js
│   ├── settlementService.js
│   ├── notificationService.js
│   └── analyticsService.js
│
├── 📁 routes/
│   ├── 📁 admin/               → Admin-specific routes
│   │   ├── dashboard.js
│   │   ├── users.js
│   │   ├── vendors.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── payments.js
│   │   ├── reviews.js
│   │   ├── coupons.js
│   │   ├── inventory.js
│   │   ├── settlements.js
│   │   ├── analytics.js
│   │   └── settings.js
│   │
│   ├── 📁 vendor/              → Vendor-specific routes
│   │   ├── auth.js
│   │   ├── profile.js
│   │   ├── dashboard.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── inventory.js
│   │   ├── reviews.js
│   │   ├── settlements.js
│   │   └── analytics.js
│   │
│   ├── 📁 customer/            → Customer-specific routes
│   │   ├── auth.js
│   │   ├── profile.js
│   │   ├── catalog.js
│   │   ├── customizer.js
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   ├── orders.js
│   │   ├── payments.js
│   │   ├── reviews.js
│   │   ├── wishlist.js
│   │   ├── consultations.js
│   │   └── recommendations.js
│   │
│   └── 📁 shared/              → Common routes (auth, etc.)
│       └── auth.js
│
├── 📁 utils/
│   ├── priceCalculator.js
│   ├── emailSender.js
│   ├── fileUpload.js
│   └── pagination.js
│
├── 📁 validators/              → Request validation schemas
│   ├── authValidators.js
│   ├── productValidators.js
│   ├── orderValidators.js
│   └── ...
│
└── server.js
```

---

## 🗂️ Summary: Implementation Priority

| Priority | Item | Impact |
|----------|------|--------|
| 🔴 P0 | `vendor_settlements` + `vendor_commissions` tables | Without this, vendor payments cannot be tracked |
| 🔴 P0 | `notifications` table | All three apps need notification support |
| 🔴 P0 | `vendor_id` on `order_items` | Critical for vendor-scoped order queries |
| 🟡 P1 | `return_requests` table | Order returns have no workflow |
| 🟡 P1 | `wishlists` + `wishlist_items` tables | Core customer feature |
| 🟡 P1 | `furniture_model_images` table | Products need multiple images |
| 🟡 P1 | Missing fields on `vendors` (banking, description) | Required for settlements |
| 🟡 P1 | Missing fields on `furniture_models` (SKU, delivery days) | Product completeness |
| 🟡 P1 | Missing fields on `orders` (order_number, notes) | Order UX |
| 🟢 P2 | `user_sessions` / `refresh_tokens` table | Enhanced security |
| 🟢 P2 | Category enhancements (slug, image, sort_order) | SEO + UX |
| 🟢 P2 | Coupon enhancements (vendor-specific, per-user limit) | Marketing features |
| 🟢 P2 | Shipping address snapshot on orders | Data integrity |

---

> **Next Steps:** Once you approve this analysis, I can proceed with:
> 1. Creating the updated database schema with all new tables/fields
> 2. Setting up the Vendor application (React + Vite)
> 3. Setting up the Customer application (React + Vite)
> 4. Building the shared backend (Node.js + Express)
