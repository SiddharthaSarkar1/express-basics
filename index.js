const express = require('express');

const app = express();

const PORT = 5050;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})