let tasklist = []; //This creates an empty array called taskList

loadTasks();

//addTask is a function created to handle adding a task when the user clicks the Add button
function addTask(){ 
  let input = document.getElementById("taskInput"); //input stores a reference to the input box in your HTML
  let task = input.value.trim(); //task stores the trimmed version of what the user typed — meaning any extra spaces at the start or end are removed.
  if (task === "") return; //If the user didn’t type anything, or only typed spaces, then the function stops there and does not add a blank task to the list

  //Imagine your to-do list is like a real notebook, and each task is a sticky note you add to a page. In the code, taskList is your notebook — an empty list where all your tasks are stored. When the user types something (like “Buy milk”) and clicks the Add button, the code creates a little sticky note (a task object) with two things: the text of the task and a note saying it’s not done yet (done: false). Then, taskList.push(...) adds that sticky note to the notebook by placing it at the end of the list. So every time you add a task, it gets saved as a new sticky note in your digital notebook!
  tasklist.push({text:task, done:false});
  input.value = ""; //This clears the input box after the task is added. So the user doesn’t have to delete the old text before typing a new one.
  saveTasks(); //Saves the taskList to localStorage, so the tasks stay even after refreshing the page.
  renderTasks(); //This calls a function that displays all the tasks on the screen
}
function renderTasks() {
  let ul = document.getElementById("tasklist"); //finds the <ul> element in the HTML, which is the place where all the task items will be displayed
  ul.innerHTML = ""; //clears out anything that was already inside that list. This is done so that when you refresh or re-render the tasks (like after adding a new one), it starts from a clean slate and doesn’t duplicate the old tasks.

  //This line starts a loop using the .forEach() method.forEach() is a built-in JavaScript method that lets you run some code for each item in an array
  //task represents the current task object (like { text: "Buy milk", done: false }). index is the position of that task in the array (first = 0, second = 1, etc.).
  tasklist.forEach((task, index) => {
    let li = document.createElement("li"); //This creates a new <li> element — a list item in HTML. You’re doing this so you can add a task to the list on your page.
    li.textContent = task.text; ////This puts the actual text of the task (like “Buy milk”) inside the <li> you just created.

    //This puts the actual text of the task (like “Buy milk”) inside the <li> you just created.
    //The second part is conditional. If the task is marked done: true, it gets: Green background, Strikethrough line (completed look), Gray text. If it’s not done, it just looks normal but changes shade on hover.
    //This is why you’re styling in JavaScript: Because each task’s style depends on its data (done true or false). You can’t do that easily with plain HTML/CSS alone.
    li.className = `
      px-4 py-2 rounded-md cursor-pointer 
      ${task.done ? "bg-green-100 line-through text-gray-500" : "bg-gray-100 hover:bg-gray-200"}
    `;

    li.addEventListener("click", () => {
      tasklist[index].done = !tasklist[index].done; //This tells the browser: When someone clicks this task, toggle its done status.
      saveTasks();
      renderTasks();
    });

    //li is the <li> element you created earlier (a task in your to-do list). 
   //.addEventListener("dblclick", ...) is a predefined JavaScript method that listens for a specific action (event) — in this case, a double-click. 
   //The () => { ... } part is an arrow function, which defines what should happen when the double-click occurs.
    li.addEventListener("dblclick", () => {
      tasklist.splice(index, 1); //This says: When someone double-clicks this task, remove it from the list.
      saveTasks();
      renderTasks();
    });

    //// Adds the newly created <li> (task item) to the <ul> list in the HTML, so it becomes visible on the page as part of the task list.
    ul.appendChild(li);
  });
}

//This defines a custom function named saveTasks. You created it so that your to-do app can save the current list of tasks permanently — even if the user closes or refreshes the page.
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasklist)); 
  //localStorage.setItem("tasks", ...) : This line saves data in the browser’s localStorage — a built-in place where websites can store data.
  //"tasks" is the key — like a label or name for what you’re saving.
  //taskList is your array of tasks. But localStorage can only store strings, not full objects or arrays. JSON.stringify() converts the task array into a string so it can be saved.
}

function loadTasks() {
  let saved = localStorage.getItem("tasks"); //This tries to get the item named "tasks" from the browser’s localStorage.If there is something saved, it will be a string version of your task list.

  //This checks: “Was anything found in localStorage?”
  //If saved is not null (i.e., there’s something saved), then move to the next step.
  if (saved) { 
    tasklist = JSON.parse(saved); //This takes the string from localStorage and converts it back into a real JavaScript array using JSON.parse.
    renderTasks();
  }
}