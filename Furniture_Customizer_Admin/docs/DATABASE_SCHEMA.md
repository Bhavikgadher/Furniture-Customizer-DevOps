# 🪑 Furniture Customizer — Database Schema Documentation

> **Version:** 1.0  
> **Last Updated:** 2026-02-21  
> **Database:** MongoDB (MERN Stack) / PostgreSQL (if relational)  
> **Total Tables:** 38  
> **Total Modules:** 14  

---

## 📊 Schema Overview

| # | Module | Tables | Description |
|---|--------|--------|-------------|
| 1 | User & Auth | 6 | Users, roles, permissions, addresses, password resets |
| 2 | Vendor & Designer | 2 | Vendor profiles, designer profiles |
| 3 | Product & Customization Engine | 11 | Furniture models, materials, colors, fabrics, sizes, add-ons + mapping tables |
| 4 | Custom Design Saving | 1 | User's saved customized designs |
| 5 | Cart | 2 | Cart and cart items |
| 6 | Order | 3 | Orders, order items, status history |
| 7 | Payment | 1 | Payment transactions |
| 8 | Inventory & Raw Material Tracking | 1 | Inventory change logs |
| 9 | Review System | 1 | Product reviews |
| 10 | Coupon & Discount Engine | 2 | Coupons and usage tracking |
| 11 | Design Consultation | 1 | Designer booking/consultation |
| 12 | EMI Calculator | 1 | EMI/installment plans |
| 13 | AI & Recommendation Support | 1 | User activity logs for recommendations |
| 14 | Analytics (Optional) | 1 | Daily sales summary |

---

## 1️⃣ USER & AUTH MODULE

### 🔹 `users`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Unique user identifier |
| `full_name` | VARCHAR | NOT NULL | User's full name |
| `email` | VARCHAR | **UNIQUE**, NOT NULL | Login email |
| `password_hash` | TEXT | NOT NULL | Hashed password (bcrypt/argon2) |
| `phone` | VARCHAR | — | Contact phone number |
| `role_id` | UUID | **FK → roles.id** | Assigned role |
| `is_verified` | BOOLEAN | DEFAULT false | Email verification status |
| `is_active` | BOOLEAN | DEFAULT true | Account active/deactivated |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Account creation time |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last profile update time |

**Relationships:**
- `role_id` → `roles.id` (Many-to-One)
- Referenced by: `vendors`, `designers`, `saved_designs`, `carts`, `orders`, `reviews`, `consultations`, `user_activity_logs`, `coupon_usage`, `user_addresses`, `password_resets`

---

### 🔹 `roles`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Unique role identifier |
| `name` | VARCHAR | NOT NULL, UNIQUE | Role name: Customer, Vendor, Admin, Designer |
| `description` | TEXT | — | Role description |

**Seed Data:** `Customer`, `Vendor`, `Admin`, `Designer`

---

### 🔹 `permissions`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Unique permission identifier |
| `name` | VARCHAR | NOT NULL | Permission name (e.g., `create_product`) |
| `module` | VARCHAR | NOT NULL | Module this permission belongs to |

---

### 🔹 `role_permissions` (Junction Table)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `role_id` | UUID | **FK → roles.id**, **Composite PK** | Role reference |
| `permission_id` | UUID | **FK → permissions.id**, **Composite PK** | Permission reference |

**Relationship:** Many-to-Many between `roles` and `permissions`

---

### 🔹 `user_addresses`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Address identifier |
| `user_id` | UUID | **FK → users.id** | Owner of this address |
| `address_line1` | VARCHAR | NOT NULL | Street address |
| `city` | VARCHAR | NOT NULL | City |
| `state` | VARCHAR | NOT NULL | State/Province |
| `pincode` | VARCHAR | NOT NULL | Postal/ZIP code |
| `country` | VARCHAR | NOT NULL | Country |
| `is_default` | BOOLEAN | DEFAULT false | Default shipping address |

