
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const answerContainers = quizContainer.querySelectorAll('.answers');
const selector = `input[name=question${questionNumber}]: checked`;
const userAnswer = (answerContainer.querySelector(selector) || {}).value;
const homePage = document.querySelector(".homepage");
const body = document.querySelector(".torso");
const startButton = document.querySelector("#startBtn");
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

function quizHome() {
  //need a boolean to dictate if the timer should start or not
  homePage.style.display = "none";
  body.classList.remove("hide");
  timerCount = 30;
  startTimer()
  
}

function buildQuiz() {
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {
      for(letter in currentQuestion.answers) {
        answers.push(
          `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${letter} :
          ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      output.push(
        `<div class="slide">
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join(" ")} </div>
        </div>`
      );
    }
  );

  quizContainer.innerHTML = output.join(' ');
}

// function to start the timer

function startTimer() {
  //sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      //checks if an answer is wrong; if true, deduce time
      if  (userAnswer !== currentQuestion.correctAnswer) {
        timerCounts = Math.max(timerCounts -5, 0); 
      }
    }
      if (timerCount === 0) {
        clearInterval(timer); 
          quizOver();
          getResults();
    }
  },1000 ); 

}

function showResults() {
  let numCorrect = 0;

  myQuestions.forEach( (currentQuestion, questionNumber) => {

    if(userAnswer === currentQuestion.correctAnswer) {
      numCorrect ++;
      answerContainers[questionNumber].style.color = 'lightgreen';
    }else {
    answerContainers[questionNumber].style.color = 'red';
    }
  });
  resultsContainer.innerHTML= `${numCorrect} out of ${myQuestions.length}`;
}

function showSlide (n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if (currentSlide === slides.length-1) {
    nextButton.style.display='none';
    submitButton.style.display= 'inline-block';
  }else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  } 
  }

  function showNextSlide() {
    showSlide(currentSlide +1);
  }
  
