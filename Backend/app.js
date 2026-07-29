require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const corsMiddleware = require('./middleware/cors');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(corsMiddleware);

app.get('/', async (req, res) => {
    res.send('HOME PAGE AND NODE JS SERVER STARTED !!!');
});

app.use('/', contactRoutes);

app.listen(PORT, () => {
    console.log(`Express JS Server Started on port ${PORT}`);
});
