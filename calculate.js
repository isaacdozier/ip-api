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
    
    // add empty index 0 to store result
    list.splice(0,0,0)
    
    //loop through expression, do some math
    while(list.length > 1){
        var temp = list[1]
        var tempArray = temp.split('-')
        if(isFis(temp)){
            temp = convertFisToDec(temp)[0]
        } 
        if(tempArray.length > 1){
            while(tempArray.length > 1){
                if(isFis(tempArray[0])){tempArray[0] = convertFisToDec(tempArray[0])[0]}
                if(isFis(tempArray[1])){tempArray[1] = convertFisToDec(tempArray[1])[0]}
                temp = Number(tempArray[0]) - Number(tempArray[1])
                tempArray.splice(1,1)
            }
        }
        
        list[0] = Number(list[0]) + Number(temp)
        list.splice(1,1)
    }
    
    // return Decimal and
    // convert expression result to FIS standard
    return Number(list[0])
}

function convertDecToFis(decimal){
    var temp = Number(decimal)
    tempActive = false;
    revZero(temp)
    
    footTrue = temp
    inchTrue = temp * 12
    sixTrue  = inchTrue * 16
    sixRoun = Math.round(sixTrue)
   
    foot = Math.floor((sixRoun / 16) / 12)
    inch = Math.floor(sixRoun / 16) - (foot * 12)
    six  = sixRoun - (((foot * 12) + inch) * 16)
    dec  = sixTrue - sixRoun
    
    revZero(foot)
   
    fis = foot + " - " + inch + " - " + six
    rem = (dec*100).toFixed(2)
    
    return [fis,rem]
}

function convertFisToDec(fis){
    var temp = fis.split('.')
    tempActive = false;
    revZero(temp[0])
    
    temp[1] = temp[1] / 12
    temp[2] = (temp[2] / 16) / 12
    dec = (Number(temp[0]) + temp[1] + temp[2]).toFixed(3)
    
    return [revZero(dec)]
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
    
    console.log(zArray)
    console.log(len)
    console.log(isNumOne)
    console.log(isNumTwo)
    
    return len && isNumOne && isNumTwo
    
}

function isExpression(y){
    return y.split(/([-+])\w+/g).length > 1
}

function returnNegative(n){
    return 0 > n
}

function revZero(np) {
    var isNeg = np < 0
    if(tempActive || isNeg){
        if(isNeg){
            tempActive = true
        }
        return np * -1
    } else {
        return np
    }
}