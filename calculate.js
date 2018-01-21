var userInput = ''
var tempActive = false
var inchTrue, footTrue, sixTrue, sixRoun
var rem, p = '', n = ''
var foot = 0, inch = 0, six = 0
var fis, result, outputOne, outputTwo, compile 
var dec = 0
var history

function calculate() {
    var temp = document.getElementById('f')
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
    
    console.log('math: list: ')
    console.log(list)
    
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
        
        console.log(temp)
        
        list[0] = Number(list[0]) + Number(temp)
        list.splice(1,1)
    }
    
    // return Decimal and
    // convert expression result to FIS standard
    return Number(list[0])
}

function convertDecToFis(decimal){
    var temp = decimal
    
    tempActive = false
    if(returnNegative(decimal)){
        temp = decimal * -1
        tempActive = true
    }
    
    footTrue = temp
    inchTrue = temp * 12
    sixTrue  = inchTrue * 16
    sixRoun = Math.round(sixTrue)
   
    foot = Math.floor((sixRoun / 16) / 12)
    inch = Math.floor(sixRoun / 16) - (foot * 12)
    six  = sixRoun - (((foot * 12) + inch) * 16)
    dec  = sixTrue - sixRoun
   
    fis = foot + " - " + inch + " - " + six
    rem = (dec*100).toFixed(2)
    console.log('dec-fis: value: ')
    console.log([fis,rem])
    
    return [fis,rem]
}

function convertFisToDec(fis){
    var temp = fis.split('.')
    
    tempActive = false
    if(temp[0] === '' && temp.length > 3){
        tempActive = true
        temp.splice(0,1)
        console.log('fis-dec: is-negative: ')
        console.log(temp)
    }
    
    temp[1] = temp[1] / 12
    temp[2] = (temp[2] / 16) / 12
    console.log (temp)
    dec = (Number(temp[0]) + temp[1] + temp[2]).toFixed(3)
   
    return [dec]
}



function printOutput(a,b){
    var remainder = (b[1]/100).toFixed(2)
    
    n = ''
    if(tempActive){
        remainder = remainder * -1
        n = "-"
    }
    
    p = ''
    if(remainder > 0){
        p = "+"
    }
    
    outputOne = "<span class='solution'>" 
                    + a + " = " + n + b[0] 
                + "</span>"
                
    if(b[1]){
        outputTwo = "<span class='decimal rem-" 
                        + Math.sign(b[1]) + "'>"
                        + p + remainder
                    + "</span>"
    } else{
        outputTwo = ''
    }
    
    compile = "<div class='output'>" + outputOne + outputTwo + "</div>"
    
    //compile history
    document.getElementById('result').innerHTML = historyCheck(compile)
    
    //clear input box & user message
    document.getElementById('f').value = ''
    document.getElementById('userMessage').innerHTML = ''
}

function printError(source){
    var errorMsg = "error:" + source + " is not a number or expression"
    outputOne = "<div class='output error'>" + errorMsg + "</div>"
    
    //compile history
    document.getElementById('result').innerHTML = historyCheck(outputOne)
    document.getElementById('userMessage').innerHTML = 'enter a number'
    
    //clear input box & user message
    document.getElementById('f').value = ''
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

function reverseZero(np) {
    return np * -1
}