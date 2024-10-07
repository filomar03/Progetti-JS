let inputFields = document.querySelectorAll("input[type=text]");

let labels = document.querySelectorAll("label");

let btn = document.querySelector("button");

function swap() {
    if (btn.innerHTML == "offusca!") {
        let ti = inputFields[0].value;
        inputFields[0].value = inputFields[2].value;
        inputFields[2].value = ti;
        let tl = labels[0].innerHTML;
        labels[0].innerHTML = labels[2].innerHTML;
        labels[2].innerHTML = tl;
        btn.innerHTML = "chiarifica!"
    } else {
        let ti = inputFields[0].value;
        inputFields[0].value = inputFields[2].value;
        inputFields[2].value = ti;
        let tl = labels[0].innerHTML;
        labels[0].innerHTML = labels[2].innerHTML;
        labels[2].innerHTML = tl;
        btn.innerHTML = "offusca!"
    }
}

function buttonHandler() {
    let startText = inputFields[0].value;
    let password = inputFields[1].value;

    if (btn.innerHTML == "offusca!") {
        codifica(startText, password);
    } else {
        decodifica(startText, password);
    }
}

function codifica(msg, key) {
    let char = [];
    let msg1 = "";

    for (let i = 0; i < msg.length; i++) {
        char[i] = parseInt(msg.charCodeAt(i)) + parseInt(key.charCodeAt(i % key.length));
        while (parseInt(char[i]) < 32 || parseInt(char[i]) > 126) {
            char[i] = parseInt(char[i]) - 94;
        }
        msg1 += String.fromCharCode(char[i]);
    }
    inputFields[2].value = msg1;
}

function decodifica(msg, key) {
    let char = [];
    let msg1 = "";

    for (let i = 0; i < msg.length; i++) {
        char[i] = parseInt(msg.charCodeAt(i)) - parseInt(key.charCodeAt(i % key.length));
        while (parseInt(char[i]) < 32 || parseInt(char[i]) > 126) {
            char[i] = parseInt(char[i]) + 94;
        }
        msg1 += String.fromCharCode(char[i]);
    }
    inputFields[2].value = msg1;
}