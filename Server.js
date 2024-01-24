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
        // const files = fs.readdirSync('./');
        // fs.readFile('./hello.html',(err,data)=>{
        //     if(err){ 
        //         res.send(`<h1>${JSON.stringify(err)},${JSON.stringify(files)}</h1>`)
        //     }
        //     else{
        //         res.send(data.toString());
        //     }
        // });
        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login and Signup Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        input {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            padding: 10px;
            background-color: #3498db;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #2980b9;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Login Form -->
        <button id="toggleBtn" onclick="toggleForms()">Switch to Signup</button>
        <form id="loginForm" action="./auth/login" method="post">
            <h2>Login</h2>
            <label for="loginUsername">Username:</label>
            <input type="text" id="loginUsername" name="loginUsername" required>
            <label for="loginPassword">Password:</label>
            <input type="password" id="loginPassword" name="loginPassword" required>
            <button type="submit">Login</button>
        </form>

        <!-- Signup Form -->
        <form id="signupForm" style="display: none;" action="./auth/signup" method="post">
            <h2>Signup</h2>
            <label for="signupUsername">Username:</label>
            <input type="text" id="signupUsername" name="signupUsername" required>
            <label for="signupPassword">Password:</label>
            <input type="password" id="signupPassword" name="signupPassword" required>
            <button type="submit">Signup</button>
        </form>
    </div>

    <script>
        

        function toggleForms() {
            const loginForm = document.getElementById('loginForm');
            const signupForm = document.getElementById('signupForm');
            const toggleBtn = document.getElementById('toggleBtn');

            if (loginForm.style.display === 'none') {
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
                toggleBtn.textContent = 'Switch to Signup';
            } else {
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
                toggleBtn.textContent = 'Switch to Login';
            }
        }

        // Set initial state
        document.addEventListener('DOMContentLoaded', () => {
            toggleForms();
        });
    </script>
</body>
</html>`);
    }
});

// app.listen(3000,()=>{
//     console.log('Server is running');
// })

module.exports = app;
