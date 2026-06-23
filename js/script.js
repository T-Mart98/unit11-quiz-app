/* =====================================================
   Quiz App - Your Unit 11 Project
   =====================================================

   Your mission: Build a 3-view quiz app with modular functions!

   The default scaffold is a quiz with three screens:
   - Home: explains the quiz, has a Start button
   - Quiz: shows one question at a time with choices
   - Results: shows the final score

   The user clicks Start -> answers 5 questions -> sees results.
   The Play Again button resets and takes them back to Home.

   You can also build your OWN multi-view app. Some ideas:
   - Form Wizard (intro -> questions -> summary)
   - Mini RPG (character select -> battle -> win/lose)
   - Flashcard Trainer (deck setup -> cards -> completion)
   - Todo App (input -> list -> completed list)
   - Survey App (intro -> 3+ steps -> thank you)

   Requirements:
   - 3+ distinct views (sections shown/hidden with JS)
   - Navigation that switches views without reloading
   - 4+ named functions (goToView, startQuiz, handleAnswer, etc.)
   - 2+ state variables tracked across views
   - DOM updates based on user input
   - Reset/restart that returns to home
   ===================================================== */


// =====================================================
// STEP 1: Create your questions array
// =====================================================
// Hint: An array of objects. Each object has:
// - question (string)
// - choices (array of 4 strings)
// - correctIndex (which choice is right, 0-3)
//
// Example:
// const questions = [
//   {
//     question: "What does the 'this' keyword refer to inside a class?",
//     choices: [
//       "The global window",
//       "The current object instance",
//       "The parent class",
//       "Nothing"
//     ],
//     correctIndex: 1
//   },
//   // ... 4 more questions
// ];
//
// Write your questions array here (need at least 5):

const questions = [
  {
    question: "What color is an airplane black box?",
    choices: [
      "Orange",
      "Red",
      "Black",
      "Blue"
    ],
    correctIndex: 0
  },

  {
    question: "When did the first “Avatar” movie come out?",
    choices: [
      "2008",
      "2009",
      "2010",
      "2007"
    ],
    correctIndex: 1
  },

  {
    question: "What is considered the oldest human civilization?",
    choices: [
      "Egypt",
      "Mesoamerica",
      "Tenochtitlan",
      "Mesopotamia"
    ],
    correctIndex: 3
  },

  {
    question: "What was the original purpose of bubble wrap?",
    choices: [
      "Flooring",
      "Cooling material",
      "Textured wallpaper",
      "Insulation"
    ],
    correctIndex: 2
  },

  {
    question: "Which Italian city was the birthplace of pizza?",
    choices: [
      "Naples",
      "Venice",
      "Florence",
      "Rome"
    ],
    correctIndex: 0
  },

];


// =====================================================
// STEP 2: Set up state variables + DOM references
// =====================================================
// State at the TOP of your script (so all functions can use):
// - currentQuestion (index in the questions array, starts at 0)
// - score (starts at 0)
// - hasAnswered (boolean, prevents double-answering, starts at false)
//
// DOM references:
// - startBtn, restartBtn, nextBtn
// - progressText, progressFill
// - questionText, choicesList, feedbackText
// - scoreNumber, scoreMessage
//
// Write your code here:
let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const nextBtn = document.getElementById("nextBtn");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const choicesList = document.getElementById("choicesList");
const feedbackText = document.getElementById("feedbackText");
const scoreNumber = document.getElementById("scoreNumber");
const scoreMessage = document.getElementById("scoreMessage");

// =====================================================
// STEP 3: Write the goToView function
// =====================================================
// Hint: This is the heart of multi-view apps!
//
// function goToView(viewId) {
//   document.querySelectorAll(".view").forEach(view => {
//     view.classList.remove("active");
//   });
//   document.getElementById(viewId).classList.add("active");
// }
//
// Write your goToView function here:

function goToView(viewId) {
  document.querySelectorAll(".view").forEach(view => {
    view.classList.remove("active");
  });
  document.getElementById(viewId).classList.add("active");
}


// =====================================================
// STEP 4: Write the displayQuestion function
// =====================================================
// Hint: This function shows the current question on the quiz view.
//
// function displayQuestion() {
//   // Get the current question object from the array
//   let q = questions[currentQuestion];
//
//   // Update progress
//   progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
//   progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
//
//   // Set the question text
//   questionText.textContent = q.question;
//
//   // Clear old choices and create new buttons
//   choicesList.innerHTML = "";
//   q.choices.forEach((choice, index) => {
//     let btn = document.createElement("button");
//     btn.className = "choice-btn";
//     btn.textContent = choice;
//     btn.addEventListener("click", function() {
//       handleAnswer(index, btn);
//     });
//     choicesList.appendChild(btn);
//   });
//
//   // Reset state
//   feedbackText.textContent = "";
//   feedbackText.className = "feedback";
//   nextBtn.disabled = true;
//   hasAnswered = false;
// }
//
// Write your displayQuestion function here:

