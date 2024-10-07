var risultato;

function calcola() { 
    var numero = parseInt(document.getElementById("input").value);
    console.log(numero);
    if (isNaN(numero) && numero >= 0) {
        alert("non è stato inserito un valore numerico");
        return;
    }
    risultato = 1;
    fattoriale(numero);
}

function fattoriale(n) {
    if (n == 1 || n == 0) {
        alert(risultato);
        return;
    }
    risultato *= n;
    n -= 1;
    fattoriale(n);
}