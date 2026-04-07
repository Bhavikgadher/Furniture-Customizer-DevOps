--
-- PostgreSQL database dump
--

-- Dumped from database version 18.2 (Debian 18.2-1.pgdg13+1)
-- Dumped by pg_dump version 18.2 (Debian 18.2-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';

SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: enum_consultations_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_consultations_status AS ENUM (
    'pending',
    'confirmed',
    'completed',
    'cancelled'
);


ALTER TYPE public.enum_consultations_status OWNER TO postgres;

--
-- Name: enum_coupons_discount_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_coupons_discount_type AS ENUM (
    'percentage',
    'fixed'
);


ALTER TYPE public.enum_coupons_discount_type OWNER TO postgres;

--
-- Name: enum_inventory_logs_change_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_inventory_logs_change_type AS ENUM (
    'IN',
    'OUT'
);


ALTER TYPE public.enum_inventory_logs_change_type OWNER TO postgres;

--
-- Name: enum_orders_payment_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_orders_payment_status AS ENUM (
    'pending',
    'paid',
    'failed',
    'refunded'
);


ALTER TYPE public.enum_orders_payment_status OWNER TO postgres;

--
-- Name: enum_orders_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_orders_status AS ENUM (
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
);


ALTER TYPE public.enum_orders_status OWNER TO postgres;

--
-- Name: enum_payments_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_payments_status AS ENUM (
    'pending',
    'paid',
    'failed',
    'refunded'
);


ALTER TYPE public.enum_payments_status OWNER TO postgres;

--
-- Name: update_timestamp(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_timestamp() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: add_ons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.add_ons (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100),
    price numeric(10,2),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT add_ons_price_check CHECK ((price >= (0)::numeric))
);


ALTER TABLE public.add_ons OWNER TO postgres;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    cart_id uuid NOT NULL,
    saved_design_id uuid NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT cart_items_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(150) NOT NULL,
    parent_id uuid,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT categories_check CHECK ((id <> parent_id))
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colors (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    hex_code character varying(7),
    price_modifier numeric(10,2) DEFAULT 0,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.colors OWNER TO postgres;

--
-- Name: consultations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consultations (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    designer_id uuid NOT NULL,
    scheduled_at timestamp with time zone,
    notes text,
    status public.enum_consultations_status DEFAULT 'pending'::public.enum_consultations_status,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.consultations OWNER TO postgres;

--
-- Name: coupon_usage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coupon_usage (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    coupon_id uuid,
    user_id uuid,
    order_id uuid
);


ALTER TABLE public.coupon_usage OWNER TO postgres;

--
-- Name: coupons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coupons (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    code character varying(50) NOT NULL,
    value numeric(10,2) NOT NULL,
    max_discount numeric(10,2),
    min_order_value numeric(10,2),
    expiry_date timestamp with time zone,
    usage_limit integer,
    created_at timestamp with time zone NOT NULL,
    discount_type public.enum_coupons_discount_type DEFAULT 'percentage'::public.enum_coupons_discount_type NOT NULL,
    CONSTRAINT coupons_max_discount_check CHECK ((max_discount >= (0)::numeric)),
    CONSTRAINT coupons_min_order_value_check CHECK ((min_order_value >= (0)::numeric)),
    CONSTRAINT coupons_usage_limit_check CHECK ((usage_limit >= 0)),
    CONSTRAINT coupons_value_check CHECK ((value >= (0)::numeric))
);


ALTER TABLE public.coupons OWNER TO postgres;

--
-- Name: designers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.designers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    bio text,
    experience_years integer,
    rating numeric(2,1) DEFAULT 0,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT designers_experience_years_check CHECK ((experience_years >= 0)),
    CONSTRAINT designers_rating_check CHECK (((rating >= (0)::numeric) AND (rating <= (5)::numeric)))
);


ALTER TABLE public.designers OWNER TO postgres;

--
-- Name: fabrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fabrics (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    price_multiplier numeric(5,2) DEFAULT 1,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.fabrics OWNER TO postgres;

--
-- Name: furniture_models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.furniture_models (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    vendor_id uuid NOT NULL,
    category_id uuid NOT NULL,
    name character varying(150) NOT NULL,
    base_price numeric(12,2) NOT NULL,
    base_image text,
    description text,
    is_active boolean DEFAULT true,
    deleted_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    CONSTRAINT furniture_models_base_price_check CHECK ((base_price >= (0)::numeric))
);


ALTER TABLE public.furniture_models OWNER TO postgres;

--
-- Name: inventory_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    material_id uuid NOT NULL,
    quantity integer NOT NULL,
    reference_id uuid,
    created_at timestamp with time zone NOT NULL,
    change_type public.enum_inventory_logs_change_type DEFAULT 'IN'::public.enum_inventory_logs_change_type NOT NULL,
    CONSTRAINT inventory_logs_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.inventory_logs OWNER TO postgres;

--
-- Name: materials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.materials (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    price_multiplier numeric(5,2) DEFAULT 1,
    stock_quantity integer DEFAULT 0,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT materials_price_multiplier_check CHECK ((price_multiplier >= (0)::numeric)),
    CONSTRAINT materials_stock_quantity_check CHECK ((stock_quantity >= 0))
);


ALTER TABLE public.materials OWNER TO postgres;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    type character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    reference_id uuid,
    reference_type character varying(50),
    is_read boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    order_id uuid NOT NULL,
    model_id uuid NOT NULL,
    snapshot_data jsonb NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric(12,2) NOT NULL,
    total_price numeric(12,2) NOT NULL,
    CONSTRAINT order_items_quantity_check CHECK ((quantity > 0)),
    CONSTRAINT order_items_total_price_check CHECK ((total_price >= (0)::numeric)),
    CONSTRAINT order_items_unit_price_check CHECK ((unit_price >= (0)::numeric))
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    total_amount numeric(12,2) NOT NULL,
    tax_amount numeric(12,2) DEFAULT 0 NOT NULL,
    discount_amount numeric(12,2) DEFAULT 0 NOT NULL,
    final_amount numeric(12,2) NOT NULL,
    address_id uuid,
    created_at timestamp with time zone NOT NULL,
    status public.enum_orders_status DEFAULT 'pending'::public.enum_orders_status NOT NULL,
    payment_status public.enum_orders_payment_status DEFAULT 'pending'::public.enum_orders_payment_status NOT NULL,
    CONSTRAINT orders_check CHECK ((final_amount = ((total_amount + tax_amount) - discount_amount))),
    CONSTRAINT orders_discount_amount_check CHECK ((discount_amount >= (0)::numeric)),
    CONSTRAINT orders_final_amount_check CHECK ((final_amount >= (0)::numeric)),
    CONSTRAINT orders_tax_amount_check CHECK ((tax_amount >= (0)::numeric)),
    CONSTRAINT orders_total_amount_check CHECK ((total_amount >= (0)::numeric))
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: password_resets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_resets (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    token character varying(255) NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.password_resets OWNER TO postgres;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    order_id uuid NOT NULL,
    payment_method character varying(50),
    transaction_id character varying(255),
    amount numeric(12,2),
    paid_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    status public.enum_payments_status DEFAULT 'pending'::public.enum_payments_status NOT NULL,
    CONSTRAINT payments_amount_check CHECK ((amount >= (0)::numeric))
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    module character varying(100) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token character varying(500) NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    is_revoked boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.refresh_tokens OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    model_id uuid NOT NULL,
    rating integer,
    comment text,
    is_approved boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permissions (
    role_id uuid NOT NULL,
    permission_id uuid NOT NULL
);


ALTER TABLE public.role_permissions OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: saved_design_addons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_design_addons (
    saved_design_id uuid NOT NULL,
    addon_id uuid NOT NULL
);


ALTER TABLE public.saved_design_addons OWNER TO postgres;

--
-- Name: saved_designs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_designs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    model_id uuid NOT NULL,
    selected_material uuid,
    selected_color uuid,
    selected_fabric uuid,
    selected_size uuid,
    calculated_price numeric(12,2),
    created_at timestamp with time zone NOT NULL,
    CONSTRAINT saved_designs_calculated_price_check CHECK ((calculated_price >= (0)::numeric))
);


ALTER TABLE public.saved_designs OWNER TO postgres;

--
-- Name: sizes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sizes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100),
    width numeric(10,2),
    height numeric(10,2),
    depth numeric(10,2),
    price_multiplier numeric(5,2) DEFAULT 1,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.sizes OWNER TO postgres;

--
-- Name: user_addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_addresses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    address_line1 character varying(255) NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(100) NOT NULL,
    pincode character varying(20) NOT NULL,
    country character varying(100) NOT NULL,
    is_default boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_addresses OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    full_name character varying(150) NOT NULL,
    email public.citext NOT NULL,
    password_hash text NOT NULL,
    phone character varying(20),
    role_id uuid NOT NULL,
    is_verified boolean DEFAULT false,
    is_active boolean DEFAULT true,
    deleted_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT users_email_check CHECK (((email)::text = lower((email)::text)))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: vendors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendors (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    company_name character varying(150) NOT NULL,
    gst_number character varying(50),
    is_approved boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.vendors OWNER TO postgres;

--
-- Name: wishlist_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wishlist_items (
    id uuid NOT NULL,
    wishlist_id uuid NOT NULL,
    model_id uuid NOT NULL,
    added_at timestamp with time zone
);


ALTER TABLE public.wishlist_items OWNER TO postgres;

--
-- Name: wishlists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wishlists (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.wishlists OWNER TO postgres;

--
-- Data for Name: add_ons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.add_ons (id, name, price, created_at, updated_at) FROM stdin;
b51b23df-fb91-42a1-9712-03746e5caf4b	LED Lighting	1000.00	2026-03-08 14:59:58.537544+00	2026-03-08 14:59:58.537544+00
ecdcd8ed-0b3e-48d8-a478-6bfbf14cdc64	Premium Polish	800.00	2026-03-08 14:59:58.537544+00	2026-03-08 14:59:58.537544+00
89ed9b2f-2e47-4066-adaa-50f71b083638	Extra Cushion	500.00	2026-03-08 14:59:58.537544+00	2026-03-08 14:59:58.537544+00
281e3557-2ce1-49fb-a9e5-56b912616e4e	Cup Holder	800.00	2026-03-29 06:58:58.058+00	2026-03-29 06:58:58.058+00
5f12f18d-effd-4586-b54b-2731365a44bc	USB Charging Port	1500.00	2026-03-29 06:58:58.065+00	2026-03-29 06:58:58.065+00
899f66f7-5f49-4b91-97bb-525fa308d502	Storage Drawer	2500.00	2026-03-29 06:58:58.071+00	2026-03-29 06:58:58.071+00
5553d0ad-c3bd-48f1-a554-e4b5c147a556	Recliner Mechanism	5000.00	2026-03-29 06:58:58.078+00	2026-03-29 06:58:58.078+00
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, cart_id, saved_design_id, quantity) FROM stdin;
ef2a265f-e8f7-40e0-843d-5ce36c172204	05741e61-6024-4ca9-a082-29ea92435d83	bc57fa04-abaf-4c9f-a746-ceb0718889f8	1
7ba579fa-06cc-467b-b4c3-b5b4f4e90aef	bdf7653b-f692-48a4-9ec1-982329676382	c2e0d0bd-4ee7-4479-a560-b998b4fb1f3d	1
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, user_id, created_at) FROM stdin;
05741e61-6024-4ca9-a082-29ea92435d83	cee15171-3be6-4052-8b36-d9387b38f9f8	2026-03-08 15:03:57.807804+00
3086f6dd-69a5-415d-88c2-0775df9c8889	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	2026-03-29 06:24:16.47+00
bdf7653b-f692-48a4-9ec1-982329676382	10452348-5b3f-4def-87d3-91cfd481e10b	2026-04-04 03:34:18.104+00
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, parent_id, created_at, updated_at) FROM stdin;
06aba9ad-4c20-4083-a567-00ff4c826b2e	Seating	\N	2026-03-08 14:34:22.558581+00	2026-03-08 14:34:22.558581+00
a4f53d78-07fb-467d-a46f-8ef6a6508fd1	Tables	\N	2026-03-08 14:34:22.558581+00	2026-03-08 14:34:22.558581+00
d05b40d0-3bbe-40ee-b2eb-61592a98340a	Sofas	06aba9ad-4c20-4083-a567-00ff4c826b2e	2026-03-08 14:35:08.747524+00	2026-03-08 14:35:08.747524+00
57723c5d-da70-411e-9acc-d3f60993713f	Dining Tables	a4f53d78-07fb-467d-a46f-8ef6a6508fd1	2026-03-08 14:35:08.747524+00	2026-03-08 14:35:08.747524+00
6b3de004-84a6-4293-a02d-009a354b50b1	Sofa	\N	2026-03-08 14:56:39.430666+00	2026-03-08 14:56:39.430666+00
a8ad5412-bc0c-4a77-a798-96ec0a65c3f9	Chair	\N	2026-03-08 14:56:39.430666+00	2026-03-08 14:56:39.430666+00
70d2ef65-0ebf-469a-93d1-949d0830b250	Table	\N	2026-03-08 14:56:39.430666+00	2026-03-08 14:56:39.430666+00
9e341afd-7264-446f-84e2-452179beaabb	Bed	\N	2026-03-08 14:56:39.430666+00	2026-03-08 14:56:39.430666+00
a2331bed-871c-4953-8ea1-72a5676b2b4c	Office Chair	a8ad5412-bc0c-4a77-a798-96ec0a65c3f9	2026-03-08 14:56:44.175333+00	2026-03-08 14:56:44.175333+00
40fa2821-3e64-4807-949c-be99930ab5a3	Dining Table	70d2ef65-0ebf-469a-93d1-949d0830b250	2026-03-08 14:56:44.175333+00	2026-03-08 14:56:44.175333+00
bbac3ce4-b011-485f-85d2-817154f78c39	Sofas & Sectionals	\N	2026-03-29 06:58:57.882+00	2026-03-29 06:58:57.882+00
4b479cdf-5193-4b68-ae79-b332ecb9af78	Beds & Bedroom	\N	2026-03-29 06:58:57.889+00	2026-03-29 06:58:57.889+00
9260041e-b6f7-4de3-93e8-3d77241c5ee5	Office Furniture	\N	2026-03-29 06:58:57.9+00	2026-03-29 06:58:57.9+00
d3c87a29-f289-406c-8bbd-89ec88d12b81	Storage & Wardrobes	\N	2026-03-29 06:58:57.906+00	2026-03-29 06:58:57.906+00
\.


--
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colors (id, name, hex_code, price_modifier, created_at, updated_at) FROM stdin;
453284be-ea1a-4d73-bc63-716d8d379295	Red	#FF0000	50.00	2026-03-08 14:58:12.489261+00	2026-03-08 14:58:12.489261+00
9b2364d3-311b-43b2-ad98-376d92f277c1	Blue	#0000FF	30.00	2026-03-08 14:58:12.489261+00	2026-03-08 14:58:12.489261+00
398c2353-b0f3-48f1-8d67-a1658cc05206	Black	#000000	40.00	2026-03-08 14:58:12.489261+00	2026-03-08 14:58:12.489261+00
acb67905-ea2a-41a1-94cd-ed3dae2bb5fe	Walnut Brown	#5C4033	0.00	2026-03-29 06:58:57.95+00	2026-03-29 06:58:57.95+00
4555a375-4a58-4ff9-87b9-891676233428	Ivory White	#FFFFF0	500.00	2026-03-29 06:58:57.958+00	2026-03-29 06:58:57.958+00
acadd1fe-817d-474f-b0a6-37308df1b82e	Charcoal Grey	#36454F	300.00	2026-03-29 06:58:57.966+00	2026-03-29 06:58:57.966+00
3a8a0680-0ee3-4afa-aad5-b70f054792be	Mahogany Red	#C04000	800.00	2026-03-29 06:58:57.972+00	2026-03-29 06:58:57.972+00
e1bccd23-1bd5-43e0-851d-e22afe941169	Natural Oak	#D2B48C	200.00	2026-03-29 06:58:57.981+00	2026-03-29 06:58:57.981+00
\.


--
-- Data for Name: consultations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.consultations (id, user_id, designer_id, scheduled_at, notes, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: coupon_usage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coupon_usage (id, coupon_id, user_id, order_id) FROM stdin;
\.


--
-- Data for Name: coupons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coupons (id, code, value, max_discount, min_order_value, expiry_date, usage_limit, created_at, discount_type) FROM stdin;
e62ab062-3b95-4dc9-b3f0-69c8b11004cc	FESTIVE25	25.00	\N	\N	2026-12-31 00:00:00+00	200	2026-03-10 14:36:25.916+00	percentage
\.


--
-- Data for Name: designers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.designers (id, user_id, bio, experience_years, rating, created_at, updated_at) FROM stdin;
7e252a61-f35c-4feb-bacc-519bc79bfb6d	b1e9124a-a9c1-4b34-be28-51c2c3f09ae7	Expert furniture designer	5	4.5	2026-03-08 14:54:30.95563+00	2026-03-08 14:54:30.95563+00
92f31a8d-a60f-4879-a1b5-c73887c1f4e7	333279ae-b9a2-43ca-bd20-9ae0b409f1b2	Interior designer with 8 years of experience in modern and contemporary furniture design.	8	4.7	2026-03-29 06:58:57.872+00	2026-03-29 06:58:57.872+00
\.


--
-- Data for Name: fabrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fabrics (id, name, price_multiplier, created_at, updated_at) FROM stdin;
723e6acb-8457-4fa8-9762-01bde50ff4c4	Cotton	1.10	2026-03-08 14:58:48.991441+00	2026-03-08 14:58:48.991441+00
c170f08f-51d9-46f0-bd56-3675c0ddb42a	Leather	1.50	2026-03-08 14:58:48.991441+00	2026-03-08 14:58:48.991441+00
45705eff-e026-4215-9b7c-2a2b1ea9ae4a	Velvet	1.40	2026-03-08 14:58:48.991441+00	2026-03-08 14:58:48.991441+00
8752fa86-b507-42e4-b3cc-da318ae0a2b1	Premium Velvet	1.40	2026-03-29 06:58:57.988+00	2026-03-29 06:58:57.988+00
7f32bbd3-7dab-4090-9850-c1cd312a58b2	Linen	1.10	2026-03-29 06:58:57.995+00	2026-03-29 06:58:57.995+00
3a049e4f-e432-4f4d-a921-18eb94d15ac1	Cotton Blend	1.00	2026-03-29 06:58:58.005+00	2026-03-29 06:58:58.005+00
77a62c5b-d453-423b-a153-eb59713e8bac	Microfiber	1.20	2026-03-29 06:58:58.013+00	2026-03-29 06:58:58.013+00
\.


--
-- Data for Name: furniture_models; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.furniture_models (id, vendor_id, category_id, name, base_price, base_image, description, is_active, deleted_at, created_at) FROM stdin;
09c32132-ea6e-4ad2-98bd-931af3a65df8	63c8e9e8-a426-4df7-8003-b2b8c28bac5a	6b3de004-84a6-4293-a02d-009a354b50b1	Modern Sofa	15000.00	\N	Luxury modern sofa	t	2026-03-18 17:04:43.042+00	2026-03-08 15:01:00.987871+00
d5806418-20cc-4dd5-8d6b-cfd478ebe328	63c8e9e8-a426-4df7-8003-b2b8c28bac5a	a8ad5412-bc0c-4a77-a798-96ec0a65c3f9	Office Chair Pro	5000.00	\N	Ergonomic office chair	t	2026-03-18 17:07:13.525+00	2026-03-08 15:01:00.987871+00
334b3df4-e02a-481c-bc47-fd69f370bebb	63c8e9e8-a426-4df7-8003-b2b8c28bac5a	40fa2821-3e64-4807-949c-be99930ab5a3	aa	1200.00	\N	\N	t	2026-03-18 17:39:37.292+00	2026-03-11 18:07:54.812+00
b2a92160-970f-4f51-9906-f76ac2385f53	63c8e9e8-a426-4df7-8003-b2b8c28bac5a	a4f53d78-07fb-467d-a46f-8ef6a6508fd1	computer table 111	15000.00	\N	\N	f	2026-03-18 17:41:23.583+00	2026-03-11 18:53:49.207+00
aefb7c3f-b1ac-4188-8976-c5bc8ac89faf	63c8e9e8-a426-4df7-8003-b2b8c28bac5a	9e341afd-7264-446f-84e2-452179beaabb	gggg	999.00	\N	\N	f	2026-03-26 17:38:14.299+00	2026-03-26 17:34:45.146+00
f9566273-2156-4be9-9410-3ee3c9d57d3b	8fb17fc3-9a91-4541-a543-3873f2d82cd8	bbac3ce4-b011-485f-85d2-817154f78c39	Royal Teak Sofa	35000.00	\N	Handcrafted teak wood sofa with premium velvet upholstery. Perfect for living rooms.	t	\N	2026-03-29 06:58:58.089+00
08cd010c-5132-4231-9c25-5295c73bf73a	8fb17fc3-9a91-4541-a543-3873f2d82cd8	bbac3ce4-b011-485f-85d2-817154f78c39	Luxe L-Shape Sectional	65000.00	\N	Spacious L-shaped sectional sofa ideal for large living spaces.	t	\N	2026-03-29 06:58:58.096+00
5d98c988-3458-4a2a-b5b3-16e5a1be815c	8fb17fc3-9a91-4541-a543-3873f2d82cd8	4b479cdf-5193-4b68-ae79-b332ecb9af78	Sheesham King Bed	45000.00	\N	Solid sheesham wood king size bed with storage headboard.	t	\N	2026-03-29 06:58:58.104+00
b66ea970-8e5f-4d8f-896f-5099c40924bd	6db63f50-c280-465a-94a8-b818dba09f73	4b479cdf-5193-4b68-ae79-b332ecb9af78	Modern Platform Bed	28000.00	\N	Minimalist platform bed with clean lines and sturdy MDF construction.	t	\N	2026-03-29 06:58:58.111+00
99b00ed4-9800-477d-b73c-d94801348700	6db63f50-c280-465a-94a8-b818dba09f73	57723c5d-da70-411e-9acc-d3f60993713f	Extendable Dining Table	22000.00	\N	6-seater extendable dining table in teak finish. Extends to seat 8.	t	\N	2026-03-29 06:58:58.119+00
2a98c98e-c05a-4897-92bd-3240f91dda11	6db63f50-c280-465a-94a8-b818dba09f73	57723c5d-da70-411e-9acc-d3f60993713f	Round Glass Dining Table	18000.00	\N	Contemporary round dining table with tempered glass top and metal legs.	t	\N	2026-03-29 06:58:58.126+00
28b1189a-4adc-4a20-a8d8-a69fcc7a3dc5	8fb17fc3-9a91-4541-a543-3873f2d82cd8	9260041e-b6f7-4de3-93e8-3d77241c5ee5	Ergonomic Office Chair	12000.00	\N	High-back ergonomic office chair with lumbar support and adjustable armrests.	t	\N	2026-03-29 06:58:58.133+00
2c0c4d9a-2440-4ed8-a96e-bce14431f0cb	6db63f50-c280-465a-94a8-b818dba09f73	9260041e-b6f7-4de3-93e8-3d77241c5ee5	Executive Office Desk	25000.00	\N	Large executive desk with cable management and built-in storage.	t	\N	2026-03-29 06:58:58.14+00
1e152394-1f42-40d0-9a5f-d7f6ea322f07	8fb17fc3-9a91-4541-a543-3873f2d82cd8	d3c87a29-f289-406c-8bbd-89ec88d12b81	4-Door Wardrobe	38000.00	\N	Spacious 4-door wardrobe with mirror, shelves and hanging space.	t	\N	2026-03-29 06:58:58.148+00
9b553376-ed8a-4953-b3cd-4d549511e109	6db63f50-c280-465a-94a8-b818dba09f73	d3c87a29-f289-406c-8bbd-89ec88d12b81	Sliding Door Wardrobe	42000.00	\N	Modern sliding door wardrobe with soft-close mechanism.	t	\N	2026-03-29 06:58:58.154+00
\.


--
-- Data for Name: inventory_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_logs (id, material_id, quantity, reference_id, created_at, change_type) FROM stdin;
9d9bc0f7-036d-4f75-8151-ff653b5b944f	5cf43dad-1129-4910-9060-bc7f461d1189	100	\N	2026-03-08 15:10:45.332017+00	IN
\.


--
-- Data for Name: materials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.materials (id, name, price_multiplier, stock_quantity, created_at, updated_at) FROM stdin;
5cf43dad-1129-4910-9060-bc7f461d1189	Wood	1.20	200	2026-03-08 14:57:27.858631+00	2026-03-08 14:57:27.858631+00
0ed9f83b-3516-4f57-b739-0c486789b67c	Steel	1.50	150	2026-03-08 14:57:27.858631+00	2026-03-08 14:57:27.858631+00
ecd33f85-ad25-4981-8928-ba4560f482a2	Plastic	1.00	500	2026-03-08 14:57:27.858631+00	2026-03-08 14:57:27.858631+00
bbe96440-2f32-4ffb-9ecf-0fe57ec148b3	Teak Wood	1.80	200	2026-03-29 06:58:57.913+00	2026-03-29 06:58:57.913+00
478587af-cad9-4952-9a5a-e009da11bcfa	Sheesham Wood	1.50	150	2026-03-29 06:58:57.92+00	2026-03-29 06:58:57.92+00
82f57145-28af-4073-8c9f-2a79a8478882	MDF Board	1.00	500	2026-03-29 06:58:57.927+00	2026-03-29 06:58:57.927+00
422b8a64-381f-46ac-ad61-6153fa1856e0	Plywood	1.20	300	2026-03-29 06:58:57.935+00	2026-03-29 06:58:57.935+00
c38a6bd4-9bf1-4ddf-8749-2002b5479d12	Metal Frame	1.30	250	2026-03-29 06:58:57.94+00	2026-03-29 06:58:57.94+00
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, user_id, type, title, message, reference_id, reference_type, is_read, created_at) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, model_id, snapshot_data, quantity, unit_price, total_price) FROM stdin;
04f9bcdd-988f-4903-abee-a34bd6f73958	7fe15799-3ff9-47ef-adee-e2e7bb6ad55e	09c32132-ea6e-4ad2-98bd-931af3a65df8	{"color": "Black", "model": "Modern Sofa", "material": "Wood"}	1	20000.00	20000.00
b1974354-45be-498b-bcb6-ea05cdd50438	6e1f02dc-7cd7-4d57-9c70-041a5e819cef	2a98c98e-c05a-4897-92bd-3240f91dda11	{"size": "a028ad90-a0ba-4f40-99a7-403eccfd2199", "color": "453284be-ea1a-4d73-bc63-716d8d379295", "fabric": "723e6acb-8457-4fa8-9762-01bde50ff4c4", "material": "5cf43dad-1129-4910-9060-bc7f461d1189", "design_id": "9c0abf6f-8647-4675-b4a8-9954977d52bc"}	3	23810.00	71430.00
38e8eb30-8cb1-4280-9c3d-cc62d25d9b16	6e1f02dc-7cd7-4d57-9c70-041a5e819cef	2c0c4d9a-2440-4ed8-a96e-bce14431f0cb	{"size": "a028ad90-a0ba-4f40-99a7-403eccfd2199", "color": "453284be-ea1a-4d73-bc63-716d8d379295", "fabric": "723e6acb-8457-4fa8-9762-01bde50ff4c4", "material": "5cf43dad-1129-4910-9060-bc7f461d1189", "design_id": "527e6f31-9843-49a1-8ea1-1b4e6c4e6627"}	1	33050.00	33050.00
d2af30a1-eb44-4ef8-9d3e-9b4549d02a19	81ba12ba-2055-4a64-bf96-f05a4f9459c7	2c0c4d9a-2440-4ed8-a96e-bce14431f0cb	{"size": "a028ad90-a0ba-4f40-99a7-403eccfd2199", "color": "453284be-ea1a-4d73-bc63-716d8d379295", "fabric": "723e6acb-8457-4fa8-9762-01bde50ff4c4", "material": "5cf43dad-1129-4910-9060-bc7f461d1189", "design_id": "d97e905c-43a6-4c43-ad45-e9122967a663"}	1	33050.00	33050.00
5c98975f-dfa9-4c81-87e0-feb374d7ebfe	5b0a7974-4d4b-49fe-9645-99e07108889b	9b553376-ed8a-4953-b3cd-4d549511e109	{"size": "a028ad90-a0ba-4f40-99a7-403eccfd2199", "color": "453284be-ea1a-4d73-bc63-716d8d379295", "fabric": "723e6acb-8457-4fa8-9762-01bde50ff4c4", "material": "5cf43dad-1129-4910-9060-bc7f461d1189", "design_id": "53d723b2-4644-4258-9f2d-77370a5fcce0"}	1	55490.00	55490.00
a9da2837-17bc-4c98-be70-bd28d8843290	7bfc5e24-354a-4d66-9547-eb05b9d93ea7	28b1189a-4adc-4a20-a8d8-a69fcc7a3dc5	{"size": "a028ad90-a0ba-4f40-99a7-403eccfd2199", "color": "453284be-ea1a-4d73-bc63-716d8d379295", "fabric": "723e6acb-8457-4fa8-9762-01bde50ff4c4", "material": "5cf43dad-1129-4910-9060-bc7f461d1189", "design_id": "e545b57f-4163-45d6-a9b6-2761ee9de572"}	2	15890.00	31780.00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, total_amount, tax_amount, discount_amount, final_amount, address_id, created_at, status, payment_status) FROM stdin;
7fe15799-3ff9-47ef-adee-e2e7bb6ad55e	cee15171-3be6-4052-8b36-d9387b38f9f8	20000.00	1000.00	500.00	20500.00	9439acc2-cb37-451a-944c-3f35f2f71fda	2026-03-08 15:06:26.870383+00	pending	pending
f5242f9e-576e-43ec-9ed7-02b62964f43f	56ee7d70-7b4d-4f5c-858d-a24726286ff7	4563.00	0.00	0.00	4563.00	\N	2026-03-11 18:34:10.55+00	pending	pending
7a18a39b-2658-4480-9df3-beef17c36922	9a0ef111-5f02-4859-a483-5f53cb240848	15000.00	0.00	0.00	15000.00	\N	2026-03-11 18:56:33.227+00	pending	pending
6e1f02dc-7cd7-4d57-9c70-041a5e819cef	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	104480.00	0.00	0.00	104480.00	fbef12e7-9227-47fd-bb0d-ae9ce3ae8d23	2026-03-29 13:53:05.527+00	pending	pending
81ba12ba-2055-4a64-bf96-f05a4f9459c7	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	33050.00	0.00	0.00	33050.00	fbef12e7-9227-47fd-bb0d-ae9ce3ae8d23	2026-03-30 16:35:05.123+00	pending	pending
5b0a7974-4d4b-49fe-9645-99e07108889b	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	55490.00	0.00	0.00	55490.00	fbef12e7-9227-47fd-bb0d-ae9ce3ae8d23	2026-03-30 16:38:25.312+00	pending	pending
7bfc5e24-354a-4d66-9547-eb05b9d93ea7	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	31780.00	0.00	0.00	31780.00	fbef12e7-9227-47fd-bb0d-ae9ce3ae8d23	2026-03-31 16:58:29.6+00	pending	pending
\.


