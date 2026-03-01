let push =document.querySelector("#push")
let inputbtn =document.querySelector("#newTask input")
let tasks = document.querySelector("#taskList")
let current_tasks = document.querySelectorAll(".delete")

push.onclick = function(){
    if(inputbtn.value.length == 0){
        alert("Please Enter a Task")
    } else{
        tasks.innerHTML += 
        `<li class= "task">
            <span id= "taskname">
                ${inputbtn.value}
            </span>
            <button class= "delete">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </li>`

        inputbtn.value = ""

        
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove()
            }
        }
    }
}