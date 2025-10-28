import { addTask, markInProgress, updateTask } from "../utils/taskActions";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//  current file's directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Create absolute path(from directory) to tasks file
const taskFile = path.join(__dirname, "..", "newtasks.json");

describe("addTask", () => {
    it("should add a task correctly", () => {
        const task = "Test Task";
        const res = addTask(task);
        expect(res).toBe(`Task added: ${task}`);
    });

    it("should handle empty task input", () => {
        const task = "";
        const res = addTask(task);
        expect(res).toBe("Task cannot be empty");
    });
});

describe("updateTask", () => {
    it("should update task with new description", () => {
        addTask("Test task");
        const tasks = JSON.parse(fs.readFileSync(taskFile));
        const taskId = tasks[tasks.length - 1].id;

        const res = updateTask(taskId, "new description");
        expect(res).toBe("Task updated successfully");
    });

    it("should return if id is wrong", () => {
        const res = updateTask("non-existent-id", "newDesc");
        expect(res).toContain("No such task exits with given id");
    });
});

describe("changeStatus", () => {
    it("should change progress to in-progress", () => {
        addTask("Test task");
        const tasks = JSON.parse(fs.readFileSync(taskFile));
        const taskId = tasks[tasks.length - 1].id;

        const res = markInProgress(taskId);
        expect(res).toContain("Task status updated successfully");
    });
});