---

### 🔹 `password_resets`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Reset request identifier |
| `user_id` | UUID | **FK → users.id** | User requesting reset |
| `token` | VARCHAR | NOT NULL, UNIQUE | Reset token (hashed) |
| `expires_at` | TIMESTAMP | NOT NULL | Token expiry time |

---

## 2️⃣ VENDOR & DESIGNER MODULE

### 🔹 `vendors`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Vendor profile identifier |
| `user_id` | UUID | **FK → users.id**, UNIQUE | Associated user account |
| `company_name` | VARCHAR | NOT NULL | Business/company name |
| `gst_number` | VARCHAR | — | GST registration number |
| `is_approved` | BOOLEAN | DEFAULT false | Admin approval status |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Profile creation time |

**Relationships:**
- `user_id` → `users.id` (One-to-One)
- Referenced by: `furniture_models`

---

### 🔹 `designers`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Designer profile identifier |
| `user_id` | UUID | **FK → users.id**, UNIQUE | Associated user account |
| `bio` | TEXT | — | Designer biography |
| `experience_years` | INT | — | Years of professional experience |
| `rating` | DECIMAL(3,2) | DEFAULT 0.00 | Average rating (0.00–5.00) |

**Relationships:**
- `user_id` → `users.id` (One-to-One)
- Referenced by: `consultations`

---

## 3️⃣ PRODUCT & CUSTOMIZATION ENGINE

### 🔹 `categories`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Category identifier |
| `name` | VARCHAR | NOT NULL | Category name (e.g., Sofa, Chair, Table) |
| `parent_id` | UUID | **FK → categories.id** (Self-ref) | Parent category for hierarchy |

**Note:** Self-referencing for nested category trees (e.g., Living Room → Sofas → L-Shaped)

---

### 🔹 `furniture_models`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Model identifier |
| `vendor_id` | UUID | **FK → vendors.id** | Vendor who listed this model |
| `category_id` | UUID | **FK → categories.id** | Product category |
| `name` | VARCHAR | NOT NULL | Model name |
| `base_price` | DECIMAL(12,2) | NOT NULL | Base price before customization |
| `base_image` | TEXT | — | URL/path to primary product image |
| `description` | TEXT | — | Product description |
| `is_active` | BOOLEAN | DEFAULT true | Listing active/inactive |

**Relationships:**
- Referenced by: `saved_designs`, `order_items`, `reviews`
- Connected to customization options via junction tables

---

### 🔹 `materials`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Material identifier |
| `name` | VARCHAR | NOT NULL | Material name (e.g., Teak, Oak, MDF) |
| `price_multiplier` | DECIMAL(5,2) | NOT NULL | Price multiplier (1.0 = base price) |
| `stock_quantity` | INT | DEFAULT 0 | Current stock level |

---

### 🔹 `colors`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Color identifier |
| `name` | VARCHAR | NOT NULL | Color name |
| `hex_code` | VARCHAR(7) | NOT NULL | Hex color code (e.g., `#FF5733`) |
| `price_modifier` | DECIMAL(10,2) | DEFAULT 0.00 | Additional price for this color |

---

### 🔹 `fabrics`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Fabric identifier |
| `name` | VARCHAR | NOT NULL | Fabric name (e.g., Velvet, Leather, Cotton) |
| `price_multiplier` | DECIMAL(5,2) | NOT NULL | Price multiplier |

---

### 🔹 `sizes`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Size variant identifier |
| `name` | VARCHAR | NOT NULL | Size label (e.g., Small, Medium, Large) |
| `width` | DECIMAL(8,2) | — | Width in cm/inches |
| `height` | DECIMAL(8,2) | — | Height in cm/inches |
| `depth` | DECIMAL(8,2) | — | Depth in cm/inches |
| `price_multiplier` | DECIMAL(5,2) | NOT NULL | Price multiplier |

---

