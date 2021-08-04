import { writable } from "svelte/store";

import type { Task } from "./types";
import type { Writable } from "svelte/store";

const storedTasks: Task[] = JSON.parse(localStorage.getItem("tasks"));
export const tasks: Writable<Task[]> = writable(storedTasks || []);

tasks.subscribe((task) => localStorage.setItem("tasks", JSON.stringify(task)));
