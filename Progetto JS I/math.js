var risultato;

function calcolamcm() { 
    var num1 = parseInt(document.getElementById("input1").value);
    var num2 = parseInt(document.getElementById("input2").value);
    if (isNaN(num1) || isNaN(num2)) {
        alert("bisogna inserire un numero");
        return;
    }
    alert("mcm = " + math.lcm(num1, num2));
}

function calcolaMCD() {
    var num1 = parseInt(document.getElementById("input3").value);
    var num2 = parseInt(document.getElementById("input4").value);
    if (isNaN(num1) || isNaN(num2)) {
        alert("bisogna inserire un numero");
        return;
    }
    alert("MCD = " + math.gcd(num1, num2));
}