
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const answerContainers = quizContainer.querySelectorAll('.answers');
const selector = `input[name=question${questionNumber}]: checked`;
const userAnswer = (answerContainer.querySelector(selector) || {}).value;
const homePage = document.getElementById("homepage");
const body = document.getElementById("quiz-body");
const end = document.getElementById("endQuiz");
const startButton = document.getElementById("start");
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.slide');
const highResults = document.querySelector('.high-results');
const scoreList = document.querySelector('.highscore-list');
const initialsElement = document.querySelector('#initials');


var timer;
var timerCounts;
var timerElement = document.querySelector(".timer-count");
var highScore =[];
const output = [];
const answers = [];

//function to display homepage and hide quiz/buttons

(function(){

  function init() {
    pagesHide();
    startTimer();
  }
  function buildQuiz(){

  timerCount= 30;
  startTimer()

  myQuestions.forEach((currentQuestion, questNumber) =>
  {
    for(letter in currentQuestion.answers) {
      answers.push(
        `<label>
        <input type="radio" name="question${questionNumber}
        value= "${letter}">
        ${letter} :
        ${currentQuestion.answers[letter]}
        </label>`
      );
    }
    output.push(
      `<div class="slide">
      <div class=question">
      ${currentQuestion.question} </div>
      <div class="answers">
      ${answers.join(" ")} </div>
      </div>`
    );
  });

  quizContainer.innerHTML = output.join(" ");
}
}

) 

function startTimer() {
  timer = setInterval(function() {
    timerCount --;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      if (userAnswer !== currentQuestion.correctAnswer) {
        timerCounts = Math.max(timer -5, 0);
      }
    }
    if (timerCount ===0) {
      clearInterval(timer);
      getResults();
    }
  }, 1000);
}

function showResults() {
let numCorrect = 0;
myQuestions.forEach( ( currentQuestion, questionNumber) => {
  if(userAnswer === currentQuestion.correctAnswer) {
 
    numCorrect++;
    answerContainers[questionNumber].style.color = 'lightgreen';
  }else{
    answerContainers[questionNumber.style.color = 'red']
  }

});

resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

}

function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');

    currentSlide = n;
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
}

function showNextSlide() {
  showSlide(currentSlide +1);
}

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
    question: "What movie is the following quote from? `They're coming to get you, Barbara.",
    answers: {
      a: "Shaun of the Dead",
      b: "Dawn of the Dead",
      c: "Night of the Living Dead"
    },
    correctAnswer: "c"
  },
  {
    question: "How many movies are in the Saw franchise?",
    answers: {
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

buildQuiz();

let currentSlide = 0;

showSlide(currentSlide);

submitButton.addEventListener('click', showResults);
nextButton.addEventListener('click', showNextSlide);
startButton.addEventListener('click', buildQuiz);



function quizResults () {
  document.getElementById("submit").onClick= function() {
  document.getElementById("end").style.display="block";
  document.getElementById("body").style.display='none';

  }
}