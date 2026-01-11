const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 
const authRoutes = require('./src/routes/authRoutes');
const purchaseRoutes = require('./src/routes/purchaseRoutes');
const transferRoutes = require('./src/routes/transferRoutes');
const assignmentRoutes = require('./src/routes/assignmentRoutes');
const expenditureRoutes = require("./src/routes/expenditureRoutes");
const assetRoutes = require("./src/routes/assetRoutes");
const baseRoutes = require("./src/routes/baseRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB   

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.get("/", (req, res) => {
    res.send("Welcome to Military Asset Management server! , API is running...");
})

app.use("/api/auth", authRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/expenditures", expenditureRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/bases", baseRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
})


































