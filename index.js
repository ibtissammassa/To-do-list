// Change day based on the day you are on

const Day = document.querySelector(".Day");

var d = new Date();
var weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var today=weekday[d.getDay()]; //getDay() returns a number

Day.innerHTML=today;

//call the storage so everything stays the same as we left it
let list = JSON.parse(localStorage.getItem("list"));
if(list){
    list.forEach((task)=>{
        ToDoList(task);
    });
}

//Submit:
const form = document.querySelector("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    ToDoList();
});


function ToDoList(task){
    const List = document.querySelector(".AddedLists");
    const input = document.getElementById("Add");
    const error = document.querySelector(".error");
    let text = input.value;//take task submited

    if(task){
        text= task.toDo;
    }

//if there is no input :
    if(text==''){
        error.style.display = 'block';
        input.style.border = 'red solid 1px';
        return;
    }else{
        error.style.display = 'none';
        input.style.border = 'none';
    }

    
//create a task every time we submit it
    const to_do = document.createElement("div");//create div

    if(task && task.checked){
        to_do.classList.add("Done");
    }
    to_do.classList.add("to-do");//add class to-do so it can be styled

    to_do.innerHTML=`<svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
    <p>${text}</p>
    <svg class="trash" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>` ; //add the Html + content(task)

    List.appendChild(to_do);//add the div on my list 
    input.value="";//empty the input bar
    

//checkbox:
    const Checkbtns = document.querySelectorAll(".check");//select all elements with check class
    
    Checkbtns.forEach((Checkbtn) => {
        Checkbtn.addEventListener("click", () => {
            if(Checkbtn.parentNode.classList.contains("to-do")){
                Checkbtn.parentNode.classList.replace("to-do","Done");  
            }else{
                Checkbtn.parentNode.classList.replace("Done","to-do");
            }
            UpdateLocalStorage();
        });  
    });

//trashBtn:
    const trashs = document.querySelectorAll('.trash');

    trashs.forEach((trash)=>{
        trash.addEventListener("click", () => {
            trash.parentNode.remove();
            UpdateLocalStorage();
        });
    });

UpdateLocalStorage();
}



//storing it (even if we refresh the page it's there)
function UpdateLocalStorage(){
    list = [];
    const Lists = document.querySelectorAll('.to-do, .Done');
    
    Lists.forEach((myList)=>{
        const p = myList.querySelector("p");
        list.push({
            toDo: p.innerText,
            checked: myList.classList.contains("Done"),
        });
    });
    localStorage.setItem("list",JSON.stringify(list));//converting the list array into a JSON string before storing it in localStorage with the key "list". 
    // (localStorage can only store string values).
}



