const inputEl = document.querySelector('.enter-input');
const btn = document.querySelector('.add-task');
const tasksContainer = document.querySelector('.task');

let isEditing = false;
let currentTaskItem = null;

//check for duplicates
function isDupTask(text) {
    const tasks = document.querySelector('.task-text');
    return Array.from(allTasks).some(t => t.textContent.toLowerCase() === text.toLowerCase());
}

btn.addEventListener('click', function() {
    // get user entered content
    const task = inputEl.value.trim();
    
    if(task === '') return; // skip if input empty

    //do editing 
    if(isEditing) {
        const currentText = currentTaskItem.querySelector('.task-text').textContent.trim();
        if (task.toLowerCase() !== currentText.toLowerCase() && isDupTask(task)) {
            alert('Task already exists');
            return;
        }
        //update content
        currentTaskItem.querySelector('.task-text').textContent = task;

        //reset trang thai
        inputEl.value = "";
        btn.textContent = "Add Task";
        isEditing = false;
        currentTaskItem = null;
        return;
    }

    // ADD
    if (isDupTask(text)) {
        alert("Task already exists");
        return;
    }

    //create task box
    const taskItem = document.createElement('div');
    taskItem.className = 'flex justify-between items-center bg-[#8b5cf6] p-3 rounded-lg'

    // add new
    const taskText = document.createElement('p');
    taskText.textContent = task;
    taskText.className = 'text-white text-lg';

    //repair icon
    const fixBtn = document.createElement('button');
    fixBtn.className = 'edit-btn';
    fixBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" 
             fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
             stroke="white" class="w-6 h-6 mr-3">
          <path stroke-linecap="round" stroke-linejoin="round" 
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 
                4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 
                4.5 0 011.13-1.897l8.932-8.931z" />
          <path stroke-linecap="round" stroke-linejoin="round" 
                d="M19.5 7.125L16.875 4.5" />
        </svg>
    `;

    //remove icon
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" 
             fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
             stroke="white" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" 
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 
                1.022.166m-1.022-.165L18.16 19.673A2.25 
                2.25 0 0115.916 21H8.084a2.25 2.25 0 
                01-2.244-2.327L6.772 5.79m12.456 
                0a48.108 48.108 0 00-3.478-.397m-12 
                .562c.34-.059.68-.114 1.022-.165m0 
                0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.16-2.09-2.243a49.255 
                49.255 0 00-3.32 0c-1.18.083-2.09 
                1.063-2.09 2.243v.916m7.5 0a48.667 
                48.667 0 00-7.5 0" />
        </svg>
    `;

    //remove event
    removeBtn.addEventListener('click', function() {
        // neu dang edit ma xao task dang edit thi reset input
        if (isEditing && currentTaskItem === taskItem) {
            inputEl.value = "";
            btn.textContent = "Add Task";
            isEditing = false;
            currentTaskItem = null;
        }
        taskItem.remove();
    })

    //repair event
    fixBtn.addEventListener('click', function() {
        inputEl.value = taskText.textContent; //dua text len input
        btn.textContent = 'Update Task'; //doi nut
        isEditing = true; 
        currentTaskItem = taskItem; // luu lai task dang sua
        inputEl.focus();
    });

    const btnGroup = document.createElement('div');
    btnGroup.className = 'flex';
    btnGroup.appendChild(fixBtn);
    btnGroup.appendChild(removeBtn);

    taskItem.appendChild(taskText);
    taskItem.appendChild(btnGroup);

    // push UI
    tasksContainer.appendChild(taskItem);

    //remove input after add
    inputEl.value = '';
    inputEl.focus();

})

