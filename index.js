//MODEL SECTION

let tasks = [];

let completedTasks = [];

const savedpending = JSON.parse(localStorage.getItem('pendingtasks'));
const savedcompleted = JSON.parse(localStorage.getItem('completedtasks'));

if (Array.isArray(savedcompleted)) {
    completedTasks = savedcompleted;
}
if (Array.isArray(savedpending)) {
    tasks = savedpending;
}

document.querySelector("#task").addEventListener("keyup", event => {
    if (event.key !== "Enter") return; // Use `.key` instead.
    document.querySelector("#submitbutton").click(); // Things you want to do.
    event.preventDefault(); // No need to `return false;`.
});

//create task function
function createtask(task, id) {
    tasks.push({
        taskname: task,

        id: id,
    });
    savetasks();
}

//removetask function
function removetask(idtodelete) {
    tasks = tasks.filter(function (task) {
        if (task.id === idtodelete) {
            return false;
        } else {
            return true;
        }
    });
    savetasks();
}

function removecompletedtask(idtodelete) {
    completedTasks =
        completedTasks.filter(function (task) {
            if (task.id === idtodelete) {
                return false;
            } else {
                return true;
            }
        });
    rendercompleted();
    savetasks();
}
//completetask function
function movetocomplete(idtocomplete) {
    tasks = tasks.filter(function (task) {
        if (task.id === idtocomplete) {
            completedTasks.push(task);
            return false;
        } else {
            return true;
        }
    });
    savetasks();

}



function savetasks() {
    localStorage.setItem('completedtasks', JSON.stringify(completedTasks));
    localStorage.setItem('pendingtasks', JSON.stringify(tasks));
}




renderpending();
rendercompleted();



//CONTROLLER SECTION


//clearing input after each entry
{
    const btn = document.getElementById('submitbutton');

    btn.addEventListener('click', function handleClick(event) {
        // 👇️ if you are submitting a form (prevents page reload)
        event.preventDefault();

        const taskinput = document.getElementById('task');

        // Send value to server
        // console.log(taskinput.value);

        // 👇️ clear input field
        taskinput.value = '';
    });
}


function addtask() {
    const textbox = document.getElementById("task");
    if (textbox.value === '') {
        alert("Please enter a valid task")
    }
    else {
        const task = textbox.value;
        const id = "" + new Date().getTime();
        createtask(task, id);
        renderpending();
        rendercompleted();
    }
}

function delete_task(event) {
    const idtodelete = event.target.id;
    removetask(idtodelete);

    renderpending();
    rendercompleted();
}
function delete_completedtask(event) {
    const idtodelete = event.target.id;
    removecompletedtask(idtodelete);

    renderpending();
    rendercompleted();
}

function completetask(event) {
    const idtocomplete = event.target.id;
    movetocomplete(idtocomplete);

    renderpending();
    rendercompleted();
}

//VIEW SECTION
function renderpending() {
    document.getElementById("tasklist").innerHTML = "";

    tasks.forEach(function (task) {
        //main content
        const element1 = document.createElement("div");
        element1.className = 'pendingClass';
        element1.innerText = task.taskname

        //delete button
        const deletebutton = document.createElement("button");
        deletebutton.innerText = "delete";

        deletebutton.className = "deletebuttonClass"

        deletebutton.onclick = delete_task;
        deletebutton.id = task.id;

        element1.appendChild(deletebutton);

        //complete button
        const completebutton = document.createElement("button");
        completebutton.innerText = "complete";


        completebutton.onclick = completetask;
        completebutton.id = task.id;
        completebutton.className = 'completebuttonClass'

        element1.appendChild(completebutton);

        const tasksection = document.getElementById("tasklist");
        tasksection.appendChild(element1);
    });
}

function rendercompleted() {
    document.getElementById("completelist").innerHTML = "";

    completedTasks.forEach(function (tasks) {
        const element2 = document.createElement("div");
        element2.innerText = tasks.taskname
        element2.className = 'completedClass';

        const deletebutton = document.createElement("button");
        deletebutton.innerText = "delete";

        deletebutton.className = "deletebuttonClass"

        deletebutton.onclick = delete_completedtask;
        deletebutton.id = tasks.id;

        element2.appendChild(deletebutton);

        const completesection = document.getElementById("completelist");
        completesection.appendChild(element2);
    });
}