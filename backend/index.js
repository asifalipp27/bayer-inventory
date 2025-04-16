const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
require('dotenv').config();
const cors = require('cors');


const app = express();

// Connect to MongoDB
connectDB();
app.use(express.static(path.join(__dirname,"..", "dist")));
app.get("/*", (req, res) => {
    return res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
  });
  
app.use(cors());

// Middleware
app.use(express.json());

app.get('/test', (req, res) => {
    res.send("Hello");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