### 🔹 `add_ons`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Add-on identifier |
| `name` | VARCHAR | NOT NULL | Add-on name (e.g., Cushion, Armrest Cover) |
| `price` | DECIMAL(10,2) | NOT NULL | Fixed additional price |

---

### 🔹 Model ↔ Options Junction Tables (Many-to-Many)

These tables define **which customization options are available for each furniture model**.

#### `model_materials`
| Column | Type | Constraints |
|--------|------|-------------|
| `model_id` | UUID | **FK → furniture_models.id**, Composite PK |
| `material_id` | UUID | **FK → materials.id**, Composite PK |

#### `model_colors`
| Column | Type | Constraints |
|--------|------|-------------|
| `model_id` | UUID | **FK → furniture_models.id**, Composite PK |
| `color_id` | UUID | **FK → colors.id**, Composite PK |

#### `model_fabrics`
| Column | Type | Constraints |
|--------|------|-------------|
| `model_id` | UUID | **FK → furniture_models.id**, Composite PK |
| `fabric_id` | UUID | **FK → fabrics.id**, Composite PK |

#### `model_sizes`
| Column | Type | Constraints |
|--------|------|-------------|
| `model_id` | UUID | **FK → furniture_models.id**, Composite PK |
| `size_id` | UUID | **FK → sizes.id**, Composite PK |

#### `model_addons`
| Column | Type | Constraints |
|--------|------|-------------|
| `model_id` | UUID | **FK → furniture_models.id**, Composite PK |
| `addon_id` | UUID | **FK → add_ons.id**, Composite PK |

> **⚡ Key Insight:** These junction tables are the backbone of the customization engine. When a user opens a product, the app queries these tables to determine what options (materials, colors, fabrics, sizes, add-ons) are available for that specific model.

---

## 4️⃣ CUSTOM DESIGN SAVING

### 🔹 `saved_designs`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Saved design identifier |
| `user_id` | UUID | **FK → users.id** | User who created this design |
| `model_id` | UUID | **FK → furniture_models.id** | Base furniture model |
| `selected_material` | UUID | **FK → materials.id** | Chosen material |
| `selected_color` | UUID | **FK → colors.id** | Chosen color |
| `selected_fabric` | UUID | **FK → fabrics.id** | Chosen fabric |
| `selected_size` | UUID | **FK → sizes.id** | Chosen size |
| `selected_addons` | JSON | — | Array of selected add-on UUIDs |
| `calculated_price` | DECIMAL(12,2) | NOT NULL | Final calculated price |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Design save time |

**Price Calculation Formula:**
```
calculated_price = base_price 
  × material.price_multiplier 
  × fabric.price_multiplier 
  × size.price_multiplier 
  + color.price_modifier 
  + SUM(selected_addons.price)
```

---

## 5️⃣ CART MODULE

### 🔹 `carts`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Cart identifier |
| `user_id` | UUID | **FK → users.id**, UNIQUE | One cart per user |

### 🔹 `cart_items`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Cart item identifier |
| `cart_id` | UUID | **FK → carts.id** | Parent cart |
| `saved_design_id` | UUID | **FK → saved_designs.id** | The customized design |
| `quantity` | INT | NOT NULL, DEFAULT 1 | Number of items |

> **Flow:** User customizes a product → Saves design → Adds saved design to cart → Proceeds to checkout

---

## 6️⃣ ORDER MODULE

### 🔹 `orders`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Order identifier |
| `user_id` | UUID | **FK → users.id** | Ordering user |
| `total_amount` | DECIMAL(12,2) | NOT NULL | Subtotal before tax/discount |
| `tax_amount` | DECIMAL(10,2) | DEFAULT 0.00 | Tax applied |
| `discount_amount` | DECIMAL(10,2) | DEFAULT 0.00 | Discount applied |
| `final_amount` | DECIMAL(12,2) | NOT NULL | Final payable amount |
| `status` | VARCHAR | NOT NULL | Order status (see statuses below) |
| `payment_status` | VARCHAR | NOT NULL | Payment status |
| `address_id` | UUID | **FK → user_addresses.id** | Delivery address |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Order placement time |

