# Military Asset Management System (MAMS) 🛡️

A specialized full-stack logistics platform designed for military organizations to manage equipment, track asset movements between bases, and maintain absolute accountability for inventory expenditure.

## 🚀 Overview
MAMS provides a secure environment for personnel to oversee the lifecycle of military hardware. From the initial procurement of assets to their final expenditure or assignment, the system ensures that every action is verified through **Role-Based Access Control (RBAC)** and logged for auditing.

### Key Capabilities
* **Centralized Asset Registry:** Categorize and track various military assets like weapons, vehicles, and supplies.
* **Base-to-Base Transfers:** Securely log the movement of inventory between different military installations.
* **Field Assignments:** Track which personnel or units are currently assigned specific equipment.
* **Expenditure Logging:** Real-time updates on ammunition and supply consumption.
* **Command Dashboard:** High-level statistical overviews for senior leadership.

---

## 🛠️ Tech Stack
* **Frontend:** React.js, Tailwind CSS, Vite
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Security:** JWT Authentication & CORS configuration
* **Deployment:** Optimized for Vercel

---

## 📂 Project Structure
Based on the repository's architecture:

```text
MAMS/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers & business logic
│   │   ├── models/         # MongoDB Schemas
│   │   ├── routes/         # API Route definitions
│   │   ├── middlewares/    # Auth & Role verification
│   │   ├── utils/          # Helper functions
│   │   └── app.js          # Express app configuration
│   ├── server.js           # Server entry point & DB connection
│   └── createAdmin.js      # Script for initial admin setup
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios/Fetch API services
│   │   ├── auth/           # Authentication logic
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # View components (Dashboard, Assets, etc.)
│   │   └── App.jsx         # Main React entry
│   └── index.html
└── vercel.json             # Deployment configuration
```
##🔌 API Endpoints
The backend exposes the following RESTful routes under /api:
Category,Endpoint,Functionality
Authentication,/api/auth,"Login, Registration, and Token verification"
Purchasing,/api/purchases,Log new equipment procurement
Transfers,/api/transfers,Manage asset movement between bases
Assignments,/api/assignments,Assign assets to specific units/personnel
Expenditures,/api/expenditures,Record used or lost supplies/ammunition
Assets,/api/assets,General CRUD for asset types
Bases,/api/bases,Management of military base locations
Dashboard,/api/dashboard,Analytics and summary data

## ⚙️ Setup Instructions
Backend Setup
Navigate to the backend folder: cd backend

Install dependencies: npm install

Configure your .env file with PORT, MONGODB_URI, and JWT_SECRET.

Run the server: npm start (or npm run dev for development).

##Frontend Setup
Navigate to the frontend folder: cd frontend

Install dependencies: npm install

Start the Vite development server: npm run dev

##Security Features
CORS Policy: Restricted to authorized origins including localhost and your Vercel production URL.

Auth Middleware: Protects sensitive routes, ensuring only authenticated users with correct permissions can modify inventory.

Audit Trail: Detailed logging of transfers and expenditures to prevent inventory mismatches.
