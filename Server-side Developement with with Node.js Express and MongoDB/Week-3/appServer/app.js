var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var FileStore = require("session-file-store")(session);

//* Adding router
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const dishRouter = require("./routes/dishRouter");
const leaderRouter = require("./routes/leaderRouter");
const promoRouter = require("./routes/promoRouter");

const mongoose = require("mongoose");
const Dishes = require("./models/dishes");
const Leaders = require("./models/leaders");
const Promotions = require("./models/promotions");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then(
	(db) => {
		console.log("Successfully connected to the server");
	},
	(err) => {
		console.log(err);
	}
);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser("12345-67890-09876-54321"));

//* Adding session middleware
app.use(
	session({
		name: "session-id",
		secret: "12345-67890-09876-54321",
		saveUninitialized: false,
		resave: false,
		store: new FileStore(),
	})
);

//* Adding authorization
const auth = (req, res, next) => {
	console.log(req.session);

	//*  If the cookie is not available then we will create new cookie
	if (!req.session.userName) {
		var authHeader = req.headers.authorization;

		if (!authHeader) {
			var err = new Error("You are not authenticated");
			res.setHeader("WWW-Authenticate", "Basic");
			err.status = 401;
			return next(err);
		}

		//* Extracting auth header
		var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
			.toString()
			.split(":");
		var userName = auth[0];
		var password = auth[1];

		if (userName === "admin" && password === "admin") {
			// res.cookie("userName", "admin", { signed: true });
			req.session.userName = "admin";
			next();
		} else {
			var err = new Error("You are not authenticated");
			res.setHeader("WWW-Authenticate", "Basic");
			err.status = 401;
			return next(err);
		}
	} else {
		//* If cookie is available on the server
		if (req.session.userName === "admin") {
			next();
		} else {
			var err = new Error("You are not authenticated");
			err.status = 401;
			return next(err);
		}
	}
};

app.use(auth);

app.use(express.static(path.join(__dirname, "public")));

//* Adding custom endpoints
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dishes", dishRouter);
app.use("/leaders", leaderRouter);
app.use("/promos", promoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
