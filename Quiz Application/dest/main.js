/* ----------------------------------------- CONSTANTS & VARIABLES ----------------------------------------- */
// Arrays to store quiz data and categories
let questions = [];
let categories = [];

// Variables to track quiz state
let score = 0;  // represents score of the user
let currQuesIndex = 0;  // represents current question index
let categoryId = '';    // stores selected question category id 
let difficulty = 'easy';    // stores selected question difficulty level

// DOM elements
const startBtn = document.querySelector('#start-btn');
const nextBtn = document.querySelector('#next-btn');
const submitBtn = document.querySelector('#submit-btn');
const finishBtn = document.querySelector('#finish-btn');
const restartBtn = document.querySelector('#restart-btn');

const heading = document.querySelector('#heading');

// Elements related to category selection
const categoryListContainer = document.querySelector('#category-container');
const categoryList = document.querySelector('#category_list');

// Elements related to difficulty selection
const difficultyContainer = document.querySelector('#difficulty-container');

// Quiz container and question elements
const quizContainer = document.querySelector('#quiz-container');
const quesNum = document.querySelector('#question-number');
const quesDesc = document.querySelector('#ques-desc');
const optContainer = document.querySelector('#opt-container');

// Result and score display elements
const resultDiv = document.querySelector('#result-div');
const scoreText = document.querySelector('#score');

// Button container
const btnDiv = document.querySelector('#btn-div');

/* ----------------------------------------- FUNCTIONS ----------------------------------------- */
/**
 * Async function to fetch the list of trivia categories from the Open Trivia Database API.
 * @throws Will throw an error if the fetch or JSON parsing fails.
 */
async function fetchCategoryList() {
    try {
        // Fetch category data from the API
        const response = await fetch('https://opentdb.com/api_category.php');

        // Parse the JSON response
        const result = await response.json();

        // Update the global categories array with the fetched data
        categories = result.trivia_categories;
    } catch (error) {
        // Throw the error for higher-level error handling
        throw error;
    }
}

// Function to generate the category list and append it to the DOM
function generateCategoryList() {
    categories.forEach(({ id, name }) => {
        categoryList.insertAdjacentHTML('beforeend',
            `<li class="cursor-pointer" data-id=${id}>${name}</li>`
        )
    })
}

// Function to handle the selection of a category
function handleSelectedCategory(event) {
    // Extract the category ID from the clicked list item's dataset
    categoryId = (event.target.dataset && event.target.dataset.id) || '';

    // Hide the category list container and reveal the difficulty selection container
    categoryListContainer.classList.add('hidden');
    difficultyContainer.classList.remove('hidden');
}

// Function to handle the selection of difficulty level
function handleSelectedDifficulty(selectedDifficulty) {
    // Update the global difficulty variable with the difficulty level based on the selected value
    difficulty = selectedDifficulty;

    // Hide the difficulty selection container
    difficultyContainer.classList.add('hidden');

    // Trigger the process to show the quiz container with the selected category and difficulty
    showQuizContainer();
}

/**
 * Fetches quiz questions and options from the Open Trivia Database API based on the selected category and difficulty level.
 * The fetched options are then processed and randomized before being stored in the global 'questions' array.
 */
