<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let description: string;
    export let done: boolean;
</script>

<div
    class="flex items-center space-x-3 border-2 border-gray-500 rounded-xl py-2 pl-4 my-2 cursor-pointer"
    class:border-yellow-500={done}
    on:click={() => dispatch("toggle")}
>
    <span class="button" on:click={() => dispatch("toggle")}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="button h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
            />
        </svg>
    </span>
    <span class="button" on:click={() => dispatch("remove")}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="button h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
        </svg>
    </span>
    <span class="w-max" class:line-through={done}>{description}</span>
</div>
