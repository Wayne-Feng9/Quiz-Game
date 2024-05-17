//Setup
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

//Questions
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Vienna", correct: false },
      { text: "Paris", correct: true },
      { text: "New York City", correct: false },
    ],
  },
  {
    question: "Which draft did the Milwaukee Bucks select Giannis Antetokounmpo?",
    answers: [
      { text: "2013", correct: true },
      { text: "2016", correct: false },
      { text: "2012", correct: false },
      { text: "2018", correct: false },
    ],
  },
  {
    question: "Who was the first president of the United States?",
    answers: [
      { text: "Abraham Lincoln", correct: false },
      { text: "George Washington", correct: true },
      { text: "Wayne Feng", correct: false },
      { text: "Joe Biden", correct: false },
    ],
  },
  {
    question: "Which atoms make up a water molecule?",
    answers: [
      { text: "2 hydrogen, 2 oxygen", correct: false },
      { text: "1 hydrogen, 2 oxygen", correct: false },
      { text: "1 hydrogen, 1 oxygen", correct: false },
      { text: "2 hydrogen, 1 oxygen", correct: true },
    ],
  },
  {
    question: "Who wrote The Hunger Games?",
      answers: [
        { text: "Preston Tran", correct: false },
        { text: "Suzanne Collins", correct: true },
        { text: "Mark Twain", correct: false },
        { text: "J.K. Rowling", correct: false },
      ],
  },
  {
    question: "Which artist cut off his own ear?",
      answers: [
        { text: "Pablo Picasso", correct: false },
        { text: "Leonardo Da Vinci", correct: false },
        { text: "Vincent Van Gogh", correct: true },
        { text: "Raphael", correct: false },
      ],
  },
  {
    question: "Where is the Nile River?",
      answers: [
        { text: "Egypt", correct: true },
        { text: "Nigeria", correct: false },
        { text: "US", correct: false },
        { text: "Brazil", correct: true },
      ],
  },
  {
    question: "What is the result of 7 × (12 − 5)?",
      answers: [
        { text: "84", correct: false },
        { text: "49", correct: true },
        { text: "35", correct: false },
        { text: "63", correct: false },
      ],
  },
  {
    question: "What is the fourth planet in the solar system?",
      answers: [
        { text: "Earth", correct: false },
        { text: "Venus", correct: false },
        { text: "Mars", correct: true },
        { text: "Mercury", correct: false },
      ],
  },
  {
    question: "Is Wayne the GOAT?",
    answers: [
      { text: "Yes", correct: true },
      { text: "Yes", correct: true },
      { text: "Yes", correct: true },
      { text: "Yes", correct: true },
    ],
  },
  {
    question: "Which NBA team drafted Kevin Durant?",
      answers: [
        { text: "Oklahoma City Thunder", correct: false },
        { text: "Phoenix Suns", correct: false },
        { text: "Golden State Warriors", correct: false },
        { text: "Seattle Supersonics", correct: true },
      ],
  },
  {
    question: "What is rubber made out of?",
      answers: [
        { text: "Latex from trees", correct: true },
        { text: "Plant juice", correct: false },
        { text: "Aarnav's brain", correct: false },
        { text: "Clouds", correct: false },
      ],
  },
  {
    question: "What is the main ingredient in ice cream?",
      answers: [
        { text: "Milk", correct: false },
        { text: "Air", correct: true },
        { text: "Sugar", correct: false },
        { text: "Cream", correct: false },
      ],
  },
  {
    question: "Which Italian city-state did the Renaissance begin in?",
      answers: [
        { text: "Venice", correct: false },
        { text: "Rome", correct: false },
        { text: "Florence", correct: true },
        { text: "Las Vegas", correct: false },
      ],
  },
  {
    question: "Which is a piece of art created by Michelangelo?",
      answers: [
        { text: "Charles V", correct: false },
        { text: "Jesus", correct: false },
        { text: "Superman", correct: false },
        { text: "David", correct: true },
      ],
  },
  {
    question: "Who founded Apple?",
      answers: [
        { text: "Elon Musk", correct: false },
        { text: "Mr. Agustin", correct: false },
        { text: "Bill Gates", correct: true },
        { text: "Steve Jobs", correct: false },
      ],
  },
  {
    question: "Which year did Microsoft start?",
      answers: [
        { text: "1975", correct: true },
        { text: "1976", correct: false },
        { text: "500 BCE", correct: false },
        { text: "1986", correct: false },
      ],
  },
  {
    question: "What is a mitochondria?",
      answers: [
        { text: "A cell that makes you get sick", correct: false },
        { text: "A part of the cell that breaks down food", correct: true },
        { text: "A part of the cell that transports food", correct: false },
        { text: "Yuan-Wei's pet rock", correct: false },
      ],
  },  
  {
    question: "Which is NOT a Mozart piece?",
      answers: [
        { text: "Clarinet Concerto", correct: false },
        { text: "The Magic Flute", correct: false },
        { text: "Don Giovanni", correct: false },
        { text: "Moonlight Sonata", correct: true },
      ],
  },
];

startQuiz();

//Start quiz function
function startQuiz() {
  score = 0;
  var audio = new Audio("suspenseful_music.mp3");
  audio.loop = true;
  audio.play();
  questionContainer.style.display = "flex";

  //Shuffle the questions
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);

  //Select only the first 10 questions
  shuffledQuestions = shuffledQuestions.slice(0, 10);

  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
  var audio = new Audio("happy_ending_music.mp3");
  audio.loop = false;
  audio.play();
}