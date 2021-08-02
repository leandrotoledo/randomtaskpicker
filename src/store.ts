import { writable } from "svelte/store";

import type { Task } from "./types";

const storedTasks: Task[] = JSON.parse(localStorage.getItem("tasks"));
export const tasks = writable(storedTasks || []);

tasks.subscribe(task =>
    localStorage.setItem("tasks", JSON.stringify(task))
);