**Order Statuses:** `Pending → Confirmed → Manufacturing → Shipped → Delivered → Cancelled → Returned`  
**Payment Statuses:** `Pending → Paid → Failed → Refunded`

---

### 🔹 `order_items`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Order item identifier |
| `order_id` | UUID | **FK → orders.id** | Parent order |
| `model_id` | UUID | **FK → furniture_models.id** | Furniture model |
| `customization_snapshot` | JSON | NOT NULL | Frozen copy of all customization details |
| `quantity` | INT | NOT NULL | Item quantity |
| `unit_price` | DECIMAL(12,2) | NOT NULL | Price per unit at order time |
| `total_price` | DECIMAL(12,2) | NOT NULL | quantity × unit_price |

> **⚡ `customization_snapshot`** stores a frozen copy of the design at order time. This ensures order integrity even if materials/colors/prices change later.

---

### 🔹 `order_status_history`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | History entry identifier |
| `order_id` | UUID | **FK → orders.id** | Parent order |
| `status` | VARCHAR | NOT NULL | Status at this point |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | When status changed |

---

## 7️⃣ PAYMENT MODULE

### 🔹 `payments`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Payment identifier |
| `order_id` | UUID | **FK → orders.id** | Associated order |
| `payment_method` | VARCHAR | NOT NULL | Method: UPI, Card, Net Banking, COD |
| `transaction_id` | VARCHAR | UNIQUE | Gateway transaction ID (Razorpay/Stripe) |
| `amount` | DECIMAL(12,2) | NOT NULL | Amount paid |
| `status` | VARCHAR | NOT NULL | Success / Failed / Pending / Refunded |
| `paid_at` | TIMESTAMP | — | Payment timestamp |

---

## 8️⃣ INVENTORY & RAW MATERIAL TRACKING

### 🔹 `inventory_logs`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Log entry identifier |
| `material_id` | UUID | **FK → materials.id** | Material being tracked |
| `change_type` | VARCHAR | NOT NULL | `IN` (restock) or `OUT` (consumed) |
| `quantity` | INT | NOT NULL | Quantity changed |
| `reference_id` | UUID | — | Reference to order/purchase that caused this change |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Log timestamp |

> **Logic:** When an order is placed, create `OUT` entries. When vendor restocks, create `IN` entries. `materials.stock_quantity` should be updated accordingly.

---

## 9️⃣ REVIEW SYSTEM

### 🔹 `reviews`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Review identifier |
| `user_id` | UUID | **FK → users.id** | Reviewer |
| `model_id` | UUID | **FK → furniture_models.id** | Reviewed product |
| `rating` | INT | NOT NULL, CHECK (1–5) | Star rating |
| `comment` | TEXT | — | Review text |
| `is_approved` | BOOLEAN | DEFAULT false | Admin moderation flag |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Review time |

---

## 🔟 COUPON & DISCOUNT ENGINE

### 🔹 `coupons`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Coupon identifier |
| `code` | VARCHAR | UNIQUE, NOT NULL | Coupon code (e.g., `SAVE20`) |
| `discount_type` | VARCHAR | NOT NULL | `percentage` or `fixed` |
| `value` | DECIMAL(10,2) | NOT NULL | Discount value |
| `max_discount` | DECIMAL(10,2) | — | Cap for percentage discounts |
| `min_order_value` | DECIMAL(10,2) | — | Minimum order to apply coupon |
| `expiry_date` | TIMESTAMP | NOT NULL | Coupon expiry |
| `usage_limit` | INT | — | Max total uses allowed |

### 🔹 `coupon_usage`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Usage record identifier |
| `coupon_id` | UUID | **FK → coupons.id** | Coupon used |
| `user_id` | UUID | **FK → users.id** | User who used it |
| `order_id` | UUID | **FK → orders.id** | Order it was applied to |

