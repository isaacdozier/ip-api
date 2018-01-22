var fisConvert = function() {
    var temp = document.getElementById('input')
    var tempActive = false
    var inchTrue, footTrue, sixTrue, sixDeci, sixRoun
    var foot = 0, inch = 0, six = 0
    var fis, result, output 
    var dec = 0, rem
    var history
    var errorMsg = 'error'
    
    if(event.keyCode == 13) {
        if(temp.value === ''){
            return [0, errorMsg]
        } else
        if(!isNaN(temp.value)){
            
            
            tempActive = false
            if(temp.value < 0){
                temp = temp.value * -1
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
    	   
    	    fis = foot + '-' + inch + '-' + six
    	    rem = dec.toFixed(2)
    	    
    	    if(tempActive){
    	        rem = rem * -1
    	    }
    	   
            return [fis, rem]
    
        } else {
            return [2, errorMsg]
        }
    }
}