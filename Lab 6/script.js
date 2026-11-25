// Questions Array storing questions, options, and the correct answer
const questions = [
    {
        question: "Which HTML tag is used to link an external JavaScript file?",
        options: ["<script>", "<javascript>", "<js>", "<link>"],
        answer: "<script>"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["font-color", "text-color", "color", "background-color"],
        answer: "color"
    },
    {
        question: "How do you write 'Hello World' in an alert box in JavaScript?",
        options: [
            "msg('Hello World');",
            "alertBox('Hello World');",
            "alert('Hello World');",
            "msgBox('Hello World');"
        ],
        answer: "alert('Hello World');"
    },
    {
        question: "Which method prevents the browser's default action for an event?",
        options: [
            "event.stopDefault()",
            "event.preventDefault()",
            "event.cancel()",
            "event.halt()"
        ],
        answer: "event.preventDefault()"
    },
    {
        question: "Which HTML semantic tag is best used to define the bottom section of a page?",
        options: ["<bottom>", "<section>", "<footer>", "<aside>"],
        answer: "<footer>"
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let timerInterval = null;
const TIME_LIMIT = 15;
let timeLeft = TIME_LIMIT;

// DOM Elements
const questionCounterEl = document.getElementById("question-counter");
const timerEl = document.getElementById("timer");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackSectionEl = document.getElementById("feedback-section");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplayEl = document.getElementById("score-display");

// Randomly shuffles the questions array
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// Starts a countdown timer for each question
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIME_LIMIT;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

// Automatically reveals the answer if time runs out
function handleTimeUp() {
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const buttons = optionsContainerEl.querySelectorAll(".option-btn");

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQ.answer) {
            btn.classList.add("correct");
        }
    });

    feedbackSectionEl.textContent = `Time's up! The correct answer was: ${currentQ.answer}`;
    feedbackSectionEl.className = "feedback incorrect";
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// Displays the current question and answer options
function displayQuestion() {
    selectedOption = null;
    feedbackSectionEl.className = "feedback hidden";
    submitBtn.classList.remove("hidden");
    submitBtn.disabled = true;
    nextBtn.classList.add("hidden");

    const currentQ = shuffledQuestions[currentQuestionIndex];
    questionCounterEl.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionTextEl.textContent = currentQ.question;
    optionsContainerEl.innerHTML = "";

    currentQ.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => selectOption(button, option);
        optionsContainerEl.appendChild(button);
    });
}

// Highlights the user's selected option
function selectOption(buttonEl, optionText) {
    const allButtons = optionsContainerEl.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.classList.remove("selected"));

    buttonEl.classList.add("selected");
    selectedOption = optionText;
    submitBtn.disabled = false;
}

// Checks whether the selected answer is correct and updates the score
function checkAnswer() {
    if (!selectedOption) return;

    clearInterval(timerInterval);
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQ.answer;
    const buttons = optionsContainerEl.querySelectorAll(".option-btn");

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQ.answer) {
            btn.classList.add("correct");
        } else if (btn.textContent === selectedOption && !isCorrect) {
            btn.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        feedbackSectionEl.textContent = "Correct! Well done.";
        feedbackSectionEl.className = "feedback correct";
    } else {
        feedbackSectionEl.textContent = `Incorrect! The correct answer is: ${currentQ.answer}`;
        feedbackSectionEl.className = "feedback incorrect";
    }

    scoreDisplayEl.textContent = `Current Score: ${score} / ${shuffledQuestions.length}`;
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// Moves to the next question, resetting the timer and updating the score
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

// Displays final results when all questions are completed
function endQuiz() {
    clearInterval(timerInterval);
    questionCounterEl.textContent = "Quiz Completed!";
    timerEl.textContent = "Time Left: 0s";
    questionTextEl.textContent = "You have finished the quiz.";
    optionsContainerEl.innerHTML = "";
    feedbackSectionEl.className = "feedback hidden";
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    scoreDisplayEl.textContent = `Final Score: ${score} out of ${shuffledQuestions.length}`;
}

// Starts the quiz by shuffling questions, displaying the first question, and starting the timer
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    restartBtn.classList.add("hidden");
    scoreDisplayEl.textContent = `Current Score: 0 / ${questions.length}`;
    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Initialize the quiz on page load
startQuiz();