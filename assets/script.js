
var timer;
var timerCount;
var results;
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");



(function(){
  // Functions
  function buildQuiz(){

    timerCount = 30;
      startTimer()
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

	

function startTimer() {
  //sets timer
 timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      //tests if user answer is correct; adds 5 seconds to total time.
      if (userAnswer === currentQuestion.correctAnswer) {
        (timer=Math.max(timer +5,0) );
      } else {
        timer=Math.max(timer -5, 0);
      }
    }
  if (timerCount === 0 ) {
    clearInterval(timer);
    getResults();
  }
  }, 1000);
}


  

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }


const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

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


// Kick things off
buildQuiz();

// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Show the first slide
showSlide(currentSlide);

// Event listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
})();