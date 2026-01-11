const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 
const authRoutes = require('./src/routes/authRoutes');

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

app.use("/api/auth", authRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
})


































