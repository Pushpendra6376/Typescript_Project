
interface Task {
    id: number;
    title: string;
    dueDate: string;
    isCompleted: boolean;
}

const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const dateInput = document.getElementById('dateInput') as HTMLInputElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

let tasks: Task[] = loadTasks();
renderTasks();

addBtn.addEventListener('click', () => {
    const title = taskInput.value;
    const date = dateInput.value;

    if (title === "" || date === "") {
        alert("Please enter both a task and a due date.");
        return;
    }

    const newTask: Task = {
        id: Date.now(), 
        title: title,
        dueDate: date,
        isCompleted: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    
    taskInput.value = "";
    dateInput.value = "";
});


function renderTasks(): void {
    taskList.innerHTML = ""; 

    tasks.forEach(task => {
        const li = document.createElement('li');
        
        
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = task.isCompleted;
        checkbox.addEventListener('change', () => toggleTask(task.id));

        
        const taskText = document.createElement('span');
        taskText.innerText = `${task.title} (Due: ${task.dueDate})`;
        if (task.isCompleted) {
            taskText.classList.add('completed');
        }

        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}


function toggleTask(id: number): void {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.isCompleted = !task.isCompleted;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id: number): void {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}


function saveTasks(): void {
    localStorage.setItem('my-tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem('my-tasks');
    if (taskJSON == null) return [];
    return JSON.parse(taskJSON);
}