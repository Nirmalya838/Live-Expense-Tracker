const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const postSignRoute = require('./routes/postSignRoute');
const getSignRoute = require('./routes/getSignRoute');
const postLoginRoute = require('./routes/postLoginRoute');
const getLoginRoute = require('./routes/getLoginRoute');
const getExpenseRoute = require('./routes/getExpenseRoute');
const postExpenseRoute = require('./routes/postExpenseRoute');
const getExpenseDetailsRoute = require('./routes/getExpenseDetailsRoute');
const deleteExpenseRoute = require('./routes/deleteExpenseRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(getSignRoute);
app.use(postSignRoute);
app.use(postLoginRoute);
app.use(getLoginRoute);
app.use(getExpenseRoute);
app.use(postExpenseRoute);
app.use(getExpenseDetailsRoute);
app.use(deleteExpenseRoute);


app.listen(port, () => console.log(`Listening on port ${port}`));
