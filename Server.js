const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');


const auth = require('./Auth');
const admin = require('./Admin');
const Users = require('./User');
const adminQuizRoute = require('./AdminQuizRouter');
const userQuizRouter = require('./UserQuizRouter');

var app = express();

app.use(session({secret:'This is secret'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use('api/auth',auth);
app.use('api/admin/*',admin);
app.use('api/user/*',Users);
app.use('api/admin',adminQuizRoute);
app.use('api/user',userQuizRouter);

app.use('api/admin/QuizList',express.static('Admin/QuizList'));
// app.use('/admin/QuizView',express.static('Admin/QuizView'));
app.use('api/admin/QuizEdit',express.static('Admin/QuizEdit'));

app.use('api/user/QuizList',express.static('User/QuizList'));
app.use('api/user/QuizView',express.static('User/QuizView'));

app.get('api/',(req,res)=>{
    if(req?.session?.user?.type == 'admin'){
        res.redirect('/admin/QuizList/');
    }
    else if(req?.session?.user?.type == 'user'){
        res.redirect('/user/QuizList');
    }
    else{
        fs.readFile('index.html',(err,data)=>{
            if(err){
                res.send('<p>Error occured</p>')
            }
            else{
                res.send(data.toString());
            }
        });
    }
});

app.listen(3000,()=>{
    console.log('Server is running');
})
