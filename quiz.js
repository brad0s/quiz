const start = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionEle = document.getElementById('question');
const answerButtonEle = document.getElementById('answer-buttons');

let shuffleQs, currQIndex

start.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currQIndex++
    setNextQuestion()
})

function startGame() {
    console.log("start game");
    start.classList.add('hide');
    shuffleQs = questions.sort(() => Math.random - .5);
    currQIndex = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffleQs[currQIndex]);
    
}

function showQuestion(question) {
    questionEle.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = answer.text;
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
       
        answerButtonEle.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    answerButtonEle.innerHTML = '';
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonEle.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if(shuffleQs.length > currQIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        start.innerText = 'Restart'
        start.classList.remove('hide')
    }
   
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers : [
            { text: '4', correct: true },
            { text: '22', correct: false },
        ]
    },
    {
        question: "What is the powerhouse of the cell?",
        answers: [
            { text: 'Osmosis', correct: false },
            { text: '4', correct: false },
            {text: 'mitochondria is the powerhouse of the cell', correct: true},
        ]
    },
    {
        question: 'Best Actor?',
        answers: [
            {text: 'Shia laBeouf', correct: true},
            {text: 'Ryan Gosling', correct: true},
            {text: 'Ryan Reyonlds', correct: true},
            {text: 'Timothy Chamelot', correct: false},
        ]
    }
]