<script setup>
import { defineProps, ref } from 'vue';

defineProps({
    txt: ''
})

let taskDescription = ref('');
</script>

<template>
    <div class="block">
        {{ txt }}
    </div>
</template>

<style scoped>
    .block {
        background-color: var(--color-02);
        padding: 11rem;
        margin: 1rem;
        border-radius: 30px;
    }
</style>
