const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
app.set('view engine', 'ejs'); 

const postSignRoute = require('./routes/postSignRoute');
const getSignRoute = require('./routes/getSignRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(getSignRoute);
app.use(postSignRoute);


app.listen(port, () => console.log(`Listening on port ${port}`));