--
-- Data for Name: password_resets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.password_resets (id, user_id, token, expires_at, created_at) FROM stdin;
96446a69-e0b9-43d6-be53-379fcc37e8fe	7c0eb4c8-cb76-4e93-9d3b-2b96d0876570	8d36451be2e099cd16b998cb678955b13797caf44ede35db328581232f2c807c	2026-03-08 14:42:38.044+00	2026-03-08 13:42:38.047+00
b4c75240-696c-480d-b53c-d7c758e93a7c	7c0eb4c8-cb76-4e93-9d3b-2b96d0876570	0491f7727e58edd3dd3d8ddf9c65212f59cb3b8351ccafc0585fc51a1822d7f9	2026-03-08 14:51:36.067+00	2026-03-08 13:51:36.067+00
6ca0c005-69d8-4ffa-a08f-1d3fdbcaccde	7c0eb4c8-cb76-4e93-9d3b-2b96d0876570	0f22743ecc88fd9cfb36206456ca90ae8808b946af7c07fdde1a9aae6e7f1ba2	2026-03-10 18:26:06.126+00	2026-03-10 17:26:06.126+00
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, order_id, payment_method, transaction_id, amount, paid_at, created_at, status) FROM stdin;
dcd08985-e313-4e9d-896e-4aba24994453	7fe15799-3ff9-47ef-adee-e2e7bb6ad55e	UPI	TXN123456	20500.00	2026-03-08 15:08:13.718498+00	2026-03-08 15:08:13.718498+00	pending
52f36527-511d-4325-815c-cf82e3082685	6e1f02dc-7cd7-4d57-9c70-041a5e819cef	\N	\N	104480.00	\N	2026-03-29 13:53:05.548+00	pending
c04656b8-81b5-43bd-bc84-9ef6374bb8ba	81ba12ba-2055-4a64-bf96-f05a4f9459c7	\N	\N	33050.00	\N	2026-03-30 16:35:05.142+00	pending
cadb1216-2aa0-47dd-8cf8-d8942a6491b5	5b0a7974-4d4b-49fe-9645-99e07108889b	\N	\N	55490.00	\N	2026-03-30 16:38:25.319+00	pending
7a646981-34d7-407f-a4e7-dcfd089e4430	7bfc5e24-354a-4d66-9547-eb05b9d93ea7	\N	\N	31780.00	\N	2026-03-31 16:58:29.624+00	pending
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, name, module, created_at, updated_at) FROM stdin;
63be628c-a0ef-4a39-b934-179cc013b8b1	create_user	users	2026-03-08 14:38:35.798876+00	2026-03-08 14:38:35.798876+00
12706137-4cae-4f9b-85b2-591ece0fabff	update_user	users	2026-03-08 14:38:35.798876+00	2026-03-08 14:38:35.798876+00
f5a7c4ca-f9fd-488a-be1e-1912210aaf3b	delete_user	users	2026-03-08 14:38:35.798876+00	2026-03-08 14:38:35.798876+00
1a90fdff-ebee-4da7-81c3-76ca0c005f93	view_users	users	2026-03-08 14:38:35.798876+00	2026-03-08 14:38:35.798876+00
ce68f759-061a-46be-8d39-a2ca6bf252e4	create_product	products	2026-03-08 14:38:35.798876+00	2026-03-08 14:38:35.798876+00
75cf3d48-b86e-495e-8f3a-10ca9b4f2bdc	update_product	products	2026-03-08 14:38:35.798876+00	2026-03-08 14:38:35.798876+00
507a6509-e2ae-44a3-95dd-e24e3798766f	delete_product	products	2026-03-08 14:38:35.798876+00	2026-03-08 14:38:35.798876+00
3b8d5642-c1af-40f8-985c-e1539a282e38	view_products	products	2026-03-08 14:38:35.798876+00	2026-03-08 14:38:35.798876+00
27568fff-dde7-4402-a0a8-3d2bae683fb3	create_order	orders	2026-03-08 14:38:35.798876+00	2026-03-08 14:38:35.798876+00
7a8bbc0b-cf8b-4450-9976-c74952b2f8a1	update_order	orders	2026-03-08 14:38:35.798876+00	2026-03-08 14:38:35.798876+00
cd3e32b3-f67e-4819-a29a-184eb5d7dab1	view_orders	orders	2026-03-08 14:38:35.798876+00	2026-03-08 14:38:35.798876+00
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_tokens (id, user_id, token, expires_at, is_revoked, created_at) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, user_id, model_id, rating, comment, is_approved, created_at) FROM stdin;
408790ce-855d-42a1-b82b-9a58c9c245ee	cee15171-3be6-4052-8b36-d9387b38f9f8	09c32132-ea6e-4ad2-98bd-931af3a65df8	5	Excellent quality furniture	t	2026-03-08 15:09:29.197494+00
0a7e4a33-17b7-47cb-9005-ea330f92f359	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	9b553376-ed8a-4953-b3cd-4d549511e109	5	demo demo demo	f	2026-03-31 15:50:47.789+00
a7fe2851-73ef-4340-8718-9209cb161bc9	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	99b00ed4-9800-477d-b73c-d94801348700	5	demo demo demo  demo demo demoe	f	2026-03-31 16:22:38.827+00
c43bca23-f1ee-4dd5-8d42-85ae90719b1d	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	2c0c4d9a-2440-4ed8-a96e-bce14431f0cb	4	aaaaaaaaaaaaaaaaaaaaaaaaa	f	2026-03-31 16:24:56.543+00
da1d459b-8e48-4f76-a0a8-8a1a8a4aff15	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	1e152394-1f42-40d0-9a5f-d7f6ea322f07	5	aaaaaaaaaaaaaaaaa	f	2026-03-31 16:36:42.691+00
eb0edc9f-68ec-4617-9f5c-9385cd678b87	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	f9566273-2156-4be9-9410-3ee3c9d57d3b	1	zzzzzzzzzzzzzzzzzzzzzzzzz	f	2026-03-31 16:47:39.78+00
65bfdc65-8a94-48ba-8351-567a97d26363	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	5d98c988-3458-4a2a-b5b3-16e5a1be815c	4	aaaaaaaaaaaaaaaaaaa	f	2026-03-31 16:57:29.266+00
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permissions (role_id, permission_id) FROM stdin;
d163b8a5-ab2e-450d-b187-3209a4da8048	63be628c-a0ef-4a39-b934-179cc013b8b1
d163b8a5-ab2e-450d-b187-3209a4da8048	12706137-4cae-4f9b-85b2-591ece0fabff
d163b8a5-ab2e-450d-b187-3209a4da8048	f5a7c4ca-f9fd-488a-be1e-1912210aaf3b
d163b8a5-ab2e-450d-b187-3209a4da8048	1a90fdff-ebee-4da7-81c3-76ca0c005f93
d163b8a5-ab2e-450d-b187-3209a4da8048	ce68f759-061a-46be-8d39-a2ca6bf252e4
d163b8a5-ab2e-450d-b187-3209a4da8048	75cf3d48-b86e-495e-8f3a-10ca9b4f2bdc
d163b8a5-ab2e-450d-b187-3209a4da8048	507a6509-e2ae-44a3-95dd-e24e3798766f
d163b8a5-ab2e-450d-b187-3209a4da8048	3b8d5642-c1af-40f8-985c-e1539a282e38
d163b8a5-ab2e-450d-b187-3209a4da8048	27568fff-dde7-4402-a0a8-3d2bae683fb3
d163b8a5-ab2e-450d-b187-3209a4da8048	7a8bbc0b-cf8b-4450-9976-c74952b2f8a1
d163b8a5-ab2e-450d-b187-3209a4da8048	cd3e32b3-f67e-4819-a29a-184eb5d7dab1
3bd21c5a-9537-4882-9fee-159db68d0568	ce68f759-061a-46be-8d39-a2ca6bf252e4
3bd21c5a-9537-4882-9fee-159db68d0568	75cf3d48-b86e-495e-8f3a-10ca9b4f2bdc
3bd21c5a-9537-4882-9fee-159db68d0568	507a6509-e2ae-44a3-95dd-e24e3798766f
3bd21c5a-9537-4882-9fee-159db68d0568	3b8d5642-c1af-40f8-985c-e1539a282e38
6799fa5f-0cf0-4acb-b520-77ab6b1fbfde	27568fff-dde7-4402-a0a8-3d2bae683fb3
6799fa5f-0cf0-4acb-b520-77ab6b1fbfde	7a8bbc0b-cf8b-4450-9976-c74952b2f8a1
6799fa5f-0cf0-4acb-b520-77ab6b1fbfde	cd3e32b3-f67e-4819-a29a-184eb5d7dab1
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, description, created_at, updated_at) FROM stdin;
3bd21c5a-9537-4882-9fee-159db68d0568	vendor	Furniture vendor	2026-02-26 10:49:43.101559+00	2026-02-26 10:49:43.101559+00
86eea399-9b5e-495e-9a6d-82e350124f06	designer	Furniture designer	2026-02-26 10:49:43.101559+00	2026-02-26 10:49:43.101559+00
6799fa5f-0cf0-4acb-b520-77ab6b1fbfde	customer	End customer	2026-02-26 10:49:43.101559+00	2026-02-26 10:49:43.101559+00
e63cfca6-7172-46d4-ace3-b14a22600589	Product Manager	Manage product catalog	2026-03-10 15:24:49.717+00	2026-03-10 15:24:49.717+00
b2e0bd71-f731-4844-97ce-7e4196913d29	Order Manager	Manage orders	2026-03-10 15:40:48.029+00	2026-03-10 15:40:48.029+00
694cdcc9-1842-45cb-b688-942d134b6eb8	product manager 	manage all products	2026-03-11 14:40:55.349+00	2026-03-11 14:40:55.349+00
8e096333-de1c-4bad-a479-301b18a96945	demo	demo	2026-03-11 18:29:29.783+00	2026-03-11 18:29:29.783+00
d163b8a5-ab2e-450d-b187-3209a4da8048	admin 123	System administrator	2026-02-26 10:49:43.101559+00	2026-03-11 18:36:40.184973+00
3a3360bb-9ef5-4e3d-9cfe-377ad38855f6	pm	jm	2026-03-11 18:57:43.894+00	2026-03-11 18:57:58.206091+00
9a1d550e-7a6d-407e-8aac-f0653df5a945	admin	\N	2026-03-29 06:58:57.707+00	2026-03-29 06:58:57.707+00
\.


