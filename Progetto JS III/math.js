function calcola() { 
    input = document.querySelector("input").value;
    
    if (isNaN(input)) {
        alert("inserire un numero");
        return
    }

    ths = document.querySelectorAll("th");
    tds = document.querySelectorAll("td");

    for (let i = 0; i < 10; i++) {
        ths[i].innerHTML = input + " * " + (i + 1);
        tds[i].innerHTML = input * (i + 1);
    }
}