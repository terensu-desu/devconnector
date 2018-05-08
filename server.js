const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();
// BODYPARSER CONFIG
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB CONFIG
const db = require("./config/keys").mongoURI;

mongoose.connect(db)
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log("Error", err));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());

// PASSPORT CONFIG
require("./config/passport")(passport);

// USE ROUTES
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log("Server listening on port ", port);
});