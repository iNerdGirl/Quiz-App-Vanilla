const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const hudQuestionText = document.querySelector('#hud-question-text');
const hudScoreText = document.querySelector('#hud-score-text');
const progressBarFill = document.querySelector('#progress-bar-fill');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let avaialbleQuestions = [];

let questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript??',
    choice1: '<script>',
    choice2: '<javascript>',
    choice3: '<js>',
    choice4: '<scripting>',
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

// MARK - GAME FUNCTIONS
const startGame = () => {
  questionCounter = 0;
  score = 0;
  avaialbleQuestions = [...questions];
  getNewQuestion();
};

const getNewQuestion = () => {
  if (avaialbleQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('./end.html');
  }
  questionCounter++;

  hudQuestionText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  progressBarFill.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

  const questionIndex = Math.floor(Math.random() * avaialbleQuestions.length);
  currentQuestion = avaialbleQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  avaialbleQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }
    
    if (classToApply === 'incorrect') {
      decrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1500);
  });
});

const incrementScore = num => {
  score += num;
  hudScoreText.innerText = score;
}

const decrementScore = num => {
  score -= num;
  hudScoreText.innerText = score;
}

startGame();
