const questionElement = document.getElementById("question");
const answerContainer = document.getElementById("answers-container");

let questions;

async function fetching() {
  const url =
    "https://quizapi.io/api/v1/questions?apiKey=VSlw4ubV6YFOFu3nkCIx8VZvZNyO7VG8SuXWxiwC&limit=20";
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    questions = result;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function displayQuestions() {
  await fetching();

  // Clear previous answers
  answerContainer.innerHTML = "";

  questions.forEach(function (ques) {
    questionElement.textContent = ques.question;
    getAnswers(ques);
  });
}

function getAnswers(ques) {
  const answers = ques.answers;

  for (let key in answers) {
    // Only display non-empty answers
    if (answers[key]) {
      let button = document.createElement("button");
      button.textContent = answers[key];

      // Add an event listener for each button
      button.addEventListener("click", () => {
        alert(`You selected: ${answers[key]}`);
        // You can add more logic here to check the correctness of the answer
      });

      answerContainer.appendChild(button);
    }
  }
}

displayQuestions();