--
-- Data for Name: saved_design_addons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saved_design_addons (saved_design_id, addon_id) FROM stdin;
\.


--
-- Data for Name: saved_designs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saved_designs (id, user_id, model_id, selected_material, selected_color, selected_fabric, selected_size, calculated_price, created_at) FROM stdin;
bc57fa04-abaf-4c9f-a746-ceb0718889f8	cee15171-3be6-4052-8b36-d9387b38f9f8	09c32132-ea6e-4ad2-98bd-931af3a65df8	5cf43dad-1129-4910-9060-bc7f461d1189	398c2353-b0f3-48f1-8d67-a1658cc05206	c170f08f-51d9-46f0-bd56-3675c0ddb42a	e7bf49ed-6be8-40db-953b-7122e4a5ab5a	20000.00	2026-03-08 15:02:54.692305+00
9c0abf6f-8647-4675-b4a8-9954977d52bc	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	2a98c98e-c05a-4897-92bd-3240f91dda11	5cf43dad-1129-4910-9060-bc7f461d1189	453284be-ea1a-4d73-bc63-716d8d379295	723e6acb-8457-4fa8-9762-01bde50ff4c4	a028ad90-a0ba-4f40-99a7-403eccfd2199	23810.00	2026-03-29 13:40:54.522+00
527e6f31-9843-49a1-8ea1-1b4e6c4e6627	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	2c0c4d9a-2440-4ed8-a96e-bce14431f0cb	5cf43dad-1129-4910-9060-bc7f461d1189	453284be-ea1a-4d73-bc63-716d8d379295	723e6acb-8457-4fa8-9762-01bde50ff4c4	a028ad90-a0ba-4f40-99a7-403eccfd2199	33050.00	2026-03-29 13:52:19.813+00
099211e3-af41-4c94-bcd8-7fa2de4852e0	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	2c0c4d9a-2440-4ed8-a96e-bce14431f0cb	5cf43dad-1129-4910-9060-bc7f461d1189	453284be-ea1a-4d73-bc63-716d8d379295	723e6acb-8457-4fa8-9762-01bde50ff4c4	a028ad90-a0ba-4f40-99a7-403eccfd2199	33050.00	2026-03-30 16:34:05.579+00
d97e905c-43a6-4c43-ad45-e9122967a663	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	2c0c4d9a-2440-4ed8-a96e-bce14431f0cb	5cf43dad-1129-4910-9060-bc7f461d1189	453284be-ea1a-4d73-bc63-716d8d379295	723e6acb-8457-4fa8-9762-01bde50ff4c4	a028ad90-a0ba-4f40-99a7-403eccfd2199	33050.00	2026-03-30 16:34:10.69+00
53d723b2-4644-4258-9f2d-77370a5fcce0	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	9b553376-ed8a-4953-b3cd-4d549511e109	5cf43dad-1129-4910-9060-bc7f461d1189	453284be-ea1a-4d73-bc63-716d8d379295	723e6acb-8457-4fa8-9762-01bde50ff4c4	a028ad90-a0ba-4f40-99a7-403eccfd2199	55490.00	2026-03-30 16:38:05.041+00
e545b57f-4163-45d6-a9b6-2761ee9de572	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	28b1189a-4adc-4a20-a8d8-a69fcc7a3dc5	5cf43dad-1129-4910-9060-bc7f461d1189	453284be-ea1a-4d73-bc63-716d8d379295	723e6acb-8457-4fa8-9762-01bde50ff4c4	a028ad90-a0ba-4f40-99a7-403eccfd2199	15890.00	2026-03-31 16:57:48.473+00
c2e0d0bd-4ee7-4479-a560-b998b4fb1f3d	10452348-5b3f-4def-87d3-91cfd481e10b	9b553376-ed8a-4953-b3cd-4d549511e109	5cf43dad-1129-4910-9060-bc7f461d1189	453284be-ea1a-4d73-bc63-716d8d379295	723e6acb-8457-4fa8-9762-01bde50ff4c4	a028ad90-a0ba-4f40-99a7-403eccfd2199	55490.00	2026-04-04 03:34:18.071+00
\.


