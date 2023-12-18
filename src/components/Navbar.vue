<template>
    <nav class="px-6 py-8 bg-indigo-600 flex justify-between items-center">
        <ul class="flex space-y-0 flex-row items-center space-x-10 mt-0">
            <li>
                <div class="relative">
                    <button @click="show = !show"
                        class="flex items-center text-indigo-100 bg-indigo-600 rounded-md focus:outline-none">
                        <span class="mr-4">Algorithms</span>
                        <svg class="w-5 h-5 text-indigo-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>

                    <div v-show="show" class="py-2 mt-2 bg-indigo-500 rounded-md shadow-xl absolute w-44">
                        <router-link to="/" @click="selectDropdownItem('Dropdown List 1')"
                            class="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100">
                            Dropdown List 1
                        </router-link>
                        <router-link to="/" @click="selectDropdownItem('Dropdown List 2')"
                            class="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100">
                            Dropdown List 2
                        </router-link>
                        <router-link to="/" @click="selectDropdownItem('Dropdown List 3')"
                            class="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100">
                            Dropdown List 3
                        </router-link>
                        <!-- Add more dropdown items as needed -->
                    </div>
                </div>
            </li>
            <li class="text-gray-100 hover:text-indigo-400">Select Start</li>
            <li class="text-gray-100 hover:text-indigo-400">Select Destination</li>
            <li class="text-gray-100 hover:text-indigo-400 bg-indigo-500 p-4 rounded-lg">Visualize {{ selectedDropdownItem
            }}</li>
            <li class="text-gray-100 hover:text-indigo-400">Reset Board</li>
        </ul>
        <div class="text-gray-100 text-lg font-bold uppercase">Pathfinder Visualizer</div>
    </nav>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        let show = ref(false);
        let selectedDropdownItem = ref("");

        const toggleNav = () => {
            show.value = !show.value;
        };

        const selectDropdownItem = (item) => {
            selectedDropdownItem.value = item;
            // Close the dropdown menu
            show.value = false;
            // You can perform additional actions based on the selected item if needed
        };

        return { show, selectedDropdownItem, toggleNav, selectDropdownItem };
    },
};
</script>
