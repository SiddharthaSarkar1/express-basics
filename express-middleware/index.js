const express = require("express");
const path = require("path");
const logger = require("morgan");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "./public/uploads" });

const app = express();
const PORT = 8080;

//Built-in middleware
app.use(express.json()); //This is body parser
app.use(express.urlencoded({ extended: true }));

//http://localhost:8080/mages/Avatar.png
app.use(express.static(path.join(__dirname, "public")));

//http://localhost:8080/static/images/Avatar.png
// app.use("/static", express.static(path.join(__dirname, "public")));

//Application-level middleware

const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date()} --- Request [${req.method}] [${req.url}]`);
  next();
};

app.use(loggerMiddleware);
//Third party middleware

// app.use(logger("dev"));
app.use(logger("combined"));

//Router-level middleware

app.use("/api/users", router);

const fakeAuth = (req, res, next) => {
  const authStatus = true;
  if (authStatus) {
    console.log("User authStatus: ", authStatus);
    next();
  } else {
    res.status(401);
    throw new Error("User is not authorized");
  }
};

const getUsers = (req, res) => {
  res.json({ message: "Get all users" });
};

const createUsers = (req, res) => {
  console.log("This is the request body received from client", req.body);
  res.json({ message: "Create new user" });
};

router.use(fakeAuth);
router.route("/").get(getUsers).post(createUsers);

//Error-handling middleware

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  switch (statusCode) {
    case 401:
      res.json({
        title: "Unothorized",
        message: err.message,
      });
      break;
    case 404:
      res.json({
        title: "Not Found",
        message: err.message,
      });
      break;
    case 500:
      res.json({
        title: "Server Error",
        message: err.message,
      });
      break;

    default:
      break;
  }
};

app.post(
  "/upload",
  upload.single("image"),
  (req, res, next) => {
    console.log(req.file, req.body);
    res.send(req.file);
  },
  (err, req, res, next) => {
    res.status(400).send({ err: err.message });
  }
);

//Wildcard route for 404 error
app.all("*", (req, res) => {
  res.status(404);
  throw new Error("Route not found");
});

app.use(errorHandler); //Error handler middlewares are used at app level

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
