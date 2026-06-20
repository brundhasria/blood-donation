const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginAdmin(req, res) {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminEmail || !adminPassword || !jwtSecret) {
    return res.status(500).json({ message: "Admin environment variables are not configured" });
  }

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const emailMatches = email.toLowerCase() === adminEmail.toLowerCase();
  const passwordMatches = adminPassword.startsWith("$2")
    ? await bcrypt.compare(password, adminPassword)
    : password === adminPassword;

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    {
      role: "admin",
      email: adminEmail
    },
    jwtSecret,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Admin login successful",
    token
  });
}

module.exports = {
  loginAdmin
};
