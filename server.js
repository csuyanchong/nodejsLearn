require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const corsOption = require("./config/corsOption");

const path = require("path");
const { logEventsAsync } = require("./middleware/logEvents");
const PORT = process.env.PORT || 3500;

const pathIndex = path.join(__dirname, "views", "index.html");
const path404 = path.join(__dirname, "views", "404.html");
const pathPublic = path.join(__dirname, "public");

const mongoose = require("mongoose");

const connectDB = require("./config/dbConn");
connectDB();

const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

// cross origin resource sharing
app.use(cors(corsOption));

// serve static files
app.use(express.static(pathPublic));

// log
app.use((req, res, next) => {
   logEventsAsync(req.origin, req.url, req.method);
   next();
});

// built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

// cookies
app.use(cookieParser());

//routers
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/refresh", require("./routes/refresh"));

// api
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employee"));


app.get("/", (req, res) => {
   logEventsAsync("请求", req.headers.origin, req.method);

   res.sendFile(pathIndex);
});

app.all("*", (req, res) => {
   res.status(404);
   if (req.accepts("html")) {
      res.sendFile(path404);
   } else if (req.accepts("json")) {
      res.json({ error: "404 Not Found" });
   } else {
      res.type("txt").send("404 Not Found");
   }
});

mongoose.connection.once("open", () => {
   console.log("Connected to MongoDB");
   app.listen(PORT, () => {
      console.log(`Server is runing on port ${PORT}`);
   });
});