---

## 1️⃣1️⃣ DESIGN CONSULTATION

### 🔹 `consultations`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Consultation identifier |
| `user_id` | UUID | **FK → users.id** | Customer requesting consultation |
| `designer_id` | UUID | **FK → designers.id** | Assigned designer |
| `booking_date` | TIMESTAMP | NOT NULL | Scheduled date/time |
| `status` | VARCHAR | NOT NULL | `Requested → Accepted → Completed → Cancelled` |
| `notes` | TEXT | — | Consultation notes/requirements |

---

## 1️⃣2️⃣ EMI CALCULATOR

### 🔹 `emi_plans`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Plan identifier |
| `bank_name` | VARCHAR | NOT NULL | Bank/provider name |
| `interest_rate` | DECIMAL(5,2) | NOT NULL | Annual interest rate (%) |
| `tenure_months` | INT | NOT NULL | Loan tenure in months |

**EMI Formula:**
```
EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]
Where: P = Principal, R = Monthly Rate, N = Tenure (months)
```

---

## 1️⃣3️⃣ AI & RECOMMENDATION SUPPORT

### 🔹 `user_activity_logs`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | **PK** | Log identifier |
| `user_id` | UUID | **FK → users.id** | User performing the action |
| `action_type` | VARCHAR | NOT NULL | Action type (see below) |
| `reference_id` | UUID | — | Reference to the entity acted upon |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Action timestamp |

**Action Types:** `VIEW_PRODUCT`, `ADD_TO_CART`, `PURCHASE`, `SAVE_DESIGN`, `SEARCH`, `APPLY_FILTER`

> **Usage:** Feed this data to a recommendation engine to suggest products based on browsing history, purchase patterns, and similar user profiles.

---

## 1️⃣4️⃣ ANALYTICS TABLES (Optional)

### 🔹 `daily_sales_summary`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `date` | DATE | **PK** | Summary date |
| `total_orders` | INT | DEFAULT 0 | Orders placed on this date |
| `total_revenue` | DECIMAL(14,2) | DEFAULT 0.00 | Revenue earned on this date |

> **Note:** This is a materialized/pre-computed table for dashboard performance. Can be populated by a daily cron job aggregating from `orders`.

---

## 🔗 Entity Relationship Summary

```
users ─┬── vendors ──── furniture_models ──┬── model_materials ── materials
       │                                    ├── model_colors ── colors
       ├── designers ── consultations       ├── model_fabrics ── fabrics
       │                                    ├── model_sizes ── sizes
       ├── user_addresses                   └── model_addons ── add_ons
       │
       ├── saved_designs ── cart_items ── carts
       │
       ├── orders ──┬── order_items
       │            ├── order_status_history
       │            ├── payments
       │            └── coupon_usage ── coupons
       │
       ├── reviews
       └── user_activity_logs

roles ── role_permissions ── permissions
materials ── inventory_logs
```

---

## 🧮 Key Business Logic Notes

### Price Calculation Flow
1. User selects a `furniture_model` → gets `base_price`
2. Selects material → multiply by `material.price_multiplier`
3. Selects fabric → multiply by `fabric.price_multiplier`
4. Selects size → multiply by `size.price_multiplier`
5. Selects color → add `color.price_modifier`
6. Selects add-ons → add `SUM(addon.price)`
7. Result = `saved_designs.calculated_price`

### Order Flow
```
Customize → Save Design → Add to Cart → Checkout → Order Created → Payment → Manufacturing → Shipping → Delivered
```

### Inventory Flow
```
Order Placed → Deduct materials (OUT) → Low Stock Alert → Vendor Restocks (IN)
```

### RBAC (Role-Based Access Control)
```
Admin:     Full system access
Vendor:    Manage own products, view orders for own products
Designer:  Manage consultations, view client designs
Customer:  Browse, customize, order, review
```
