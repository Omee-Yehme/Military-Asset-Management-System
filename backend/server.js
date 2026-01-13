require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const purchaseRoutes = require('./src/routes/purchaseRoutes');
const transferRoutes = require('./src/routes/transferRoutes');
const assignmentRoutes = require('./src/routes/assignmentRoutes');
const expenditureRoutes = require("./src/routes/expenditureRoutes");
const assetRoutes = require("./src/routes/assetRoutes");
const baseRoutes = require("./src/routes/baseRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");

const app = express();

/* -------------------- Middleware -------------------- */

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://mams-eta.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(express.json());

/* -------------------- MongoDB -------------------- */

if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing");
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

/* -------------------- Routes -------------------- */

app.get("/", (req, res) => {
    res.send("Welcome to Military Asset Management server! API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/expenditures", expenditureRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/bases", baseRoutes);

/* -------------------- Server -------------------- */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
