<template>
    <div class="bg-white w-100 h-100 overflow-auto">
    </div>
</template>

<script setup lang="ts">
import { State } from './state';

type P = {
    state: State;
};
defineProps<P>();
</script>
