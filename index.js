#!/usr/bin/env node
import { program } from "commander";
import chalk from "chalk";
import {
    addTask,
    deleteTask,
    listAllTasks,
    listTasksByState,
    markDone,
    markInProgress,
    updateTask,
} from "./utils/taskActions.js";

program
    .name("task ")
    .version("1.0.0")
    .description("task tracker CLI")
    .action(() => {
        console.log(chalk.blue(`Welcome to Task Tracker CLI!`));
    });

program
    .command("add <task>")
    .description("Add a new task")
    .action((task) => {
        console.log(addTask(task));
    });

program
    .command("list [state]")
    .description("List tasks")
    .action((state) => {
        if (!state) {
            console.log(listAllTasks());
        } else {
            console.log(listTasksByState(state));
        }
    });

program
    .command("update <id> <desc>")
    .description("Update existing task with given id")
    .action((id, desc) => {
        console.log(updateTask(id, desc));
    });

program
    .command("delete <id>")
    .description("Delete task with given id")
    .action((id) => {
        console.log(deleteTask(id));
    });

program
    .command("mark-in-progress <id>")
    .description("Mark the task as in-progress")
    .action((id) => {
        console.log(markInProgress(id));
    });

program
    .command("mark-done <id>")
    .description("Mark the task as done")
    .action((id) => {
        console.log(markDone(id));
    });

program.parse(process.argv);
