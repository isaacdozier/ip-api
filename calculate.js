var userInput;
var temp, tempActive = false;
var inchTrue, footTrue, sixTrue, sixDeci, sixRoun, sixRema;
var rem, p = '', n = '';
var foot = 0, inch = 0, six = 0;
var fis, result, output; 
var dec = 0, rem;
var history;

function calculate(num) {
    if(event.keyCode == 13) {
        if(!isNaN(num.value)){
            temp = num.value;
            tempActive = false;
            if(num.value < 0){
                temp = num.value * -1;
                tempActive = true;
            }
            footTrue = temp;
            inchTrue = temp * 12;
            sixTrue  = inchTrue * 16;
            sixRoun = Math.round(sixTrue);
    	   
    	    foot = Math.floor((sixRoun / 16) / 12);
            inch = Math.floor(sixRoun / 16) - (foot * 12);
            six  = sixRoun - (((foot * 12) + inch) * 16);
            dec  = sixTrue - sixRoun;
    	   
    	    fis = foot + " - " + inch + " - " + six;
    	    rem = dec.toFixed(2);
    	    userInput = num.value + "'";
    	   
    	    p = '';
    	    if(rem > 0){
               p = "+";
            }
            
            n= '';
            if(tempActive === true){
                n = "-";
            }
    	   
            output = "<div class='output'><span class='fis'>" 
                         + userInput + " = " + n + fis 
                        + "</span>"
                        + "<span class='decimal rem-" 
                        + Math.sign(dec.toFixed(2)) + "'>"
                        +  p  + rem + " / 16"
                        + "</span>" 
                   + "</div>";
            
            //compile history
            historyCheck();
            document.getElementById('result').innerHTML = result;
            
            //clear input box
            document.getElementById('f').value = '';
        } else {
            
            output = "<div class='output error'>" + 
                        errorMsg
                   + "</div>";
            
            //add error message to history
            historyCheck();
            document.getElementById('result').innerHTML = result;
            
            //clear input box
            document.getElementById('f').value = '';
        }
    }
}

var errorMsg = "error";

function historyCheck(){
    if(!history){
    	result = output;
    }else {
   	    result = output + document.getElementById('result').innerHTML;
    }
}