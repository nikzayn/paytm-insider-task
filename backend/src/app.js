const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const app = express();

const port = 8080;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})