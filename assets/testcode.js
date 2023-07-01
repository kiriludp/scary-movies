const myQuestions = [
  {
    question: "What year was the original `The Texas Chainsaw Massacre` released?",
    answers: {
      a: "2003",
      b: "1980",
      c: "1974"
    },
    correctAnswer: "c"
  },
  {
    question: "Who directed `Halloween`?",
    answers: {
      a: "John Carpenter",
      b: "Sam Rami",
      c: "George Romero"
    },
    correctAnswer: "a"
  },
  {
    choices: "What movie is the following quote from? `They're coming to get you, Barbara.",
    answers: {
      a: "Shaun of the Dead",
      b: "Dawn of the Dead",
      c: "Night of the Living Dead"
    },
    correctAnswer: "c"
  },
  {
    question: "How many movies are in the Saw franchise?",
    choices: {
      a: "10",
      b: "6",
      c: "9"
    },
    correctAnswer: "a"
  },
  {
    question: "Where is The Overlook located in The Shining?",
    answers: {
      a: "Maine",
      b: "New York",
      c: "Colorado"
    },
    correctAnswer: "c"
  },
  {
    question: "Who is the villian in Psycho?",
    answers: {
      a: "Norman Bateman",
      b: "Norman Bates",
      c: "Patrick Bates"
    },
    correctAnswer: "b"
  },
];

const startButton = document.querySelector("#start-button");
const submitButton = document.querySelector("#submit-button");
const answersElement = document.querySelector("#answers");
const quizContainer = document.querySelector("#quiz-container");
const timerElement = document.querySelector("#timer-count");
const recordScore = document.querySelector("#record-score");
const highscoresList = document.querySelector("#highscore-list");
const initialsElement = document.querySelector("#initials");
const homepage = document.querySelector('#quiz-start');


let timerCount = 30;
let questionIndex = 0;
let timerId;
let highscores = [];


function startQuiz() {
  homepage.style.display = "none";
  quizContainer.classList.remove("hide");
  timerId = setInterval(startTimer, 1000);
  timerElement.textContent = timerCount;
  displayQuestions();
}

function displayQuestions() {
  const question = myQuestions[questionIndex];
  document.querySelector("#question-title").textContent = question.question;
  const answers = question.answers
  .map(
    (answer, i) => `<button class="answer" value="${answer}" onclick= "questionClick(this)">
    ${i + 1}. ${answer}
    </button>`
  )
  .join(" ");
  answersElement.innerHTML = answers;
}

function questionClick(button) {
 const correctAnswer = button.value;
 if (correctAnswer !==quiz[questionIndex].correctAnswer){
  timerCount = Math.max(timerCount -5, 0);
 }
 questionIndex ++;
 if (questionIndex === quiz.length) {
  quizEnd();
 } else {
  displayQuestions();
 }
}

function quizEnd() {
  clearInterval(timerId);
  timerElement.textContent= timerCount;
  document.querySelector("#quiz-end").classList.remove("hide");
  recordScore.classList.remove("hide");
}

function startTimer() {
  timerCount--;
  timerElement.textContent = timerCount;
  if (timerCount === 0)
  quizEnd();
}

function scoreRecord() {
  const initials = initialsElement.value.trim();
  if (!initials) return;
  const highscore = { initials, score: timeLeft};
  highscores.push(highscore);

  highscores.sort((a, b) => b.score - a.score);
  const highscoresHtml = highscores
    .map((score, i) => `<li>${i + 1}. ${score.initials} - ${score.score}</li>`)
    .join("");
  highscoresList.innerHTML = highscoresHtml;
  quizContainer.classList.add("hide");
  document.querySelector("#quiz-end").classList.add("hide");
  recordScore.classList.remove("hide");
}

function showHighscores() {
  highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  const scores = highscores
    .map(
      (score) => `
    <li>${score.initials} - ${score.score}</li>
  `
    )
    .join("");
  highscoresList.innerHTML = scores;
}

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", quizEnd);


  






