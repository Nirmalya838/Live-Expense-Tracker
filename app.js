const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./models/user');
const Order = require('./models/order');
const Expense = require('./models/expense');
const sequelize = require('./database/db');

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
const paymentRoute = require('./routes/paymentRoute');
const premiumRoute = require('./routes/premiumRoute');


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
app.use(paymentRoute);
app.use(premiumRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then(()=>{
    app.listen(port, () => console.log(`Listening on port ${port}`));
})
.catch(err => console.log(err))



