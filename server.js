const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const app = express();

// DB CONFIG
const db = require("./config/keys").mongoURI;

mongoose.connect(db)
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log("Error", err));

app.get("/", (req, res) => res.send("Hello there"));

// USE ROUTES
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log("Server listening on port ", port);
});