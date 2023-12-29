let currentQuestion = 0;
let pathwayScores = {
    development: 0,
    robotics: 0,
    cybersecurity: 0
};

const surveyData = [
    {
        question: "Do you enjoy problem-solving and logical thinking?",
        pathways: {
            "Yes": "development" ,
            "Kinda": "robotics",
            "Not at all": "cybersecurity"
        }
    },
    {
        question: "Are you interested in building and designing physical systems?",
        pathways: {
            "Absolutely": "robotics",
            "Not really": "development",
            "Not at all": "cybersecurity"
        }
    },
    {
        question: "Do you have a strong attention to detail and enjoy analyzing data?",
        pathways: {
            "Definitely": "cybersecurity",
            "Somewhat": "development",
            "Not really": "robotics"
        }
    },
    {
        question: "Are you interested in protecting digital systems and information from unauthorized access?",
        pathways: {
            "Absolutely": "cybersecurity",
            "Not really": "development",
            "Not at all": "robotics"
        }
    }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");

function loadQuestion() {
    updateProgressBar(); // Update the progress bar before loading the question

    const currentSurveyData = surveyData[currentQuestion];
    questionElement.innerText = currentSurveyData.question;

    optionsElement.innerHTML = "";
    const pathways = currentSurveyData.pathways;
    Object.keys(pathways).forEach((pathway) => {
        const button = document.createElement("button");
        button.innerText = pathway;
        button.addEventListener("click", () => selectOption(pathway));
        optionsElement.appendChild(button);
    });
}

//progress bar
const progressBar = document.getElementById("progressBar");

function updateProgressBar() {
    const progress = (currentQuestion / surveyData.length) * 100;
    progressBar.value = progress;
}


function selectOption(pathway) {
    pathwayScores[surveyData[currentQuestion].pathways[pathway]]++;

    currentQuestion++;

    updateProgressBar(); // Update the progress bar after the question is answered

    if (currentQuestion < surveyData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}



function showResult() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";

    let maxScore = 0;
    let recommendedPathway = "";

    Object.entries(pathwayScores).forEach(([pathway, score]) => {
        if (score > maxScore) {
            maxScore = score;
            recommendedPathway = pathway;
        }
    });

    resultElement.innerText = `Based on your responses, your recommended pathway is ${recommendedPathway}.`;
}


loadQuestion();