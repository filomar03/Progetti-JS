const increase = 1, decrease = -1;
var question_header, question, result_label, start_btn, back_btn, next_btn, retry_btn;
var current_question, current_div;
var answer_labels, radios, divs;
var score;
var questions = [
    "Which one of the following programming languages was released in 1995?", 
    "Which one of the following programming languages doesn't necessarily have to be compiled?", 
    "Which one of the following units is greater?", 
    "Which one of the following programming languages isn't object oriented?",
    "Which one of the following languages isn't a programming one?"
];
var answer_sets = {
    0: ["Pascal", "Python", "Megabyte", "PHP", "Flutter"],
    1: ["Dart", "C++", "Kilobyte", "Ruby", "HTML"], 
    2: ["Java", "Kotlin", "Gigabyte", "C#", "Javascript"],
    3: ["Assembly", "Go", "Terabyte", "C", "R"]
};
var user_answers;
var solutions = ["rad3", "rad1", "rad4", "rad4", "rad2"];

var radio_callback = function (e) { user_answers[current_question] = e.target.id; };
var start_callback = function (e) {
    current_div = 1;
    displayElement();
    setText();
    loadAnswer();
};
var back_callback = function (e) {
    if (checkIfIndexIsInRange(questions, current_question, decrease)) {
        current_question--;
        setText();
        clearAnswers();
        loadAnswer();
        if (current_question != questions.length - 1) {
            next_btn.innerHTML = "next";
        }
    } else {
        if (confirm("The current quiz will be erased, are you sure?") == true) {
            radios.forEach(element => { element.removeEventListener("change", radio_callback); });
            start_btn.removeEventListener("click", start_callback);
            back_btn.removeEventListener("click", back_callback);
            next_btn.removeEventListener("click", next_callback);
            retry_btn.removeEventListener("click", retry_callback);

            initQuiz();
        }
    }
};
var next_callback = function (e) {
    if (next_btn.innerHTML == "next") {
        current_question++;
        setText();
        clearAnswers();
        loadAnswer();
        if (current_question == questions.length - 1) {
            next_btn.innerHTML = "finish";
        }
    } else if (next_btn.innerHTML == "finish") {
        current_div = 2;
        displayElement();
        compareAnswers();
    }
};
var retry_callback = function (e) { 
    radios.forEach(element => { element.removeEventListener("change", radio_callback); });
    start_btn.removeEventListener("click", start_callback);
    back_btn.removeEventListener("click", back_callback);
    next_btn.removeEventListener("click", next_callback);
    retry_btn.removeEventListener("click", retry_callback);

    initQuiz(); 
};

function initQuiz() {
    question_header = document.getElementById("question_header");
    question = document.getElementById("question");
    result_label = document.getElementById("res_label");
    start_btn = document.getElementById("start");
    back_btn = document.getElementById("back");
    next_btn = document.getElementById("next");
    retry_btn = document.getElementById("retry");
    answer_labels = document.querySelectorAll("label");
    radios = document.querySelectorAll("input[type=radio]");
    divs = document.querySelectorAll("[name=quiz_section]");
      
    current_question = 0;
    current_div = 0
    user_answers = [];
    for (let i = 0; i < questions.length; i++) {    
        user_answers.push("");
    }
    score = 0;  
    next_btn.innerHTML = "next";
    clearAnswers();

    radios.forEach(element => { element.addEventListener("change", radio_callback); });
    start_btn.addEventListener("click", start_callback);
    back_btn.addEventListener("click", back_callback);
    next_btn.addEventListener("click", next_callback);
    retry_btn.addEventListener("click", retry_callback);

    displayElement();
}

function displayElement() {
    for (let i = 0; i < divs.length; i++) {
        if (i == current_div) {
            divs[i].style.display = "block"
        } else {
            divs[i].style.display = "none"
        }
    }
}

function checkIfIndexIsInRange(array, index, step) {
    return 0 <= (index + step) && (index + step) < array.length;
}

function setText() {
    question_header.innerHTML = "Question number: " + (current_question + 1) + "/" + questions.length;
    question.innerHTML = questions[current_question];
    for (let i = 0; i < answer_labels.length; i++) {
        answer_labels[i].innerHTML = answer_sets[i][current_question];
    }
}

function loadAnswer() {
    if (user_answers[current_question] != "") {
        document.getElementById(user_answers[current_question]).checked = true;
    }
}

function clearAnswers() {
    radios.forEach(element => {
        element.checked = false;
    });
}

function compareAnswers() {
    for (let i = 0; i < solutions.length; i++) { 
        if (user_answers[i] == solutions[i]) { 
            score++; 
        }
    }
    result_label.innerHTML = "Your score is: " + score + "/" + questions.length;
}