function displayQuestion() {
  let q = questions[currentQuestion];

  progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  questionText.textContent = q.question;

  choicesList.innerHTML = "";
  q.choices.forEach((choice, index) => {
    let btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", function() {
      handleAnswer(index, btn);
    });
    choicesList.appendChild(btn);
  });

  feedbackText.textContent = "";
  feedbackText.className = "feedback";
  nextBtn.disabled = true;
  hasAnswered = false;
}


// =====================================================
// STEP 5: Write the handleAnswer function
// =====================================================
// Hint: This runs when the user picks a choice.
//
// function handleAnswer(pickedIndex, clickedBtn) {
//   if (hasAnswered) return;   // GUARD: can only answer once
//   hasAnswered = true;
//
//   const correctIndex = questions[currentQuestion].correctIndex;
//
//   if (pickedIndex === correctIndex) {
//     clickedBtn.classList.add("correct");
//     feedbackText.textContent = "\u2705 Correct!";
//     feedbackText.classList.add("correct");
//     score = score + 1;
//   } else {
//     clickedBtn.classList.add("wrong");
//     feedbackText.textContent = "\u274c Wrong!";
//     feedbackText.classList.add("wrong");
//     // Also highlight the correct answer
//     const allBtns = document.querySelectorAll(".choice-btn");
//     allBtns[correctIndex].classList.add("correct");
//   }
//
//   // Disable all choice buttons
//   document.querySelectorAll(".choice-btn").forEach(btn => {
//     btn.disabled = true;
//   });
//
//   nextBtn.disabled = false;
// }
//
// Write your handleAnswer function here:

function handleAnswer(pickedIndex, clickedBtn) {
  if (hasAnswered) return;   
  hasAnswered = true;

  const correctIndex = questions[currentQuestion].correctIndex;

  if (pickedIndex === correctIndex) {
    clickedBtn.classList.add("correct");
    feedbackText.textContent = "\u2705 Correct!";
    feedbackText.classList.add("correct");
    score = score + 1;
  } else {
    clickedBtn.classList.add("wrong");
    feedbackText.textContent = "\u274c Wrong!";
    feedbackText.classList.add("wrong");
    
    const allBtns = document.querySelectorAll(".choice-btn");
    allBtns[correctIndex].classList.add("correct");
  }

  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.disabled = true;
  });

  nextBtn.disabled = false;
//Bonus running score during the quiz
  document.getElementById('liveScore').textContent = `${score}/5`;
}


// =====================================================
// STEP 6: Write the rest of the modular functions
// =====================================================
// You need:
//
// function startQuiz() {
//   currentQuestion = 0;
//   score = 0;
//   displayQuestion();
//   goToView("quizView");
// }
//
// function nextQuestion() {
//   currentQuestion = currentQuestion + 1;
//   if (currentQuestion < questions.length) {
//     displayQuestion();
//   } else {
//     showResults();
//   }
// }
//
// function showResults() {
//   scoreNumber.textContent = score;
//   if (score === questions.length) {
//     scoreMessage.textContent = "Perfect score! Amazing!";
//   } else if (score >= 3) {
//     scoreMessage.textContent = "Nice work!";
//   } else {
//     scoreMessage.textContent = "Give it another try!";
//   }
//   goToView("resultsView");
// }
//
// function resetQuiz() {
//   currentQuestion = 0;
//   score = 0;
//   goToView("homeView");
// }
//
// Write these four functions here:

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  displayQuestion();
  goToView("quizView");
}

function nextQuestion() {
  currentQuestion = currentQuestion + 1;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  scoreNumber.textContent = score;
  if (score === questions.length) {
    scoreMessage.textContent = "Perfect score! Amazing!";
  } else if (score >= 3) {
    scoreMessage.textContent = "Nice work!";
  } else {
    scoreMessage.textContent = "Give it another try!";
  }
  goToView("resultsView");
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  goToView("homeView");
}


// =====================================================
// STEP 7: Wire up the buttons
// =====================================================
// Hint:
// startBtn.addEventListener("click", startQuiz);
// nextBtn.addEventListener("click", nextQuestion);
// restartBtn.addEventListener("click", resetQuiz);
//
// Write your event listeners here:

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", resetQuiz);


// =====================================================
// BONUS CHALLENGES (Pick at least 1!)
// =====================================================
//
// BONUS 1: Show running score during the quiz
// Add a "Score: X" display that updates as they answer.
//
//
// BONUS 2: Timer per question
// Give them 10 seconds per question. If they don't answer, count wrong.
//
//
// BONUS 3: High score tracking
// Track the best score across multiple rounds.
//
//
// BONUS 4: Shuffle questions
// Randomize the order of questions each time the quiz starts.
// Hint: questions.sort(() => Math.random() - 0.5)



// =====================================================
// DONE! Save and open index.html.
// Test:
// - Home view shows on load
// - Click Start - goes to quiz view, question 1 shows
// - Click a choice - shows green/red feedback
// - Click Next - moves to question 2
// - After 5 questions - results view shows your score
// - Click Play Again - back to home, ready for another round
//
// You built a real multi-screen app! \ud83c\udfaf
// =====================================================
