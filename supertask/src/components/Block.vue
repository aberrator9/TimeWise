<script setup>
import { defineProps, ref } from 'vue';

defineProps({
    txt: ''
})

let flipped = ref(false);
</script>

<template>
    <div class="block"> 
        {{ !flipped ? txt : '...' }} 
    </div>
    <button @click="flipped = !flipped">Edit</button>
</template>

<style scoped>
    .block {
        width: 100%;
        font-size: 2rem;
        background-color: var(--color-02);
        padding: 8rem 20rem;
        margin: 0 auto;
        border-radius: 30px;
    }
</style>
