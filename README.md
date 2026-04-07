# Furniture E-Commerce Platform

A comprehensive e-commerce and furniture customization platform consisting of a Node.js backend, a customer-facing frontend, and an admin dashboard, all orchestrated seamlessly using Docker Compose.

## 🏗️ Architecture

The application is divided into several containerized services:
- **Backend API**: Node.js/Express monolithic server with Sequelize ORM.
- **End-User UI**: React/Vite-based frontend for customers.
- **Admin UI**: React/Vite-based frontend for administrators and vendors.
- **Database**: PostgreSQL instance for persistent data storage.
- **Database Migrations**: Automated service to prepare DB schemas.

## 🚀 Prerequisites

Make sure you have the following installed on your system:
- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Furniture-Customizer-DevOps
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory. It is required to configure the local PostgreSQL database:

```env
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_secure_password
PORT=3000
```
*(Ensure the same file or variables exist as required by `Furniture-Backend/.env` for secrets like JWT).*

### 3. Initialize the Database Volume

Because this setup uses an external named database volume for data persistence, you must create the volume explicitly before starting the containers:

```bash
docker volume create pgdata
```

### 4. Build and Run the Application

Use Docker Compose to deploy the full stack. This command will build the frontend applications, the backend API server, run database migrations automatically, and start everything up.

```bash
docker compose up -d --build
```
> **Note:** The initial build process might take several minutes while it downloads the base Docker images and compiles the React application files.

### 5. Accessing the Applications

Once the containers are successfully marked as "Healthy" and running, you can access the applications via your web browser:

- **End-User / Customer UI**: [http://localhost:8080](http://localhost:8080)
- **Admin Dashboard UI**: [http://localhost:8081](http://localhost:8081)
- **Backend API Host**: `http://localhost:3000`

## 🔐 Default Test Credentials

The backend comes heavily seeded with dummy data for immediate testing. You can test authorization scenarios using the initial accounts:

**Password for ALL accounts:** `Password123!`

| Role | Email Login |
| - | - |
| **Customer** | `customer@furniture.com` |
| **Admin** | `admin@furniture.com` |
| **Vendor 1** | `vendor1@furniture.com` |
| **Vendor 2** | `vendor2@furniture.com` |
| **Designer** | `designer@furniture.com` |

## 🛑 Useful Commands

- **View Active Logs**:
  ```bash
  docker compose logs -f
  ```
- **Stop Containers** (Safely stop and retain data):
  ```bash
  docker compose down
  ```
- **Clean Reset Database**: If you need to completely wipe the existing database data and seed a fresh local environment:
  ```bash
  docker compose down
  docker volume rm pgdata
  docker volume create pgdata
  docker compose up -d --build
  ```
