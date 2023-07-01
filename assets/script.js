
const answerContainers = quizContainer.querySelectorAll('.answers');
const answerContainer = answerContainers[questionNumber];
const selector = `input[name=question${questionNumber}]:checked`;
const userAnswer = (answerContainer.querySelector(selector) || {}).value;
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById("results");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById('submit');
const slides = document.querySelectorAll(".slide");
var timer;
var timerCount;
var results;
var timerElement = document.querySelector(".timer-count");
var highScore =[];
const output= [];
const answers = [];

//function to display homepage and hide quiz/buttons

function quizHome() {
  //need a boolean to dictate if the timer should start or not
  homePage.style.display = "none";
  body.classList.remove("hide");
  timerCount = 30;
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

function showSlide(n) {
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
  

  }
}