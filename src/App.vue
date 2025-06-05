<script setup lang="ts">
import { onMounted } from 'vue';
import { App } from './core';

onMounted(() => {
  App.start();
});
</script>