--
-- Data for Name: sizes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sizes (id, name, width, height, depth, price_multiplier, created_at, updated_at) FROM stdin;
a028ad90-a0ba-4f40-99a7-403eccfd2199	Small	100.00	80.00	60.00	1.00	2026-03-08 14:59:05.201369+00	2026-03-08 14:59:05.201369+00
e7bf49ed-6be8-40db-953b-7122e4a5ab5a	Medium	150.00	100.00	80.00	1.30	2026-03-08 14:59:05.201369+00	2026-03-08 14:59:05.201369+00
4d2d0ca6-e756-42a4-bc2a-28097c97025f	Large	200.00	120.00	100.00	1.60	2026-03-08 14:59:05.201369+00	2026-03-08 14:59:05.201369+00
cb6d9f98-09b6-4fe6-a99b-5b6d1c0ac4d7	Small (2 Seater)	140.00	85.00	80.00	0.80	2026-03-29 06:58:58.021+00	2026-03-29 06:58:58.021+00
ab0e4373-93e2-4a0c-b416-bd67585b9245	Medium (3 Seater)	190.00	85.00	85.00	1.00	2026-03-29 06:58:58.029+00	2026-03-29 06:58:58.029+00
d7001de0-53db-4847-bf3a-599a64d8f4a1	Large (4 Seater)	240.00	85.00	90.00	1.30	2026-03-29 06:58:58.035+00	2026-03-29 06:58:58.035+00
5f070b2f-da75-4825-90c4-b2e1c8adf955	King Size	180.00	200.00	30.00	1.50	2026-03-29 06:58:58.042+00	2026-03-29 06:58:58.042+00
5d11da02-086c-43f2-844e-98219bbd4e03	Queen Size	150.00	200.00	30.00	1.20	2026-03-29 06:58:58.048+00	2026-03-29 06:58:58.048+00
\.


