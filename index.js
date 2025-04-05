require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// Middleware
app.use(express.static("public"));  // Serve static files (CSS, images, etc.)
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Home Route - Fetch Books from Database
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM books ORDER BY date_read DESC");
        res.render("index", { books: result.rows });
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).send("Error fetching books.");
    }
});

// Form to Add a New Book
app.get("/new", (req, res) => {
    res.render("new");
});

// Add a New Book
app.post("/add", async (req, res) => {
    const { title, author, rating, notes, date_read } = req.body;

    try {
        const result = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=1`);
        const coverId = result.data.docs.length > 0 ? result.data.docs[0].cover_i : null;
        const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : "/images/default-cover.jpg";

        await pool.query(
            "INSERT INTO books (title, author, rating, notes, date_read, cover_url) VALUES ($1, $2, $3, $4, $5, $6)",
            [title, author, rating, notes, date_read, coverUrl]
        );

        res.redirect("/");
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).send("Error adding book.");
    }
});

// Edit Book Page
app.get("/edit/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM books WHERE id = $1", [req.params.id]);
        res.render("edit", { book: result.rows[0] });
    } catch (err) {
        console.error("Error fetching book:", err);
        res.status(500).send("Error fetching book.");
    }
});

// Update Book Details
app.post("/update/:id", async (req, res) => {
    const { title, author, rating, notes, date_read } = req.body;

    try {
        await pool.query(
            "UPDATE books SET title = $1, author = $2, rating = $3, notes = $4, date_read = $5 WHERE id = $6",
            [title, author, rating, notes, date_read, req.params.id]
        );
        res.redirect("/");
    } catch (err) {
        console.error("Error updating book:", err);
        res.status(500).send("Error updating book.");
    }
});

// Delete a Book
app.post("/delete/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM books WHERE id = $1", [req.params.id]);
        res.redirect("/");
    } catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).send("Error deleting book.");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
