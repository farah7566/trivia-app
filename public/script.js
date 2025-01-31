const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const revealButton = document.getElementById("reveal-btn");
const nextButton = document.getElementById("next-btn");
const answerElement = document.getElementById("answer");
const difficultyContainer = document.getElementById("difficulty-container");
const questionContainer = document.getElementById("question-container");

let triviaQuestions = [];
let currentQuestionIndex = 0;
let isAnswerRevealed = false;

// Fetch trivia questions from the backend
async function fetchQuestions(difficulty) {
  try {
    const response = await fetch(`/trivia?difficulty=${difficulty}`);
    triviaQuestions = await response.json();
    currentQuestionIndex = 0; // Reset to first question
    displayQuestion();
    
    // Make the difficulty container visible
    difficultyContainer.classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
  }
}
// Display the current question
function displayQuestion() {
  const question = triviaQuestions[currentQuestionIndex];
  questionElement.innerHTML = question.question;
  optionsElement.innerHTML = "";
  answerElement.innerHTML = question.correct_answer;
  answerElement.classList.add("hidden");
  isAnswerRevealed = false;

  const allAnswers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
  allAnswers.forEach(answer => {
    const li = document.createElement("li");
    li.textContent = answer;
    li.addEventListener("click", () => handleAnswerClick(answer, question.correct_answer, li));
    optionsElement.appendChild(li);
  });

  // Toggle to show the trivia question container
  questionContainer.classList.remove("hidden");
}

// Handle answer click
function handleAnswerClick(selectedAnswer, correctAnswer, listItem) {
  if (isAnswerRevealed) return;

  if (selectedAnswer === correctAnswer) {
    listItem.style.backgroundColor = "green";
    listItem.style.color = "white";
  } else {
    listItem.style.backgroundColor = "red";
    listItem.style.color = "white";

    // Highlight the correct answer
    const correctOption = Array.from(optionsElement.children).find(
      (li) => li.textContent === correctAnswer
    );
    if (correctOption) {
      correctOption.style.backgroundColor = "green";
      correctOption.style.color = "white";
    }
  }
  isAnswerRevealed = true;
}

// Reveal the correct answer
revealButton.addEventListener("click", () => {
  if (isAnswerRevealed) return;

  answerElement.classList.remove("hidden");

  // Highlight the correct answer
  const correctOption = Array.from(optionsElement.children).find(
    (li) => li.textContent === answerElement.textContent
  );
  if (correctOption) {
    correctOption.style.backgroundColor = "green";
    correctOption.style.color = "white";
  }

  isAnswerRevealed = true;
});

// Show the next question
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < triviaQuestions.length) {
    displayQuestion();
  } else {
    questionElement.innerHTML = "No more questions!";
    optionsElement.innerHTML = "";
    answerElement.innerHTML = "";
    revealButton.style.display = "none";
    nextButton.style.display = "none";
  }
});

// Event listener for difficulty selection
document.getElementById('difficulty').addEventListener('change', (event) => {
  const selectedDifficulty = event.target.value;
  fetchQuestions(selectedDifficulty); // Fetch new questions based on selected difficulty
});

// Load questions with default difficulty (easy)
fetchQuestions('easy');