--
-- Data for Name: user_addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_addresses (id, user_id, address_line1, city, state, pincode, country, is_default, created_at, updated_at) FROM stdin;
9439acc2-cb37-451a-944c-3f35f2f71fda	7c0eb4c8-cb76-4e93-9d3b-2b96d0876570	Street 1	Ahmedabad	Gujarat	380001	India	t	2026-03-08 14:46:53.456664+00	2026-03-08 14:46:53.456664+00
fbef12e7-9227-47fd-bb0d-ae9ce3ae8d23	3cf0b769-59e4-4e31-8473-d66d0fd4af2c	123 	demo 	demo1	123456	demo	f	2026-03-29 13:52:44.243+00	2026-03-29 13:52:44.243+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, full_name, email, password_hash, phone, role_id, is_verified, is_active, deleted_at, created_at, updated_at) FROM stdin;
10452348-5b3f-4def-87d3-91cfd481e10b	Admin	admin@gmail.com	$2a$12$SDXrXCMvT4ggKGvOlkcXnOOHjKwqGekhalItKCMcLSyhFz5Pphnwu	1234567890	d163b8a5-ab2e-450d-b187-3209a4da8048	t	t	\N	2026-03-08 09:34:14.565456+00	2026-03-08 09:34:14.565456+00
cee15171-3be6-4052-8b36-d9387b38f9f8	Jane Smith	jane@example.com	$2a$10$Yr4KW91eY1qsI8.JEpnZJOldMlctGFugN4iJeDxd0Jw6jkv38f2mu	\N	6799fa5f-0cf0-4acb-b520-77ab6b1fbfde	f	t	\N	2026-03-08 10:12:49.452+00	2026-03-08 10:12:49.452+00
56ee7d70-7b4d-4f5c-858d-a24726286ff7	Jane Smith	jane_vendor@example.com	$2a$10$jTyYcXmsaMFxZUXjY0nCyuHvWy1fU/Nf/e5ctT20lWPZtaftzlgGm	\N	3bd21c5a-9537-4882-9fee-159db68d0568	f	t	\N	2026-03-08 10:20:58.644+00	2026-03-08 10:20:58.644+00
7c0eb4c8-cb76-4e93-9d3b-2b96d0876570	bhavik	bhavik@mail.com	$2a$10$UKG/PTG17rARJnAyPfhmgeD/zIMz7E.Cbt6QVIvyF.zCKZhKvjKO6	\N	d163b8a5-ab2e-450d-b187-3209a4da8048	f	t	\N	2026-03-08 13:37:23.336+00	2026-03-08 13:37:23.336+00
85cad1a5-ca3f-4a01-a01b-db7dcdf66c73	bhavesh	bhavesh@email.com	$2a$10$WT/Th69OmvA5IEzTinaF2.mrIZg07JJH/hmSa1ojKanylX/CpxuWC	\N	3bd21c5a-9537-4882-9fee-159db68d0568	f	t	\N	2026-03-08 11:20:52.374+00	2026-03-08 14:03:23.533753+00
4ca4e504-56f6-48f6-8910-927c05ac9bb1	Bhavik_admin	bhvavik.admin@gmail.com	12345678910	9999999991	d163b8a5-ab2e-450d-b187-3209a4da8048	t	t	\N	2026-03-08 14:43:44.952524+00	2026-03-08 14:43:44.952524+00
b1e9124a-a9c1-4b34-be28-51c2c3f09ae7	Designer One	designer@test.com	hashed_password	9999999993	86eea399-9b5e-495e-9a6d-82e350124f06	t	t	\N	2026-03-08 14:53:35.1246+00	2026-03-08 14:53:35.1246+00
6e525f67-8138-4b4f-8c78-c27e00bf03ed	yash	yash@gmail.com	$2a$10$ds6Yyili1PBhB3l5IKa.ZO1GW21JF0MVNv31Q.KPcVrmkDOg2svZm	\N	3bd21c5a-9537-4882-9fee-159db68d0568	f	t	2026-03-08 19:02:48.369+00	2026-03-08 18:54:20.465+00	2026-03-08 19:02:46.834007+00
3cf0b769-59e4-4e31-8473-d66d0fd4af2c	bhavesh	bhavesh@example.com	$2a$10$dvovrON9L.osqBNYliFZZOq97FJbrgXz5fdholtkDiI5gpDVv00wa	\N	3bd21c5a-9537-4882-9fee-159db68d0568	f	t	\N	2026-03-10 17:25:22.225+00	2026-03-10 17:25:22.225+00
aa4b7aa5-15d2-49e8-b955-c89dc3133ba7	bhavik_vendor	gadher@gmail.com	$2a$10$eLpVuC4n19GAH2dNXNVzMujGNpPW97BBVBhNonofV1xSehcjmPEim	\N	3bd21c5a-9537-4882-9fee-159db68d0568	f	t	\N	2026-03-11 14:22:36.02+00	2026-03-11 14:22:36.02+00
9a0ef111-5f02-4859-a483-5f53cb240848	bhutik	bhutik@gmail.com	$2a$10$tgshqUAPOuoQaWUWNN5/TOq3j8RMPX.rJCZeJ5B3/rdS7q9jnd/XC	\N	3bd21c5a-9537-4882-9fee-159db68d0568	f	t	\N	2026-03-11 18:51:12.672+00	2026-03-18 16:39:07.969102+00
1eefc6d6-a069-45b4-97a2-5e1211f21bf9	aaaaaaaaaaaaaa	a@gmail.com	$2a$10$DPGyAoa01OFnXJ5to9FsGeb3IMsIp8R9bWKQP6zPY8IaD2AduDZb2	\N	3bd21c5a-9537-4882-9fee-159db68d0568	f	f	\N	2026-03-11 17:14:25.517+00	2026-03-18 16:46:52.549729+00
6cba9949-94ef-4409-a805-319883f62f1a	abc	gadherbhavik@gmail.com	$2a$10$VkPyLhYc8ATkvqzFgOjgZec7SAMq4QB.KQi5bKIV5iTPIIWQxtxbq	\N	3bd21c5a-9537-4882-9fee-159db68d0568	f	t	\N	2026-03-18 16:53:44.699+00	2026-03-18 16:53:44.699+00
b94ac040-c044-4b27-8f28-f3405d7fa279	vendor	vendor@gmail.com	$2a$10$UM4PmHWfk7yFZdJ6SovEd.eJ2sYHyvOy5WnNmI9n31TdDoGdvi04i	\N	3bd21c5a-9537-4882-9fee-159db68d0568	f	t	\N	2026-03-18 17:50:08.543+00	2026-03-18 17:50:08.543+00
e1eef50c-25a1-4fb0-ba6f-6f8143e5e128	eee	eee@gmail.com	$2a$10$CG0iBr4JN1l28ie6vnljx.rHcEFxU6eHPsD0YYX/C7H3zM8DG6VX2	1234567890	3bd21c5a-9537-4882-9fee-159db68d0568	t	t	2026-03-26 17:13:59.771+00	2026-03-26 17:12:34.211+00	2026-03-26 17:13:59.768953+00
7377a6bc-1bab-4040-98f0-df470a27a6f7	wwwwwwwwwwww	www@gmail.com	$2a$10$TxDAGG72u6CsLnzhcpKl7uXr5Q/h4PhnuKr9ecKMJx425tHzg3OPS	\N	3bd21c5a-9537-4882-9fee-159db68d0568	f	t	2026-03-26 17:32:49.385+00	2026-03-26 16:33:33.387+00	2026-03-26 17:32:49.413839+00
422e4ee8-7d38-465b-866f-648efe4ae9ee	aa	abc@gmail.com	$2a$10$.6MTLPOb34Tsk98ZNrRBl.uvpKXf2Gi1Iy221ZRi1h1Vp1.Nx.IQ6	\N	3bd21c5a-9537-4882-9fee-159db68d0568	f	t	2026-03-26 17:33:00.144+00	2026-03-18 16:56:25.263+00	2026-03-26 17:33:00.169617+00
590c655d-4d7f-4eb5-9cd5-b7ef4246a46d	aa	aa@gmail.com	$2a$10$9C/aBWRXIn9t7qB16L/GM.fWKOvBur8xfgIVVcOne3.uZPwrrbTYi	12345678	3bd21c5a-9537-4882-9fee-159db68d0568	t	t	\N	2026-03-26 17:33:47.262+00	2026-03-26 17:33:47.262+00
743a2b03-6828-457d-8c45-9af3b167040c	Super Admin	admin@furniture.com	$2a$10$VyY.XHYxKZADKEkS/TcxTO/ObAkLbVuRUa8Yb0g26X3uA/XKk13yS	\N	9a1d550e-7a6d-407e-8aac-f0653df5a945	t	t	\N	2026-03-29 06:58:57.815+00	2026-03-29 06:58:57.815+00
b395d0d3-39c3-4373-9d7b-9e64cd75f804	Rajesh Kumar	vendor1@furniture.com	$2a$10$VyY.XHYxKZADKEkS/TcxTO/ObAkLbVuRUa8Yb0g26X3uA/XKk13yS	9876543210	3bd21c5a-9537-4882-9fee-159db68d0568	t	t	\N	2026-03-29 06:58:57.828+00	2026-03-29 06:58:57.828+00
fea1e46a-e9f7-4244-8ea4-50972deea8bf	Priya Sharma	vendor2@furniture.com	$2a$10$VyY.XHYxKZADKEkS/TcxTO/ObAkLbVuRUa8Yb0g26X3uA/XKk13yS	9876543211	3bd21c5a-9537-4882-9fee-159db68d0568	t	t	\N	2026-03-29 06:58:57.834+00	2026-03-29 06:58:57.834+00
73dc78c5-5a5d-4a48-96ee-b8f94d91e4fb	Amit Patel	customer@furniture.com	$2a$10$VyY.XHYxKZADKEkS/TcxTO/ObAkLbVuRUa8Yb0g26X3uA/XKk13yS	9876543212	6799fa5f-0cf0-4acb-b520-77ab6b1fbfde	t	t	\N	2026-03-29 06:58:57.842+00	2026-03-29 06:58:57.842+00
333279ae-b9a2-43ca-bd20-9ae0b409f1b2	Neha Joshi	designer@furniture.com	$2a$10$VyY.XHYxKZADKEkS/TcxTO/ObAkLbVuRUa8Yb0g26X3uA/XKk13yS	9876543213	86eea399-9b5e-495e-9a6d-82e350124f06	t	t	\N	2026-03-29 06:58:57.849+00	2026-03-29 06:58:57.849+00
\.


