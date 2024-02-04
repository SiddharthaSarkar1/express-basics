const express = require("express");

const app = express();

const PORT = 5050;

app.get("/", (req, res) => {
  // res.send("Hello World");
  res.json({
    message: "Hello World",
  });
});

app.get("/users", (req, res) => {
  res.json({
    message: "Get all the Users.",
  });
});

app.get("/users/:id", (req, res) => {
  res.json({
    message: `Get user with ID ${req.params.id}`,
  });
});

app.post("/users", (req, res) => {
  res.json({
    message: `Create new user.`,
  });
});

app.put("/users/:id", (req, res) => {
  res.json({
    message: `Update user with ID ${req.params.id}`,
  });
});

app.delete("/users/:id", (req, res) => {
  res.json({
    message: `Delete user with ID ${req.params.id}`,
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
