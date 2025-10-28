# Task Tracker CLI

Task tracker CLI made as a sample project from https://roadmap.sh/projects/task-tracker

## Steps to run

```
npm install
task-cli <any command you wanna use , to see supported , use task-cli --help>
```

## Supported Actions

```
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```
