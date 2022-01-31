const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;
let statusApp = "stop";

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value !== "") {
    createTask(itTask.value);

    renderTasks();
  }
});

function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(2),
    title: value,
    completed: false,
  };

  tasks.unshift(newTask);
}

function renderTasks() {
  const html = tasks.map((task) => {
    return `
        <div class="task">
            <div>${task.title}</div>
            <div>${
              task.completed
                ? ""
                : `<button class="start-button" data-id="${task.id}">Start</button></div>`
            }
        </div>`;
  });
  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html;

  const startButtons = document.querySelectorAll(".task .start-button");
  startButtons.forEach((startButton) => {
    startButton.addEventListener("click", () => {
      startButtonHandler(startButton.getAttribute("data-id"));
    });
  });
}

function startButtonHandler(id) {
  time = 10;
  current = id;
  timer = setInterval(() => {
    timerHandler(id);
  }, 1000);
}

function timerHandler(id = null) {
  time--;
  renderTime();
  if (time === 0) {
    markComplete(id);
    clearInterval(timer);
    renderTasks();
    startBreak();
  }
}

function markComplete(id) {
  const taskId = tasks.findIndex((task) => task.id === id);
  tasks[taskId].completed = true;
}

function startBreak() {
  time = 5;
  timerBreak = setInterval(timerBreakHandler, 1000);
}

function timerBreakHandler() {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timerBreak);
  }
}

function renderTime() {
  const timeDiv = document.querySelector("#time");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);
  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}
