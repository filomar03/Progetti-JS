function Check(){
    
    var somma = 0;

    if (document.getElementById("1b").checked) 
    { 
        somma++; 
    }
    
    if (document.getElementById("2a").checked) 
    { 
        somma++; 
    }
    
    if (document.getElementById("3a").checked) 
    { 
        somma++; 
    }
    
    if (document.getElementById("4c").checked) 
    { 
        somma++; 
    }
    
    if (document.getElementById("5b").checked) 
    { 
        somma++; 
    }
    
    document.getElementById("result").innerHTML = somma  + "/5";
}