const express = require('express');
const AdminQuizRoute = require('./AdminQuizRouter');
const UserQuizRouter = require('./UserQuizRouter');

var app = express();
app.use('/admin',AdminQuizRoute);
app.use('/user',UserQuizRouter);

app.listen(3000,()=>{
    console.log('Server is listening .. ');
})