let optionBtn = document.querySelectorAll(".option-btn")
let formatBtn = document.querySelectorAll(".format")
let advOptionBtn = document.querySelectorAll(".adv-option-btn")
let alingBtn = document.querySelectorAll(".align")
let fontName = document.getElementById("fontName")
let fontSize = document.getElementById("fontSize")
let writingArea = document.getElementById("text-input")
let linkBtn = document.getElementById("createLink")
let spacingBtn = document.querySelectorAll(".spacing")
let ScriptBtn = document.querySelectorAll(".script")

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive"
]

const initializer = () => {
    highlighter(alingBtn, true)
    highlighter(spacingBtn, true)
    highlighter(ScriptBtn, true)
    highlighter(formatBtn, false)

    fontList.map((value)=>{
        let option = document.createElement("option")
        option.value = value
        option.innerHTML = value
        fontName.appendChild(option)
    })

    for (let i = 1; i < 7; i++) {
        let option = document.createElement("option")
        option.value = i
        option.innerHTML = i
        fontSize.appendChild(option)
    }

    fontSize.value = 3
}


const modfyText = (command, defoultUi, value)=>{
    document.execCommand(command, defoultUi, value)
}

optionBtn.forEach((button)=>{
    button.addEventListener("click", ()=>{
        modfyText(button.id, false, null)
    })
})

advOptionBtn.forEach((button)=>{
    button.addEventListener("change", ()=>{
        modfyText(button.id, false, button.value)
    })
})

linkBtn.addEventListener("click", ()=>{
    let userLink = prompt("Enter Link URL")

    if(/http/i.test(userLink)){
        modfyText(linkBtn.id, false, userLink)
    } else {
        userLink = "http://" + userLink
        modfyText(linkBtn.id, false, userLink)
    }
})


const highlighter = (className, needsRemoval)=>{
    className.forEach((button)=>{
        button.addEventListener("click", ()=>{
            if(needsRemoval){
                let alreadyActive = false

                if(button.classList.contains("active")){
                    alreadyActive = true
                }

                highlighterRemover(className)
                if(!alreadyActive){
                    button.classList.add("active")
                }
            } else{
                button.classList.toggle("active")
            }
        })
    })
}

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active")
    })
}

window.onload = initializer