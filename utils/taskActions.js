import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

//  current file's directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Create absolute path(from directory) to tasks file
const taskFile = path.join(__dirname, "..", "newtasks.json");

function addTask(task) {
    if (task === "") return "Task cannot be empty";
    const tasks = loadTasks();
    const newTask = {
        id: crypto.randomUUID(),
        description: task,
        status: "todo",
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return `Task added: ${task}`;
}

function saveTasks(tasks) {
    fs.writeFileSync(taskFile, JSON.stringify(tasks));
}

function loadTasks() {
    if (!fs.existsSync(taskFile)) {
        fs.writeFileSync(taskFile, JSON.stringify([]));
        return [];
    }
    const data = fs.readFileSync(taskFile);
    return JSON.parse(data);
}

function listTasksByState(state) {
    if (state != "todo" && state != "in-progress" && state != "done") {
        return chalk.red("Not a valid state, use todo, in-progress or done");
    }

    const tasks = loadTasks();
    if (!tasks) return "No tasks.";
    const reqTasks = tasks.filter((task) => task.status === state);
    return reqTasks;
}

function listAllTasks() {
    const tasks = loadTasks();
    if (!tasks) return "No tasks.";
    return tasks;
}

function updateTask(id, newDesc) {
    const tasks = loadTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return chalk.red("No such task exits with given id");
    const task = tasks[index];
    tasks.splice(index, 1, {
        id: task.id,
        description: newDesc,
        status: task.status,
        createdAt: task.createdAt,
        updatedAt: Date.now(),
    });

    saveTasks(tasks);
    return "Task updated successfully";
}

function deleteTask(id) {
    const tasks = loadTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return chalk.red("No task exists with given id");
    tasks.splice(index, 1);
    saveTasks(tasks);
    return chalk.green("Task Deleted Successfully");
}

function markInProgress(id) {
    const tasks = loadTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return chalk.red("No Task exists with given ID");
    let task = tasks[index];
    tasks.splice(index, 1, {
        id: task.id,
        description: task.description,
        status: "in-progress",
        createdAt: task.createdAt,
        updatedAt: Date.now(),
    });
    saveTasks(tasks);
    return chalk.green(`Task status updated successfully.`);
}

function markDone(id) {
    const tasks = loadTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return chalk.red("No Task exists with given ID");
    let task = tasks[index];
    tasks.splice(index, 1, {
        id: task.id,
        description: task.description,
        status: "done",
        createdAt: task.createdAt,
        updatedAt: Date.now(),
    });
    saveTasks(tasks);
    return chalk.green(`Task status updated successfully.`);
}

export {
    addTask,
    listTasksByState,
    listAllTasks,
    updateTask,
    deleteTask,
    markInProgress,
    markDone,
};