async function fetchQuestions() {

    try {
        // Make a fetch request to the Open Trivia Database API
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`);
        const result = await response.json();

        // Extract the array of 'questions & their options' from the API response
        const fetchedArray = result.results;

        // Process & Store the 'fetched questions & their options' into the 'questions' array
        questions = fetchedArray.map((obj) => {
            // Add the correct answer into the incorect answer array
            (obj.incorrect_answers).push(obj.correct_answer);

            // assign the correct + incorrect answer array to the option variable
            const option = obj.incorrect_answers;

            // Return an object representing the processed question, its option array and its correct answer
            return {
                question: obj.question,
                options: option,
                correct_answer: obj.correct_answer
            };
        })

        // Randomize the order of options for each question
        questions.forEach(({ question, options, correct_answer }) => {

            const randomIndex = Math.floor(Math.random() * 4);

            [options[randomIndex], options[3]] = [options[3], options[randomIndex]];
        })
    }
    catch (error) {
        // If an error occurs during the fetch or processing, throw the error
        throw error;
    }
}

/**
 * Resets the state of the quiz by hiding buttons, clearing question-related elements and option container, and enabling the option container for user intraction.
 */
function resetState() {
    // Hide button container
    btnDiv.classList.add('hidden');

    // Hide next button
    nextBtn.classList.add('hidden');

    // Enable the option container to allow user interaction
    optContainer.classList.remove('pointer-events-none');

    // Clear question number
    quesNum.innerText = "";

    // Clear question description
    quesDesc.innerHTML = "";

    // Remove all child elements(options) from the option container
    while (optContainer.firstElementChild) {
        optContainer.removeChild(optContainer.firstElementChild);
    }
}

// Function to generate and display the current question
function generateQues() {
    // Check if there are questions available
    if (questions.length > 0) {
        // Display the question number
        quesNum.innerText = `${currQuesIndex + 1}.`;

        // Get the current question from the array
        const currentQuestion = questions[currQuesIndex];

        // Display the question description
        quesDesc.innerHTML = `${currentQuestion.question}`;
    }
    else {
        // If no questions available, throw an error
        throw new Error('Failed to generate');
    }
}

// Function to generate and display options for the current question
function generateOptions() {

    // Check if there are questions available
    if (questions.length > 0) {
        // Get the current question
        const currentQuestion = questions[currQuesIndex];

        // Loop through each option in the current question
        currentQuestion.options.forEach((text) => {

            // Insert HTML for each option button
            optContainer.insertAdjacentHTML("beforeend",
                `<button class="flex w-full justify-start bg-teal-300 mb-2 p-4 rounded-md hover:bg-blue-800 hover:text-white cursor-pointer">
            ${text}
        </button>`);
        })
    }
}

// Function to reset the quiz state, generate a question, and its options
function createQuiz() {
    // Reset the state of the quiz
    resetState();

    // Generate the current question
    generateQues();

    // Generate options for the current question
    generateOptions();
}

/**
 * Asynchronous function to handle the presentation of the quiz container.
 * This function fetches questions, creates the quiz, and handles errors.
 */
async function showQuizContainer() {

    // Get the pulse loader element by ID
    const loader = document.querySelector('#loader-quiz-container');

    try {
        // Show the Pulse loader while fetching questions
        loader.classList.remove('hidden');

        // Fetch questions asynchronously
        await fetchQuestions();

        // Create the quiz
        createQuiz();
    }
    catch (error) { // Handle errors related to fetching questions

        // Display message for the unavailability of question
        quesNum.innerText = "";
        quesDesc.innerHTML = "No questions available!";

        // Show restart button for the user to restart the quiz
        btnDiv.classList.remove('hidden');
        restartBtn.classList.remove('hidden');

        // Log the error for debugging purposes
        console.error(`Error in Loading Quiz. ${error} questions`);
    }
    finally {
        // Hide the loader and reveal the quiz container
        loader.classList.add('hidden');
        quizContainer.classList.remove('hidden');
    }
}

/**
 * Function to handle the user's selected answer.
 * @param {HTMLElement} selectedOption - The selected answer option (button element).
 */
function handleSelectedAnswer(selectedOption) {

    // Retrieve the current question's correct answer
    const correctAnswer = questions[currQuesIndex].correct_answer;

    // Retrieve the text corresponding to the selected answer
    const selectedText = selectedOption.innerText;

    // Check if the selected option is the correct answer
    if (correctAnswer === selectedText) {
        // Apply styles for a correct answer
        selectedOption.classList.add('bg-green-600', 'active:bg-green-600', 'focus:bg-green-600', 'outline-none');

        // Increment the score for correct answers
        score++;
    }
    else {
        // Apply styles for an incorrect answer
        selectedOption.classList.add('bg-red-600', 'active:bg-red-600', 'focus:bg-red-600', 'outline-none')
        
        // Highlight the correct answer
        const options = optContainer.querySelectorAll('button');
        options.forEach((btn) => {
            if (btn.innerText === correctAnswer) {
                btn.classList.remove('bg-teal-300');
                btn.classList.add('text-white', 'bg-green-600');
            }
        })
    }

    // Adjust styles for both correct and incorrect answers
    selectedOption.classList.remove('bg-teal-300');
    selectedOption.classList.add('text-white');

    // Disable further interaction with options until the next question
    optContainer.classList.add('pointer-events-none');

    // Show the appropriate buttons based on the current question index
    btnDiv.classList.remove('hidden');
    if (currQuesIndex < questions.length - 1) { // Check if there are more questions
        // If there are more questions, show the 'Next' button
        nextBtn.classList.remove('hidden');
    }
    else {
        // If it's the last question, show the 'Submit' button
        submitBtn.classList.remove('hidden');
    }
}

/**
 * Handles the click event of the start button.
 * Initiates the quiz by loading categories and displaying the category selection UI.
 */
async function handleStartButton() {

    // Get the Pulse loader element
    const loader = document.querySelector('#loader-container');

    try {
        // Hide heading and button div
        heading.classList.add('hidden');
        btnDiv.classList.add('hidden');

        // Show the Pulse loader while fetching categories
        loader.classList.remove('hidden');

        // If categories are not loaded, fetch and generate the category list
        if (categories.length === 0) {
            await fetchCategoryList();
            generateCategoryList();
        }

        // Show the category selection container
        categoryListContainer.classList.remove('hidden');
    }
    catch (error) { // Handle errors related to category loading

        // Display message for the unavailability of category
        quesNum.innerText = "";
        quesDesc.innerHTML = "No Category available!";
        quizContainer.classList.remove('hidden');

        // Show restart button for the user to restart the quiz
        btnDiv.classList.remove('hidden');
        restartBtn.classList.remove('hidden');

        // Log the error to the console
        console.error(`Error in creating Category List. ${error.message} category List`);
    }
    finally {
        // Hide the start button and loader after completing the operation
        startBtn.classList.add('hidden');
        loader.classList.add('hidden');
    }
}

// Function to handle the next button click
function handleNextButton() {
    // Increment the current question index
    currQuesIndex++;

    // Create the next question in the quiz
    createQuiz();
}

// Function to handle the submit button click
function handleSubmitButton() {

    // Hide the submit button and quiz container
    submitBtn.classList.add('hidden');
    quizContainer.classList.add('hidden');

    // Show the result container
    resultDiv.classList.remove('hidden');

    // Display the final score to the user
    scoreText.innerText = `You scored ${score} out of ${questions.length}`;

    // Show the finish button for the user to complete the quiz
    finishBtn.classList.remove('hidden');
}

// Function to handle the finish button click
function handleFinishButton() {

    // Reset quiz state
    score = 0;
    currQuesIndex = 0;
    categoryId = '';
    difficulty = 'easy';

    // Clear the questions array
    questions.length = 0;

    // Clear question number and description
    quesNum.innerText = "";
    quesDesc.innerHTML = "";

    // Remove all options from the container
    while (optContainer.firstElementChild) {
        optContainer.removeChild(optContainer.firstElementChild);
    }

    // Hide finish button and result div
    finishBtn.classList.add('hidden');
    resultDiv.classList.add('hidden');

    // Show start button and heading
    startBtn.classList.remove('hidden');
    heading.classList.remove('hidden');
}

// Function to handle the restart button click
function handleRestartButton() {
    // Reset category and difficulty variables
    categoryId = '';
    difficulty = 'easy';

    // Clear the question description
    quesDesc.innerHTML = '';

    // Hide the restart button
    restartBtn.classList.add('hidden');

    // Show the button container and start button
    btnDiv.classList.remove('hidden');
    startBtn.classList.remove('hidden');

    // Show the heading
    heading.classList.remove('hidden');
}

/* ----------------------------------------- EVENT LISTENERS ----------------------------------------- */
// Event listeners for button clicks
startBtn.addEventListener('click', handleStartButton);
nextBtn.addEventListener('click', handleNextButton);
submitBtn.addEventListener('click', handleSubmitButton);
finishBtn.addEventListener('click', handleFinishButton);
restartBtn.addEventListener('click', handleRestartButton);

// Listens for selected category
categoryList.addEventListener('click', handleSelectedCategory);

// Listens for selected option
optContainer.addEventListener('click', (event) => {
    handleSelectedAnswer(event.target);
});