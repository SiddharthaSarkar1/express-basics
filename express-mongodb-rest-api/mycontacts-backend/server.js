const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());//This is body parser
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});