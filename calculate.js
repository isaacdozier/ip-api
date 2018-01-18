var userInput = '';
var tempActive = false;
var inchTrue, footTrue, sixTrue, sixRoun;
var rem, p = '', n = '';
var foot = 0, inch = 0, six = 0;
var fis, result, outputOne, outputTwo, compile; 
var dec = 0;
var history;

function calculate(num) {
    if(event.keyCode == 13) {
        if(num.value === ''){
            printAlert();
        } 
        else
        if(isNumber(num.value)){
             printOutput(num.value,convertDecToFis(num.value));
        } 
        else 
        if(isFis(num.value)){
            printOutput(num.value,convertFisToDec(num.value));
        } 
        else 
        if(isExpression(num.value)){
            printOutput(num.value,convertDecToFis(doMath(num.value)));
        } 
        else {
            printError(num.value);
        }
    }
}

function doMath(exp){
    var list = exp.split("+");
    
    // add empty index 0 to store result
    list.splice(0,0,0);
    
    //loop through expression, do some math
    while(list.length > 1){
        var temp = list[1];
        if(isFis(list[1])){
            temp = convertFisToDec(list[1])[0]
        } 
        list[0] = Number(list[0]) + Number(temp);
        list.splice(1,1);
    }
    
    // convert expression result to FIS standard
    return Number(list[0]);
}

function convertDecToFis(decimal){
    var temp = decimal;
    
    tempActive = false;
    if(decimal < 0){
        temp = decimal * -1;
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
    rem = (dec*100).toFixed(2);
    
    return [fis,rem]
}

function convertFisToDec(fis){
    var temp = fis.split('-');
    
    tempActive = false;
    if(temp[0] === '' && temp.length > 3){
        tempActive = true;
        temp.splice(0,1);
    }
    
    temp[1] = temp[1] / 12;
    temp[2] = (temp[2] / 16) / 12;
    console.log (temp);
    dec = (Number(temp[0]) + temp[1] + temp[2]).toFixed(3);
   
    return [dec];
}



function printOutput(a,b){
    var remainder = (b[1]/100).toFixed(2);
    
    n = '';
    if(tempActive){
        remainder = remainder * -1;
        n = "-";
    }
    
    p = '';
    if(remainder > 0){
        p = "+";
    }
    
    outputOne = "<span class='fis'>" 
                    + a + " = " + n + b[0] 
                + "</span>";
                
    if(b[1]){
        outputTwo = "<span class='decimal rem-" 
                        + Math.sign(b[1]) + "'>"
                        + p + remainder
                    + "</span>";
    } else{
        outputTwo = '';
    }
    
    compile = "<div class='output'>" + outputOne + outputTwo + "</div>";
    
    //compile history
    document.getElementById('result').innerHTML = historyCheck(compile);
    
    //clear input box & user message
    document.getElementById('f').value = '';
    document.getElementById('userMessage').innerHTML = '';
}

function printError(source){
    var errorMsg = "error:" + source + " is not a number or expression";
    outputOne = "<div class='output error'>" + errorMsg + "</div>";
    
    //compile history
    document.getElementById('result').innerHTML = historyCheck(outputOne);
    document.getElementById('userMessage').innerHTML = 'enter a number';
    
    //clear input box & user message
    document.getElementById('f').value = '';
    document.getElementById('userMessage').innerHTML = '';
}

function printAlert(){
    document.getElementById('userMessage').innerHTML = 'enter a number';
}

function historyCheck(h){
    if(!history){
    	return h;
    }else {
   	    return h + document.getElementById('result').innerHTML;
    }
}

function isNumber(x){
    return !isNaN(x)
}

function isFis(z){
    var zArray = z.split('-');
    var length = zArray.length;
    
    if(zArray[0] === ''){
        z.splice(0,1);
    }
    
    var len   = length === 3;
    var isNumOne = isNumber(zArray[0]);
    var isNumTwo = isNumber(zArray[length-1])
    
    return len && isNumOne && isNumTwo
    
}

function isExpression(y){
    return y.split('+').length > 1
}