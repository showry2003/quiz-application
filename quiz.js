let currentQuestionIndex = 0;
let score = 0;

// Elements references
const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const submitButton = document.getElementById("submit-btn");

// Sample questions array
const questions = [
  {
    question: "Which command will you use to update a Kubernetes deployment?",
    correct_answer:
      "kubectl setimage deployment/Deployment tomcat = tomcat:6.0",
    answers: {
      answer_a: "kubectl config view -o jsonpath='{.users[*].name}'",
      answer_b: "kubectl setimage deployment/Deployment tomcat = tomcat:6.0",
      answer_c: "kubectl config view user 1",
      answer_d: "kubectl get pv --sort-by=.spec.capacity.storage",
    },
  },
  {
    question: "What is the output of the command ‘umask –S’?",
    correct_answer: "Shows mask value using symbolic notion.",
    answers: {
      answer_a: "Shows mask value using octal values.",
      answer_b: "Removes the current mask value.",
      answer_c: "Shows mask value using symbolic notion.",
      answer_d: "Sets new mask value.",
    },
  },
  {
    question: "Which PHP function is used to get the length of a string?",
    correct_answer: "strlen($variable)",
    answers: {
      answer_a: "count($variable)",
      answer_b: "strcount($variable)",
      answer_c: "len($variable)",
      answer_d: "strlen($variable)",
    },
  },
  {
    question: "Which HTML tag is used for the title of a webpage?",
    correct_answer: "<title>",
    answers: {
      answer_a: "<head>",
      answer_b: "<body>",
      answer_c: "<title>",
      answer_d: "<html>",
    },
  },
];

// Function to display the current question
function displayQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];

  // Display the question
  questionElement.textContent = currentQuestion.question;

  // Display the answers as buttons
  Object.values(currentQuestion.answers).forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");
    button.addEventListener("click", () =>
      selectAnswer(button, currentQuestion.correct_answer)
    );
    answerButtons.appendChild(button);
  });

  // Show the navigation buttons
  updateButtons();
}

// Function to reset the state for the next question
function resetState() {
  answerButtons.innerHTML = ""; // Clear previous answers
  nextButton.classList.add("hidden");
  prevButton.classList.add("hidden");
  submitButton.classList.add("hidden");
}

// Function to update the visibility of navigation buttons
function updateButtons() {
  if (currentQuestionIndex < questions.length - 1) {
    nextButton.classList.remove("hidden");
  }
  if (currentQuestionIndex > 0) {
    prevButton.classList.remove("hidden");
  }
  if (currentQuestionIndex === questions.length - 1) {
    submitButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
  }
}

// Function to handle the answer selection
function selectAnswer(selectedButton, correctAnswer) {
  const allButtons = answerButtons.querySelectorAll("button");
  allButtons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
      if (button === selectedButton) score++;
    } else {
      button.classList.add("incorrect");
    }
  });
}

// Event listeners for navigation buttons
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  displayQuestion();
});

prevButton.addEventListener("click", () => {
  currentQuestionIndex--;
  displayQuestion();
});

submitButton.addEventListener("click", () => {
  quizContainer.innerHTML = `<h2>Quiz Completed</h2><p>Your score: ${score} / ${questions.length}</p>`;
});

// Initialize quiz
displayQuestion();
