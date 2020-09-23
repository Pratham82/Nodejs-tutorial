const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dishRouter = require("./routers/dishRouter");
const leaderRouter = require("./routers/leaderRouter");
const promoRouter = require("./routers/promoRouter");

const hostname = "localhost";
const port = 3000;

const app = express();
//* Use morgan with development mode
app.use(morgan("dev"));

//* adding middleware
app.use(bodyParser.json());

//* Mounting the routers
//* This means that any request coming to the '/dishes/' endpoint will handled by dishRouter
app.use("/dishes", dishRouter);
app.use("/leaders", leaderRouter);
app.use("/promos", promoRouter);

//* Serving public folders
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	res.end("<html><body><h1>This is express server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, () =>
	console.log(`Server running on port: ${port}`)
);

//* Alternative way for starting server
// app.listen(3000, () => console.log(`Server running on port 3000`));
