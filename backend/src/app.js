//Modules
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

//Express Setup
const app = express();

//Port
const port = 8080;

//Cross Origin 
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})