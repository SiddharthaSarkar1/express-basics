const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnecrtion");
const dotenv = require("dotenv").config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');

connectDB();
const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());//This is body parser

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});