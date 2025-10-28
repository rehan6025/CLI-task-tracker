import { addTask, markInProgress, updateTask } from "../utils/taskActions";

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
        const task = "Some task";
        const t = addTask(task);
        const res = updateTask(t.id, "new description");
        expect(res).toBe("Task updated successfully");
    });

    it("should return if id is wrong", () => {
        const res = updateTask(0, "newDesc");
        expect(res).toBe("No such task exits with given id");
    });
});

describe("changeStatus", () => {
    it("should change progress to in-progress", () => {
        const task = "some task";
        const t = addTask(task);
        const res = markInProgress(t);
        expect(res).toBe("Task status updated successfully.");
    });
});
