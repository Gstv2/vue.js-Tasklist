<template>
  <div id="app">
    <TaskList />
  </div>
</template>

<script>
import TaskList from "./components/TaskList.vue";

export default {
  name: "App",
  components: {
    TaskList,
  },
};
</script>

<style>
/* Adicione estilos globais aqui se necessário */
</style>
