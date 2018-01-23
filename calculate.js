var userInput = ''
var tempActive = false
var inchTrue, footTrue, sixTrue, sixRoun
var rem, p = '', n = ''
var foot = 0, inch = 0, six = 0
var fis, result, output
var dec = 0
var history

function calculate() {
    var temp = document.getElementById('input')
    if(event.keyCode == 13 || event.button == 0) {
        if(temp.value === '' || temp.value === 0){
            printAlert()
        } 
        else
        if(isNumber(temp.value)){
             printOutput(temp.value,convertDecToFis(temp.value))
        } 
        else 
        if(isFis(temp.value)){
            printOutput(temp.value,convertFisToDec(temp.value))
        } 
        else 
        if(isExpression(temp.value)){
            printOutput(temp.value,convertDecToFis(doMath(temp.value)))
        } 
        else {
            printError(temp.value)
        }
    }
}

function doMath(exp){
    var list = exp.split("+")
    
    list.splice(0,0,0)
    
    //loop through expression, do some math
    while(list.length > 1){
        var A = list[0]
        var B = list[1]
        var tempB = B.split('-')
        
        if(isFis(B)){
            B = convertFisToDec(B)[0]
        } 
        
        if(tempB.length > 1){
            if(isFis(tempB[0])){
                tempB[0] = convertFisToDec(tempB[0])[0]
            }
            while(tempB.length > 1){
                console.log(tempB)
                //convert numbers to decimal
                if(isFis(tempB[0])){tempB[0] = convertFisToDec(tempB[0])[0]}
                if(isFis(tempB[1])){tempB[1] = convertFisToDec(tempB[1])[0]}
                    
                //subtract A from B
                B = Number(tempB[0]) - Number(tempB[1])
                tempB.splice(1,1)
                console.log(tempB)
                console.log(A)
            }
        }
        
        //add A and B
        list[0] = Number(A) + Number(B)
        list.splice(1,1)
    }
    
    // return Decimal and
    // convert expression result to FIS standard
    return Number(list[0])
}

function convertDecToFis(decimal){
    
    var temp = revZero(Number(decimal))
    
    footTrue = temp
    inchTrue = temp * 12
    sixTrue  = inchTrue * 16
    sixRoun = Math.round(sixTrue)
   
    foot = Math.floor((sixRoun / 16) / 12)
    inch = Math.floor(sixRoun / 16) - (foot * 12)
    six  = sixRoun - (((foot * 12) + inch) * 16)
    dec  = sixTrue - sixRoun
    
    
    foot = revZero(foot)
    fis = foot + " - " + inch + " - " + six
    rem = (dec*100).toFixed(2)
    
    return [fis,rem]
}

function convertFisToDec(fis){
    var temp = fis.split('.')
    
    if(temp[0])
    
    temp[0] = revZero(temp[0])
    temp[1] = temp[1] / 12
    temp[2] = (temp[2] / 16) / 12
    dec = revZero((Number(temp[0]) + temp[1] + temp[2]).toFixed(3))
    
    return [dec]
}



function printOutput(a,b){
    
    output = "<div class='solution output'>" 
                    + a + " = " + b[0] 
                + "</div>"
    
    //compile history
    document.getElementById('result').innerHTML = historyCheck(output)
    
    //clear input box & user message
    document.getElementById('input').value = ''
    document.getElementById('userMessage').innerHTML = ''
}

function printError(source){
    var errorMsg = "error:" + source + " is not a number or expression"
    output = "<div class='error'>" + errorMsg + "</div>"
    
    //compile history
    document.getElementById('result').innerHTML = historyCheck(output)
    document.getElementById('userMessage').innerHTML = 'enter a number'
    
    //clear input box & user message
    document.getElementById('input').value = ''
    document.getElementById('userMessage').innerHTML = ''
}

function printAlert(){
    document.getElementById('userMessage').innerHTML = 'enter a number'
}

function historyCheck(h){
    if(!history)
    	return h
    else 
   	    return h + document.getElementById('result').innerHTML
    
}

function isNumber(x){
    return !isNaN(x)
}

function isFis(z){
    var zArray = z.split('.')
    
    tempActive = false
    if(zArray[0] === '' && zArray.length > 1){
        zArray.splice(0,1)
        tempActive = true
    }
    
    var len   = zArray.length === 3
    var isNumOne = isNumber(zArray[0])
    var isNumTwo = isNumber(zArray[zArray.length-1])
    
    return len && isNumOne && isNumTwo
    
}

function isExpression(y){
    var len = y.split(/([-+])\w+/g).length > 1
    return len
}


function returnNegative(n){
    return 0 > n
}

function revZero(np) {
    var isNeg = np < 0
    if(tempActive || isNeg){
        if(isNeg){
            tempActive = true
        } else {
            tempActive = false;
        }
        return np * -1
    } else {
        return np
    }
}