--
-- Data for Name: vendors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vendors (id, user_id, company_name, gst_number, is_approved, created_at, updated_at) FROM stdin;
63c8e9e8-a426-4df7-8003-b2b8c28bac5a	85cad1a5-ca3f-4a01-a01b-db7dcdf66c73	Luxury Furniture Pvt Ltd	GST123456	t	2026-03-08 14:51:24.875903+00	2026-03-08 14:51:24.875903+00
2c45781e-4ece-454c-b05e-dcd785de6e70	e1eef50c-25a1-4fb0-ba6f-6f8143e5e128	eee	12345678	t	2026-03-26 17:12:34.227+00	2026-03-26 17:12:34.227+00
3fb7d4de-b21b-4b77-b765-a071926223be	590c655d-4d7f-4eb5-9cd5-b7ef4246a46d	aa	xyz	t	2026-03-26 17:33:47.272+00	2026-03-26 17:33:47.272+00
8fb17fc3-9a91-4541-a543-3873f2d82cd8	b395d0d3-39c3-4373-9d7b-9e64cd75f804	Royal Wood Furniture	22AAAAA0000A1Z5	t	2026-03-29 06:58:57.856+00	2026-03-29 06:58:57.856+00
6db63f50-c280-465a-94a8-b818dba09f73	fea1e46a-e9f7-4244-8ea4-50972deea8bf	Modern Home Decor	27BBBBB1111B2Y6	t	2026-03-29 06:58:57.863+00	2026-03-29 06:58:57.863+00
\.


