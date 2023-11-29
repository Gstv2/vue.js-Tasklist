<!-- TaskList.vue -->
<template>
  <div>
    <h2>Tarefas</h2>

    <!-- Renderização de Tarefas -->
    <div v-for="(task, index) in tasks" :key="index" class="task-item">
      <input
        type="checkbox"
        v-model="task.completed"
        @change="updateTask(task)"
        class="task-input"
      />
      <span :class="{ completed: task.completed }">{{ task.text }}</span>
      <button @click="editTask(index)" class="edit-task-button">Editar</button>
      <button @click="deleteTask(task.id)" class="delete-task-button">
        Excluir
      </button>
    </div>

    <!-- Adição de Tarefas -->
    <div class="add-task-container">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Adicionar nova tarefa"
        class="add-task-input"
      />
      <button @click="addTask" class="add-task-button">Adicionar Tarefa</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

export default {
  name: 'TaskList',
  setup() {
    const tasks = ref([]);
    const newTask = ref('');

    const db = inject('db'); // Recebe a instância do Firestore

    // Recuperar tarefas do Firestore ao montar o componente
    onMounted(async () => {
      const tasksCollection = collection(db, 'task');
      const querySnapshot = await getDocs(tasksCollection);

      tasks.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

    // Adicionar nova tarefa ao Firestore
    const addTask = async () => {
      const tasksCollection = collection(db, 'task');
      const newTaskData = { text: newTask.value, completed: false };

      await addDoc(tasksCollection, newTaskData);
      newTask.value = ''; // Limpar o campo de nova tarefa após adicionar
    };

    // Atualizar tarefa no Firestore quando o checkbox é clicado
    const updateTask = async (task) => {
      const taskRef = doc(db, 'task', task.id);
      await updateDoc(taskRef, { completed: task.completed });
    };

    // Deletar tarefa no Firestore
    const deleteTask = async (taskId) => {
      const taskRef = doc(db, 'task', taskId);
      await deleteDoc(taskRef);
    };

    // Editar tarefa
    const editTask = (index) => {
      const editedText = prompt('Editar tarefa:', tasks.value[index].text);
      if (editedText !== null) {
        const taskRef = doc(db, 'task', tasks.value[index].id);
        updateDoc(taskRef, { text: editedText });
      }
    };

    return { tasks, newTask, addTask, updateTask, deleteTask, editTask };
  },
};
</script>

<style scoped>
/* Estilos para o componente TaskList */

.task-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
}

.task-input {
  margin-right: 10px;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.add-task-container {
  margin-top: 20px;
  display: flex;
}

.add-task-input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease-in-out;
}

.add-task-button {
  padding: 10px 15px;
  cursor: pointer;
  background-color: #4caf50;
  border: 1px solid #2f922f;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.add-task-button:hover {
  background-color: #45a049;
}

.edit-task-button,
.delete-task-button {
  padding: 10px;
  cursor: pointer;
  margin-left: 5px;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.edit-task-button:hover,
.delete-task-button:hover {
  background-color: #2196f3;
  color: #fff;
}
</style>
