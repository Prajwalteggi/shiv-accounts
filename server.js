const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",       // change to your username
  host: "localhost",
  database: "myappdb",    // change to your database
  password: "your_password", // change to your password
  port: 5432,
});

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Users endpoints
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/users", async (req, res) => {
  const { name, email, role, password } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, role, password, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [name, email, role, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE users SET name = $1, email = $2, role = $3, status = $4, updated_at = NOW() 
       WHERE id = $5 RETURNING *`,
      [name, email, role, status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Chart of Accounts endpoints
app.get("/api/accounts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM chart_of_accounts ORDER BY account_code");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/accounts", async (req, res) => {
  const { account_name, type, sub_type, account_code, description } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO chart_of_accounts (account_name, type, sub_type, account_code, description, created_at) 
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [account_name, type, sub_type, account_code, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create account" });
  }
});

app.put("/api/accounts/:id", async (req, res) => {
  const { id } = req.params;
  const { account_name, type, sub_type, account_code, description } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE chart_of_accounts SET account_name = $1, type = $2, sub_type = $3, 
       account_code = $4, description = $5, updated_at = NOW() 
       WHERE id = $6 RETURNING *`,
      [account_name, type, sub_type, account_code, description, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Account not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update account" });
  }
});

app.delete("/api/accounts/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query("DELETE FROM chart_of_accounts WHERE id = $1 RETURNING *", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Account not found" });
    }
    
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete account" });
  }
});

// Dashboard statistics endpoint
app.get("/api/dashboard/stats", async (req, res) => {
  try {
    const [usersResult, accountsResult] = await Promise.all([
      pool.query("SELECT COUNT(*) as count FROM users"),
      pool.query("SELECT COUNT(*) as count FROM chart_of_accounts")
    ]);
    
    res.json({
      totalUsers: parseInt(usersResult.rows[0].count),
      totalAccounts: parseInt(accountsResult.rows[0].count),
      totalRevenue: 0, // Placeholder
      totalExpenses: 0  // Placeholder
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