--
-- Data for Name: wishlist_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wishlist_items (id, wishlist_id, model_id, added_at) FROM stdin;
\.


--
-- Data for Name: wishlists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wishlists (id, user_id, created_at) FROM stdin;
\.


--
-- Name: add_ons add_ons_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.add_ons
    ADD CONSTRAINT add_ons_name_key UNIQUE (name);


--
-- Name: add_ons add_ons_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.add_ons
    ADD CONSTRAINT add_ons_name_key1 UNIQUE (name);


--
-- Name: add_ons add_ons_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.add_ons
    ADD CONSTRAINT add_ons_name_key10 UNIQUE (name);


--
-- Name: add_ons add_ons_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.add_ons
    ADD CONSTRAINT add_ons_name_key2 UNIQUE (name);


--
-- Name: add_ons add_ons_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.add_ons
    ADD CONSTRAINT add_ons_name_key3 UNIQUE (name);


--
-- Name: add_ons add_ons_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.add_ons
    ADD CONSTRAINT add_ons_name_key4 UNIQUE (name);


--
-- Name: add_ons add_ons_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.add_ons
    ADD CONSTRAINT add_ons_name_key5 UNIQUE (name);


--
-- Name: add_ons add_ons_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.add_ons
    ADD CONSTRAINT add_ons_name_key6 UNIQUE (name);


--
-- Name: add_ons add_ons_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.add_ons
    ADD CONSTRAINT add_ons_name_key7 UNIQUE (name);


--
-- Name: add_ons add_ons_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.add_ons
    ADD CONSTRAINT add_ons_name_key8 UNIQUE (name);


--
-- Name: add_ons add_ons_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.add_ons
    ADD CONSTRAINT add_ons_name_key9 UNIQUE (name);


--
-- Name: add_ons add_ons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.add_ons
    ADD CONSTRAINT add_ons_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: carts carts_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_key UNIQUE (user_id);


