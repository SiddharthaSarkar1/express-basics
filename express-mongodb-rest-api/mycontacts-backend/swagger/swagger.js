const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My Contacts Backend API",
    description: "My Contacts Backend API",
  },
  host: "localhost:8080",
};

const outputFile = "./swagger-output.json";
const routes = ["../routes/contactRoutes.js", "../routes/userRoutes.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
  root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
