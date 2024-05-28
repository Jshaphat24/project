const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const timerProgress = document.getElementById("timer");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: "It is the attraction between like molecules",
    choice1: "Cohesion",
    choice2: "Adhesion",
    choice3: "Surface tension",
    choice4: "Capillarity",
    answer: 1
  },
  {
    question: "Sublimation is direct change from:",
    choice1: "Solid to gaseous phase",
    choice2: "Liquid to gaseous phase",
    choice3: "Solid to liquid phase",
    choice4: "Gaseous to liquid phase",
    answer: 1
  },
  {
    question: "What term is used to describe a polymer that has a rubber-like properties?",
    choice1: "Thermoplastic",
    choice2: "Thermoset",
    choice3: "Elastomer",
    choice4: "Composite",
    answer: 3
  },
  {
    question: "A large molecule with two alternating mers is known as:",
    choice1: "Monomer",
    choice2: "Polymer",
    choice3: "Copolymer",
    choice4: "Oligomer",
    answer: 3
  },
  {
    question: "What is a substance that attracts a piece of iron?",
    choice1: "Magnet",
    choice2: "Copper",
    choice3: "Silver",
    choice4: "Gold",
    answer: 1
  },
  {
    question: "What is the measure of rigidity?",
    choice1: "Strength",
    choice2: "Modulus of elasticity",
    choice3: "Ductility",
    choice4: "Hardness",
    answer: 2
  },
  {
    question: "What is the generic name of a class of polymer which is commercially known as nylon?",
    choice1: "Polyester",
    choice2: "Polyethylene",
    choice3: "Polypropylene",
    choice4: "Polyamide",
    answer: 4
  },
  {
    question: "The engineering materials are known as 'plastics' are more correctly called:",
    choice1: "Thermoplastics",
    choice2: "Elastomers",
    choice3: "Fibers",
    choice4: "Polymers",
    answer: 4
  },
  {
    question: "What are considered as the building blocks for engineering materials?",
    choice1: "Molecules",
    choice2: "Atoms",
    choice3: "Cells",
    choice4: "Particles",
    answer: 2
  },
  {
    question: "The general law of mechanics that stress is directly proportional to strain",
    choice1: "Newton's law",
    choice2: "Hooke’s law",
    choice3: "Archimedes' principle",
    choice4: "Pascal's principle",
    answer: 2
  },
  {
    question: "A 250V light source has a mean spherical luminous intensity of 87.5 candelas. Compute the luminous intensity of the Lamp.",
    choice1: "4.4 Im/s",
    choice2: "5.6 Im/s",
    choice3: "7.8 Im/s",
    choice4: "9.2 Im/s",
    answer: 1
  },
  {
    question: "What is the force of attraction on a body?",
    choice1: "Friction",
    choice2: "Weight",
    choice3: "Pressure",
    choice4: "Velocity",
    answer: 2
  },
  {
    question: "What is concurrent force system?",
    choice1: "All forces act at the same point",
    choice2: "All forces act in the same direction",
    choice3: "All forces are parallel to each other",
    choice4: "All forces have the same magnitude",
    answer: 1
  },
  {
    question: "What is the opposite of alkali?",
    choice1: "Base",
    choice2: "Acid",
    choice3: "Neutral",
    choice4: "Salt",
    answer: 2
  },
  {
    question: "_____ is known as the application of fluid mechanics in engineering.",
    choice1: "Mechanics",
    choice2: "Hydraulics",
    choice3: "Pneumatics",
    choice4: "Thermodynamics",
    answer: 2
  },
  {
    question: "When all atom molecules are the same, the substance is called?",
    choice1: "Element",
    choice2: "Mixture",
    choice3: "Compound",
    choice4: "Solution",
    answer: 3
  },
  {
    question: "What is formed when acids react with active metals?",
    choice1: "Oxygen",
    choice2: "Carbon dioxide",
    choice3: "Water",
    choice4: "Hydrogen",
    answer: 4
  },
  {
    question: "Which device is used for measuring the velocity of a bullet?",
    choice1: "Chronometer",
    choice2: "Stroboscope",
    choice3: "Ballistic pendulum",
    choice4: "Hydrometer",
    answer: 3
  },
  {
    question: "What is the mixing of gases due to molecular motion called?",
    choice1: "Osmosis",
    choice2: "Evaporation",
    choice3: "Diffusion",
    choice4: "Condensation",
    answer: 3
  },
  {
    question: "What is the most abundant metal in nature?",
    choice1: "Copper",
    choice2: "Iron",
    choice3: "Aluminum",
    choice4: "Zinc",
    answer: 3
  },
  {
    question: "How much percent of the mass is comprised by oxygen in the earth's crust?",
    choice1: "21.5%",
    choice2: "35.0%",
    choice3: "49.5%",
    choice4: "60.8%",
    answer: 3
  },
  {
    question: "Results when a body is acted upon by the force are called __",
    choice1: "Translation",
    choice2: "Rest",
    choice3: "Deformation",
    choice4: "Motion",
    answer: 3
  }
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
const TIME_LIMIT = 10; // Time limit for each question in seconds
let timerInterval; // Timer interval variable

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
  
  // Reset timer
  clearInterval(timerInterval);
  startTimer();
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
  
      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  
      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      } else {
        // If the selected choice is incorrect, display the correct answer
        const correctChoice = document.querySelector(`.choice-text[data-number="${currentQuestion.answer}"]`);
        correctChoice.parentElement.classList.add('correct');
      }
  
      selectedChoice.parentElement.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        choices.forEach(choice => {
          choice.parentElement.classList.remove('correct');
          choice.parentElement.classList.remove('incorrect');
        });
        getNewQuestion();
        // Reset timer progress
        timerProgress.style.transition = 'none';
        timerProgress.style.width = '100%';
        setTimeout(() => {
          timerProgress.style.transition = '';
        }, 10);
      }, 1000);
    });
  });

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

function startTimer() {
  let timePassed = 0;
  timerInterval = setInterval(() => {
    timePassed += 1;
    let progress = ((TIME_LIMIT - timePassed) / TIME_LIMIT) * 100;
    timerProgress.style.width = progress + "%";

    if (timePassed >= TIME_LIMIT) {
      clearInterval(timerInterval);
      handleTimeUp();
    }
  }, 1000);
}

handleTimeUp = () => {
  const correctChoice = document.querySelector(`.choice-text[data-number="${currentQuestion.answer}"]`);
  correctChoice.parentElement.classList.add('correct');

  setTimeout(() => {
    correctChoice.parentElement.classList.remove('correct');
    getNewQuestion();
    // Reset timer animation
    timerProgress.style.transition = 'none';
    timerProgress.style.width = '100%';
    setTimeout(() => {
      timerProgress.style.transition = '';
    }, 10);
  }, 1000);
};


startGame();