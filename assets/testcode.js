const myQuestions = [
  {
    question: "What year was the original `The Texas Chainsaw Massacre` released?",
    choices: [ "2003", "1980","1974"
    ],
    answer: "1974"
  },
  {
    question: "Who directed `Halloween`?",
    choices: [
      "John Carpenter", "Sam Rami", "George Romero"
    ],
    answer: "John Carpenter"
  },
  {
    choices: "What movie is the following quote from? `They're coming to get you, Barbara.",
    choices: [ "Shaun of the Dead", "Dawn of the Dead","Night of the Living Dead"
  ],
    answer: "Night of the Living Dead"
  },
  {
    question: "How many movies are in the Saw franchise?",
    choices: [
       "10",
       "6",
       "9"
    ],
    answer: "10"
  },
  {
    question: "Where is The Overlook located in The Shining?",
    choices: ["Maine","New York","Colorado"
  ],
    answer: "Colorado"
  },
  {
    question: "Who is the villian in Psycho?",
    choices: [
       "Norman Bateman","Norman Bates","Patrick Bates"
      ],
    answer: "Norman Bates"
  },
];

const startButton = document.querySelector("#start-button");
const submitButton = document.querySelector("#submit-button");
const nextButton = document.querySelector("#next-button");
const choicesElement = document.querySelector("#choices");
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
  displayQuestion();
}

function displayQuestion() {
  const question = myQuestions[questionIndex];
  document.querySelector("#question-title").textContent = question.question;
  const choices = question.choices
    .map(
      (choice, i) => `
      <label> <input type="radio" class="choice" value="${choice}">
      ${i + 1}. ${choice}
    </label>
  `
    )
    .join("");
  choicesElement.innerHTML = choices;
}

function questionClick(radio) {
  const answer = radio.value;
  if (answer !== myQuestions[questionIndex].answer) {
    timerCount = Math.max(timerCount - 5, 0); // subtract 5 seconds for wrong answers
  }
  questionIndex++;
  if (questionIndex === myQuestions.length) {
    quizEnd();
  } else {
    displayQuestion();
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
  const highscore = { initials, score: timeCounter};
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
nextButton.addEventListener("click", displayQuestion);