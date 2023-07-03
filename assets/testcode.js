
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
const choicesElement = document.querySelector("#choices");
const quizContainer = document.querySelector("#quiz-container");
const timerElement = document.querySelector("#timer-count");
const feedbackElement = document.querySelector("#feedback");
const submitButton = document.querySelector("#submit-button");
const homepage = document.querySelector("#quiz-start");

let timerCount = myQuestions.length * 5; // initial quiz time in seconds
let questionIndex = 0;
let timerId;
let highscores = [];

function startQuiz() {
  homepage.style.display = "none";
  quizContainer.classList.remove("hide");
  timerId = setInterval(clockTick, 1000);
  timerElement.textContent = timerCount;
  displayQuestion();
}

function displayQuestion() {
  const question = myQuestions[questionIndex];
  document.querySelector("#question-title").textContent = question.question;
  const choices = question.choices
    .map(
      (choice, i) => `
    <label><input type="radio" class="choice" value="${choice}" >
      ${i + 1}. ${choice}
    </label>
  `
    )
    .join("");
  choicesElement.innerHTML = choices;
}

function answerCheck() {
  const answer = (answerContainer.querySelector(selector) || {}).value;
  let numCorrect = 0;
  if (answer === myQuestions[questionIndex].answer) {
    numCorrect++;
  } else {
    timerCount = Math.max(timerCount -5, 0);
  }
  if (questionIndex === myQuestions.length) {
    quizEnd();
  } else {
    displayQuestion();
  }
}

function nextQuestion()
  var selector = `input[name= myQuestions${questionIndex}.answer]:checked`;
  if (questionIndex === myQuestions.length)


function quizEnd() {
  clearInterval(timerId);
  timerElement.textContent = timerCount;
  document.querySelector("#quiz-end").classList.remove("hide");
  
}

function clockTick() {
  timerCount--;
  timerElement.textContent = timerCount;
  if (timerCount === 0) {
    quizEnd();
  }
}