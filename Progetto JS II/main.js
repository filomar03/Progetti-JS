inputFields = document.querySelectorAll("input[type=text]");

var inputFieldCallback = function (e) {
    if(e.currentTarget == inputFields[0]) {
        inputFields[1].value = "";
    } else {
        inputFields[0].value = "";
    }
};

inputFields.forEach(element => {
    element.addEventListener("input", inputFieldCallback);
});

function converti() {
    if (inputFields[0].value != "") {
        var num = parseInt(inputFields[0].value);
        if (isNaN(num)) {
            alert("errore, non è stato inserito un numero");
            return;
        } else {
            inputFields[1].value = num.toString(2);
        }
    } else if (inputFields[1].value != "") {
        var num = parseInt(inputFields[1].value);
        console.log(isNaN(num));
        if (isNaN(num)) {
            alert("errore, non è stato inserito un numero");
            return;
        }
        var str = num.toString();
        var sstr;
        for (var i = 0; i < str.length; i++) {
            sstr = str.substring(i, i + 1);
            if (sstr != "0" && sstr != "1") {
                alert("errore, inserire un numero in binario");
                return;    
            }
        }
        inputFields[0].value = parseInt(num, 2);
    }  
}