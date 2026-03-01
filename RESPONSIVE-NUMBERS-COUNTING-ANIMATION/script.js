let valueDisplay = document.querySelectorAll(".number")
let intervel = 3000

valueDisplay.forEach((valuedisplay) => {
    let startvalue = 0
    let endvalue = parseInt(valuedisplay.getAttribute("data-value"))
    
    let duration = Math.floor(intervel / endvalue)

    let counter = setInterval(function(){
        startvalue +=1 
        valuedisplay.textContent = startvalue
        if (startvalue == endvalue){
            clearInterval(counter)
        }
    }, duration)
})
