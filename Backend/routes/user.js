const { Router } = require("express");
const User = require("../models/user");
const { createHmac } = require("crypto");
const { generateToken, verifyToken } = require("../service/auth");

const router = Router();

router.post("/signup", async (req, res) => {
  if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User already exists with this email" });
    }

  await User.create({ name, email, password });

    res.status(201).json({
      message: "Signup successful",
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  // console.log("Request body:-->", req.body);
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

      // Step 2: Hash the password with user's stored salt
    const hashedPassword = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    // Step 3: Compare hashes
    if (hashedPassword !== user.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None", // "None" if using cross-origin in production with HTTPS
        secure: true, // true if using HTTPS (e.g., on Vercel)
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
      });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/logOut", (req, res) => {
  console.log("Logging out user");
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
