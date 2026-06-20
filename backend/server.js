const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const donorRoutes = require("./src/routes/donorRoutes");
const requestRoutes = require("./src/routes/requestRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Blood Donation Portal API is running",
    routes: {
      donors: "/api/donors",
      search: "/api/donors/search?bloodGroup=O%2B&city=Chennai",
      requests: "/api/requests",
      adminLogin: "/api/admin/login"
    }
  });
});

app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
