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


app.use('/auth',auth);
app.use('/admin/*',admin);
app.use('/user/*',Users);
app.use('/admin',adminQuizRoute);
app.use('/user',userQuizRouter);

app.use('/admin/QuizList',express.static('Admin/QuizList'));
// app.use('/admin/QuizView',express.static('Admin/QuizView'));
app.use('/admin/QuizEdit',express.static('Admin/QuizEdit'));

app.use('/user/QuizList',express.static('User/QuizList'));
app.use('/user/QuizView',express.static('User/QuizView'));

app.get('/',(req,res)=>{
    if(req?.session?.user?.type == 'admin'){
        res.redirect('/admin/QuizList/');
    }
    else if(req?.session?.user?.type == 'user'){
        res.redirect('/user/QuizList');
    }
    else{
        const files = fs.readdirSync('./');
        fs.readFile('./hello.html',(err,data)=>{
            if(err){ 
                res.send(`<h1>${JSON.stringify(err)},${JSON.stringify(files)}</h1>`)
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
