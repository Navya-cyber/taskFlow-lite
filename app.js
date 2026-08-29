const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

taskForm.addEventListener("submit", function(e){
    e.preventDefault();

    if(taskInput.value.trim() === ""){
        alert("Task cannot be empty");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filteredTasks = tasks){

    taskList.innerHTML = "";

    if(filteredTasks.length === 0){
        taskList.innerHTML = "<li>No Tasks Found</li>";
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div>
                <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${task.id})">

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    taskCount.textContent = `${tasks.length} Tasks`;
}

function toggleTask(id){

    tasks = tasks.map(task => {
        if(task.id === id){
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id){

    const confirmDelete =
        confirm("Delete this task?");

    if(confirmDelete){

        tasks = tasks.filter(
            task => task.id !== id
        );

        saveTasks();
        renderTasks();
    }
}

function filterTasks(type){

    if(type === "active"){
        renderTasks(
            tasks.filter(task => !task.completed)
        );
    }

    else if(type === "completed"){
        renderTasks(
            tasks.filter(task => task.completed)
        );
    }

    else{
        renderTasks(tasks);
    }
}