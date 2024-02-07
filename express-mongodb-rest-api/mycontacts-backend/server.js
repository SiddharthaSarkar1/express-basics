const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5050;

app.get('/api/contacts', (req, res) => {
    res.status(200);
    res.json({ message: "Get all contacts" });
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});