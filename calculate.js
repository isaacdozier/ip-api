var userInput;
var inchTrue, footTrue, sixTrue, sixDeci, sixRoun, sixRema;
var remP, remN;
var foot = 0, inch = 0, six = 0;
var fis, result, output; 
var dec = 0, rem;
var history;

function calculate(num) {
    if(event.keyCode == 13) {
       footTrue = num.value;
       inchTrue = num.value * 12;
       sixTrue  = inchTrue * 16;
       sixRoun = Math.round(sixTrue);
	   
	   foot = Math.floor((sixRoun / 16) / 12);
       inch = Math.floor(sixRoun / 16) - (foot * 12);
       six  = sixRoun - (((foot * 12) + inch) * 16);
       dec  = sixTrue - sixRoun;
	   
	   fis = foot + " - " + inch + " - " + six;
	   userInput = num.value + "'";
	   
       output = "<div class='output'><span class='fis'>" 
                        + userInput + " = " + fis 
                    + "</span>"
                    + "<span class='decimal rem-" 
                    + Math.sign(dec.toFixed(2)) + "'>" 
                        + dec.toFixed(2) + " / 16"
                    + "</span>" 
              + "</div>";
       
       if(!history){
       	result = output;
       }else {
       	result = output + document.getElementById('result').innerHTML;
       }
       
       document.getElementById('result').innerHTML = result;
       
       document.getElementById('f').value = '';
    }
}