--
-- Name: categories categories_name_parent_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_parent_id_key UNIQUE (name, parent_id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: colors colors_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_name_key UNIQUE (name);


--
-- Name: colors colors_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_name_key1 UNIQUE (name);


--
-- Name: colors colors_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_name_key10 UNIQUE (name);


--
-- Name: colors colors_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_name_key2 UNIQUE (name);


--
-- Name: colors colors_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_name_key3 UNIQUE (name);


--
-- Name: colors colors_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_name_key4 UNIQUE (name);


--
-- Name: colors colors_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_name_key5 UNIQUE (name);


--
-- Name: colors colors_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_name_key6 UNIQUE (name);


--
-- Name: colors colors_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_name_key7 UNIQUE (name);


--
-- Name: colors colors_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_name_key8 UNIQUE (name);


--
-- Name: colors colors_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_name_key9 UNIQUE (name);


--
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (id);


--
-- Name: consultations consultations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultations
    ADD CONSTRAINT consultations_pkey PRIMARY KEY (id);


--
-- Name: coupon_usage coupon_usage_coupon_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon_usage
    ADD CONSTRAINT coupon_usage_coupon_id_user_id_key UNIQUE (coupon_id, user_id);


--
-- Name: coupon_usage coupon_usage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon_usage
    ADD CONSTRAINT coupon_usage_pkey PRIMARY KEY (id);


--
-- Name: coupons coupons_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key UNIQUE (code);


--
-- Name: coupons coupons_code_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key1 UNIQUE (code);


--
-- Name: coupons coupons_code_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key2 UNIQUE (code);


--
-- Name: coupons coupons_code_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key3 UNIQUE (code);


--
-- Name: coupons coupons_code_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key4 UNIQUE (code);


--
-- Name: coupons coupons_code_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key5 UNIQUE (code);


--
-- Name: coupons coupons_code_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key6 UNIQUE (code);


--
-- Name: coupons coupons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (id);


--
-- Name: designers designers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.designers
    ADD CONSTRAINT designers_pkey PRIMARY KEY (id);


--
-- Name: designers designers_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.designers
    ADD CONSTRAINT designers_user_id_key UNIQUE (user_id);


--
-- Name: fabrics fabrics_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabrics
    ADD CONSTRAINT fabrics_name_key UNIQUE (name);


--
-- Name: fabrics fabrics_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabrics
    ADD CONSTRAINT fabrics_name_key1 UNIQUE (name);


--
-- Name: fabrics fabrics_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabrics
    ADD CONSTRAINT fabrics_name_key10 UNIQUE (name);


--
-- Name: fabrics fabrics_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabrics
    ADD CONSTRAINT fabrics_name_key2 UNIQUE (name);


--
-- Name: fabrics fabrics_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabrics
    ADD CONSTRAINT fabrics_name_key3 UNIQUE (name);


--
-- Name: fabrics fabrics_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabrics
    ADD CONSTRAINT fabrics_name_key4 UNIQUE (name);


--
-- Name: fabrics fabrics_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabrics
    ADD CONSTRAINT fabrics_name_key5 UNIQUE (name);


--
-- Name: fabrics fabrics_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabrics
    ADD CONSTRAINT fabrics_name_key6 UNIQUE (name);


--
-- Name: fabrics fabrics_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabrics
    ADD CONSTRAINT fabrics_name_key7 UNIQUE (name);


--
-- Name: fabrics fabrics_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabrics
    ADD CONSTRAINT fabrics_name_key8 UNIQUE (name);


--
-- Name: fabrics fabrics_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabrics
    ADD CONSTRAINT fabrics_name_key9 UNIQUE (name);


--
-- Name: fabrics fabrics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabrics
    ADD CONSTRAINT fabrics_pkey PRIMARY KEY (id);


--
-- Name: furniture_models furniture_models_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.furniture_models
    ADD CONSTRAINT furniture_models_pkey PRIMARY KEY (id);


--
-- Name: inventory_logs inventory_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_logs
    ADD CONSTRAINT inventory_logs_pkey PRIMARY KEY (id);


--
-- Name: materials materials_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_name_key UNIQUE (name);


--
-- Name: materials materials_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_name_key1 UNIQUE (name);


--
-- Name: materials materials_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_name_key10 UNIQUE (name);


--
-- Name: materials materials_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_name_key2 UNIQUE (name);


--
-- Name: materials materials_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_name_key3 UNIQUE (name);


--
-- Name: materials materials_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_name_key4 UNIQUE (name);


--
-- Name: materials materials_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_name_key5 UNIQUE (name);


--
-- Name: materials materials_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_name_key6 UNIQUE (name);


--
-- Name: materials materials_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_name_key7 UNIQUE (name);


--
-- Name: materials materials_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_name_key8 UNIQUE (name);


--
-- Name: materials materials_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_name_key9 UNIQUE (name);


--
-- Name: materials materials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: password_resets password_resets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_pkey PRIMARY KEY (id);


--
-- Name: password_resets password_resets_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_token_key UNIQUE (token);


--
-- Name: password_resets password_resets_token_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_token_key1 UNIQUE (token);


--
-- Name: password_resets password_resets_token_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_token_key10 UNIQUE (token);


--
-- Name: password_resets password_resets_token_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_token_key2 UNIQUE (token);


--
-- Name: password_resets password_resets_token_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_token_key3 UNIQUE (token);


--
-- Name: password_resets password_resets_token_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_token_key4 UNIQUE (token);


--
-- Name: password_resets password_resets_token_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_token_key5 UNIQUE (token);


--
-- Name: password_resets password_resets_token_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_token_key6 UNIQUE (token);


--
-- Name: password_resets password_resets_token_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_token_key7 UNIQUE (token);


--
-- Name: password_resets password_resets_token_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_token_key8 UNIQUE (token);


--
-- Name: password_resets password_resets_token_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_token_key9 UNIQUE (token);


--
-- Name: payments payments_order_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_key UNIQUE (order_id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: permissions permissions_name_module_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_module_key UNIQUE (name, module);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key UNIQUE (token);


--
-- Name: refresh_tokens refresh_tokens_token_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key1 UNIQUE (token);


--
-- Name: refresh_tokens refresh_tokens_token_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key2 UNIQUE (token);


--
-- Name: refresh_tokens refresh_tokens_token_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key3 UNIQUE (token);


--
-- Name: refresh_tokens refresh_tokens_token_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key4 UNIQUE (token);


--
-- Name: refresh_tokens refresh_tokens_token_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key5 UNIQUE (token);


--
-- Name: refresh_tokens refresh_tokens_token_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key6 UNIQUE (token);


--
-- Name: refresh_tokens refresh_tokens_token_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key7 UNIQUE (token);


--
-- Name: refresh_tokens refresh_tokens_token_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key8 UNIQUE (token);


--
-- Name: refresh_tokens refresh_tokens_token_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_key9 UNIQUE (token);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_user_id_model_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_model_id_key UNIQUE (user_id, model_id);


--
-- Name: role_permissions role_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key1 UNIQUE (name);


--
-- Name: roles roles_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key10 UNIQUE (name);


--
-- Name: roles roles_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key2 UNIQUE (name);


--
-- Name: roles roles_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key3 UNIQUE (name);


--
-- Name: roles roles_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key4 UNIQUE (name);


--
-- Name: roles roles_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key5 UNIQUE (name);


--
-- Name: roles roles_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key6 UNIQUE (name);


--
-- Name: roles roles_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key7 UNIQUE (name);


--
-- Name: roles roles_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key8 UNIQUE (name);


--
-- Name: roles roles_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key9 UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: saved_design_addons saved_design_addons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_design_addons
    ADD CONSTRAINT saved_design_addons_pkey PRIMARY KEY (saved_design_id, addon_id);


--
-- Name: saved_designs saved_designs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_designs
    ADD CONSTRAINT saved_designs_pkey PRIMARY KEY (id);


--
-- Name: sizes sizes_name_width_height_depth_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_name_width_height_depth_key UNIQUE (name, width, height, depth);


--
-- Name: sizes sizes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_pkey PRIMARY KEY (id);


--
-- Name: user_addresses user_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_addresses
    ADD CONSTRAINT user_addresses_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- Name: users users_email_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key10 UNIQUE (email);


--
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- Name: users users_email_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- Name: users users_email_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key4 UNIQUE (email);


--
-- Name: users users_email_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key5 UNIQUE (email);


--
-- Name: users users_email_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key6 UNIQUE (email);


--
-- Name: users users_email_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key7 UNIQUE (email);


--
-- Name: users users_email_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key8 UNIQUE (email);


--
-- Name: users users_email_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key9 UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vendors vendors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);


--
-- Name: vendors vendors_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_user_id_key UNIQUE (user_id);


--
-- Name: wishlist_items wishlist_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_pkey PRIMARY KEY (id);


--
-- Name: wishlists wishlists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT wishlists_pkey PRIMARY KEY (id);


--
-- Name: wishlists wishlists_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT wishlists_user_id_key UNIQUE (user_id);


--
-- Name: idx_categories_parent; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_categories_parent ON public.categories USING btree (parent_id);


--
-- Name: idx_models_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_models_active ON public.furniture_models USING btree (is_active) WHERE (is_active = true);


--
-- Name: idx_models_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_models_category ON public.furniture_models USING btree (category_id);


--
-- Name: idx_models_vendor; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_models_vendor ON public.furniture_models USING btree (vendor_id);


--
-- Name: idx_one_default_address; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_one_default_address ON public.user_addresses USING btree (user_id) WHERE (is_default = true);


--
-- Name: idx_orders_user_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_user_created ON public.orders USING btree (user_id, created_at DESC);


--
-- Name: idx_user_addresses_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_addresses_user ON public.user_addresses USING btree (user_id);


--
-- Name: idx_users_role; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_role ON public.users USING btree (role_id);


--
-- Name: categories trg_categories_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_categories_updated BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: designers trg_designers_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_designers_updated BEFORE UPDATE ON public.designers FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: furniture_models trg_models_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_models_updated BEFORE UPDATE ON public.furniture_models FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: permissions trg_permissions_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_permissions_updated BEFORE UPDATE ON public.permissions FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: roles trg_roles_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_roles_updated BEFORE UPDATE ON public.roles FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: user_addresses trg_user_addresses_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_user_addresses_updated BEFORE UPDATE ON public.user_addresses FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: users trg_users_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_users_updated BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: vendors trg_vendors_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_vendors_updated BEFORE UPDATE ON public.vendors FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON UPDATE CASCADE;


--
-- Name: cart_items cart_items_saved_design_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_saved_design_id_fkey FOREIGN KEY (saved_design_id) REFERENCES public.saved_designs(id) ON UPDATE CASCADE;


--
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: categories categories_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: consultations consultations_designer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultations
    ADD CONSTRAINT consultations_designer_id_fkey FOREIGN KEY (designer_id) REFERENCES public.designers(id) ON UPDATE CASCADE;


--
-- Name: consultations consultations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultations
    ADD CONSTRAINT consultations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: coupon_usage coupon_usage_coupon_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon_usage
    ADD CONSTRAINT coupon_usage_coupon_id_fkey FOREIGN KEY (coupon_id) REFERENCES public.coupons(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: coupon_usage coupon_usage_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon_usage
    ADD CONSTRAINT coupon_usage_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: coupon_usage coupon_usage_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupon_usage
    ADD CONSTRAINT coupon_usage_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: designers designers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.designers
    ADD CONSTRAINT designers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: furniture_models furniture_models_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.furniture_models
    ADD CONSTRAINT furniture_models_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE;


--
-- Name: furniture_models furniture_models_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.furniture_models
    ADD CONSTRAINT furniture_models_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id) ON UPDATE CASCADE;


--
-- Name: inventory_logs inventory_logs_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_logs
    ADD CONSTRAINT inventory_logs_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.materials(id) ON UPDATE CASCADE;


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE;


--
-- Name: orders orders_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.user_addresses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: password_resets password_resets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: reviews reviews_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.furniture_models(id) ON UPDATE CASCADE;


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: role_permissions role_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: saved_design_addons saved_design_addons_addon_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_design_addons
    ADD CONSTRAINT saved_design_addons_addon_id_fkey FOREIGN KEY (addon_id) REFERENCES public.add_ons(id) ON DELETE CASCADE;


--
-- Name: saved_design_addons saved_design_addons_saved_design_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_design_addons
    ADD CONSTRAINT saved_design_addons_saved_design_id_fkey FOREIGN KEY (saved_design_id) REFERENCES public.saved_designs(id) ON DELETE CASCADE;


--
-- Name: saved_designs saved_designs_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_designs
    ADD CONSTRAINT saved_designs_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.furniture_models(id) ON UPDATE CASCADE;


--
-- Name: saved_designs saved_designs_selected_color_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_designs
    ADD CONSTRAINT saved_designs_selected_color_fkey FOREIGN KEY (selected_color) REFERENCES public.colors(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: saved_designs saved_designs_selected_fabric_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_designs
    ADD CONSTRAINT saved_designs_selected_fabric_fkey FOREIGN KEY (selected_fabric) REFERENCES public.fabrics(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: saved_designs saved_designs_selected_material_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_designs
    ADD CONSTRAINT saved_designs_selected_material_fkey FOREIGN KEY (selected_material) REFERENCES public.materials(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: saved_designs saved_designs_selected_size_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_designs
    ADD CONSTRAINT saved_designs_selected_size_fkey FOREIGN KEY (selected_size) REFERENCES public.sizes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: saved_designs saved_designs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_designs
    ADD CONSTRAINT saved_designs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: user_addresses user_addresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_addresses
    ADD CONSTRAINT user_addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE;


--
-- Name: vendors vendors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: wishlist_items wishlist_items_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.furniture_models(id) ON UPDATE CASCADE;


--
-- Name: wishlist_items wishlist_items_wishlist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_wishlist_id_fkey FOREIGN KEY (wishlist_id) REFERENCES public.wishlists(id) ON UPDATE CASCADE;


--
-- Name: wishlists wishlists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT wishlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict DiAGSkaX0w3aEMSB3e6yquoKbEmVdDt8QP7E5JDuwr39KthV7GpgcYDZTljFaKx

