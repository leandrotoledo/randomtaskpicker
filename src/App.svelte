<script lang="ts">
  import { get } from "svelte/store";
  import { tasks } from "./store";

  import Task from "./components/Task.svelte";

  import type { Task as TaskType } from "./types";

  let pickedTask: TaskType;
  let description: string;
  let error: string;

  function addTask() {
    if (description) {
      let newTask: TaskType = {
        description: description,
        done: false,
      };

      description = "";
      error = "";

      tasks.update((task) => [...task, newTask]);
    } else {
      error = "Empty tasks are too easy, c'mon!";
    }
  }

  function removeTask(index: number) {
    let storedTasks: TaskType[] = get(tasks);
    storedTasks.splice(index, 1);

    tasks.set(storedTasks);
  }

  function resetTasks() {
    pickedTask = null;
    error = "";

    tasks.set([]);
  }

  function pickATask() {
    let storedTasks: TaskType[] = get(tasks);
    if (!storedTasks.length) {
      error = "You gotta add a few tasks first, you know?";
      return;
    }

    let unfinished_tasks: TaskType[] = [];
    for (let task of storedTasks) {
      if (task.done === false) {
        unfinished_tasks = [...unfinished_tasks, task];
      }
    }

    if (!unfinished_tasks.length) {
      error = "It seems like you completed 'em all!";
      return;
    }

    shuffle(unfinished_tasks);

    pickedTask = unfinished_tasks[0];

    let task: TaskType = storedTasks.find(
      (t) => t.description === pickedTask.description && t.done === false
    );
    task.done = true;

    tasks.set(storedTasks);
  }

  function onKeyPress(e: KeyboardEvent) {
    if (e.key === "Enter") {
      addTask();
    }
  }

  function shuffle(array: TaskType[]) {
    for (let i: number = array.length - 1; i > 0; i--) {
      let j: number = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
</script>

<main class="max-w-md m-auto mt-10 p-10 rounded-xl text-gray-50 ">
  <h1 class="font-mono text-4xl text-center tracking-wider ">
    Random<br />
    Task Picker
  </h1>

  <span class="block my-10 text-center items-center">
    {#if error}
      <p class="italic">Hmm...</p>
      <p class="italic">{error}</p>
    {:else if pickedTask}
      <p class="italic">Your next task is...</p>
      <p>{pickedTask.description}</p>
    {:else}
      <p class="italic">
        Don't know what to work on next?<br />
        Let me choose it for you...
      </p>
    {/if}
  </span>

  <div class="flex flex-col items-center">
    <span class="flex flex-row items-center p-2">
      <input
        class="rounded-full px-4 p-1 border-2 xl:w-80 text-black"
        type="text"
        bind:value={description}
        on:keypress={onKeyPress}
        placeholder="Add a task"
      />
      <span class="button" on:click={addTask}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
    </span>

    <span class="p-2">
      <button
        class="button rounded-full py-2 px-3 uppercase text-xs font-bold tracking-wider border-2"
        on:keydown|preventDefault
        on:click={pickATask}>Pick a task!</button
      >

      <button
        class="button rounded-full py-2 px-3 uppercase text-xs font-bold tracking-wider border-2"
        on:keydown|preventDefault
        on:click={resetTasks}>Reset</button
      >
    </span>
  </div>

  <span class="p-2 flex flex-col">
    {#each $tasks as task, index}
      <Task
        {...task}
        on:toggle={() => (task.done = !task.done)}
        on:remove={() => removeTask(index)}
      />
    {/each}
  </span>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .button {
    @apply cursor-pointer;
  }
  button.button:hover {
    @apply bg-yellow-500;
  }
  .button:hover > svg {
    @apply text-yellow-500;
  }
</style>
