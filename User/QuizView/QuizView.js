// QuizeView.js
var Quize = {
    Title: 'Example Quize',
    Marks: 10,
    questions: [
        {
            question: 'This Example Question  abcd abcd abcd abcd abcd abcd abcd abcd abcd',
            options: [
                'option Aywwwwwwwwwwwwwwwwshhshs ssshshss s shshss  yye dhdhd sh hdhs d dhsh d s d  hd hd shdh d hsh hdh hdshs hdhh shd hd h', 'option B', 'option C', 'Option D'
            ]
        },
        {
            question: 'This Example Question  abcd abcd abcd abcd abcd abcd abcd abcd abcd',
            options: [
                'option A', 'option B', 'option C', 'Option D'
            ]
        },
        {
            question: 'This Example Question  abcd abcd abcd abcd abcd abcd abcd abcd abcd',
            options: [
                'option A', 'option B', 'option C', 'Option D'
            ]
        },
        {
            question: 'This Example Question  abcd abcd abcd abcd abcd abcd abcd abcd abcd',
            options: [
                'option A', 'option B', 'option C', 'Option D'
            ]
        },
        {
            question: 'This Example Question  abcd abcd abcd abcd abcd abcd abcd abcd abcd',
            options: [
                'option A', 'option B', 'option C', 'Option D'
            ]
        }
    ]
}

function createQuize(quiz) {
    var Title = document.getElementById('title');
    var mark = document.getElementById('marks');
    var questions = document.getElementById('Questions');
    Title.innerHTML = quiz.title;
    mark.innerHTML = 'Each Questions:' + quiz.marksEach + ' Marks';
    for (let i = 0; i < quiz.questionCount; i++) {
        questions.appendChild(Built(quiz.questions[i], quiz.questions[i].options));
    }
}

function Built(question, options) {
    const ele = document.createElement('div');
    ele.className = 'Qestion-Options';
    var question = `
        <div class='Question' id=${question.id}>
           Q. ${question.des}
        </div>
        <div class='Options'>
            <span class='Option'><input type='radio' class='Tick' id=${options[0].id}/>${options[0].des}</span>
            <span class='Option'><input type='radio' class='Tick' id=${options[1].id}/>${options[1].des}</span>
            <span class='Option'><input type='radio' class='Tick' id=${options[2].id}/>${options[2].des}</span>
            <span class='Option'><input type='radio' class='Tick' id=${options[3].id}/>${options[3].des}</span>
        </div>`;
    ele.innerHTML = question;
    return ele;
}

document.getElementById('Questions').addEventListener('click', (evt) => {
    var target = evt.target;
    if (target.className != 'Tick') return;
    setOption(target);
})

// reset all other option of same question and mark only  clicked option
function setOption(ele) {
    var parent = ele.parentElement.parentElement;
    var allRadio = document.getElementsByClassName('Tick');
    for (let i = 0; i < allRadio.length; i++) {
        if (allRadio[i].parentElement.parentElement == parent && allRadio[i] != ele) {
            allRadio[i].checked = false;
        }
    }
}


async function getQuiz() {
    const quizId = sessionStorage.getItem('id');
    const res = await fetch(`http://localhost:3000/user/getquiz?quizId=${parseInt(quizId)}`);
    const {quiz} = await res.json();
    return quiz;
}

async function addAnswer(questionId,optionId){
    const quizId = sessionStorage.getItem('id');
    const query = `quizId=${quizId}&questionId=${questionId}&optionId=${optionId}`;
    const res = await fetch(`http://localhost:3000/user/addanswer?${query}`);
    const {response} = await res.json();
    return response;
}

async function TakeQuiz(){
    const quizId = sessionStorage.getItem('id');
    const query = `quizId=${quizId}`;
    const res = await fetch(`http://localhost:3000/user/takequiz?${query}`);
    const {answers} = await res.json();
    return answers;
}

window.onload = async(evt)=>{
    const quiz = await getQuiz();
    const prevans = await TakeQuiz();
    createQuize(quiz);
    console.log(quiz);
    console.log(prevans);
}