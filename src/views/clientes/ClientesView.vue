<template>
    <div>
      <h1 class="page-title">Clientes</h1>
  
      <!-- Campo de búsqueda -->
      <input v-model="searchQuery" type="text" placeholder="Buscar Cliente..." class="search-input" />
  
      <!-- Botón para abrir el modal -->
      <button @click="openModal" class="add-client-btn">Agregar Cliente</button>
  
      <!-- Modal para agregar/editar cliente -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <h2>{{ editing ? 'Editar Cliente' : 'Agregar Cliente' }}</h2>
          <form @submit.prevent="handleSubmit">
            <input v-model="newCliente.nombre" placeholder="Nombre" required />
            <input v-model="newCliente.correo" placeholder="Correo" required />
            <button type="submit" class="submit-btn">{{ editing ? 'Editar' : 'Agregar' }}</button>
            <button type="button" @click="closeModal" class="close-btn">Cerrar</button>
          </form>
        </div>
      </div>
  
      <!-- Tabla de clientes -->
      <table class="client-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in filteredClientes" :key="cliente.id">
            <td>{{ cliente.id }}</td>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.correo }}</td>
            <td>
              <button @click="editCliente(cliente)" class="edit-btn">Editar</button>
              <button @click="deleteCliente(cliente.id)" class="delete-btn">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { useStore } from "@/stores/main";
  import { computed, ref } from "vue";
  
  export default {
    setup() {
      const store = useStore();
      const clientes = computed(() => store.clientes);
      const newCliente = ref({ id: null, nombre: "", correo: "" });
      const showModal = ref(false); // Usar ref para el estado del modal
      const editing = computed(() => newCliente.value.id !== null);
      const searchQuery = ref(""); // Estado para la búsqueda
  
      // Filtrar clientes en función de la búsqueda
      const filteredClientes = computed(() => {
        const query = searchQuery.value.toLowerCase();
        return clientes.value.filter(cliente => 
          cliente.nombre.toLowerCase().includes(query) || 
          cliente.correo.toLowerCase().includes(query)
        );
      });
  
      const handleSubmit = () => {
        if (editing.value) {
          store.editCliente({ ...newCliente.value });
        } else {
          store.addCliente({ ...newCliente.value });
        }
        resetForm();
        closeModal();
      };
  
      const editCliente = (cliente) => {
        Object.assign(newCliente.value, cliente);
        openModal();
      };
  
      const deleteCliente = (id) => {
        store.deleteCliente(id);
      };
  
      const resetForm = () => {
        newCliente.value = { id: null, nombre: "", correo: "" };
      };
  
      const openModal = () => {
        showModal.value = true;
      };
  
      const closeModal = () => {
        showModal.value = false;
        resetForm(); // Reset the form when closing the modal
      };
  
      return {
        clientes,
        newCliente,
        editing,
        showModal,
        searchQuery,
        filteredClientes,
        handleSubmit,
        editCliente,
        deleteCliente,
        openModal,
        closeModal,
      };
    },
  };
  </script>
  
  <style scoped>
  .page-title {
    color: #2c3e50;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .search-input {
    margin-bottom: 20px;
    padding: 8px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .add-client-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .add-client-btn:hover {
    background-color: #45a049;
  }
  
  .client-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .client-table th,
  .client-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  
  .client-table th {
    background-color: #f4f4f4;
  }
  
  .edit-btn, .delete-btn {
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
  
  .edit-btn {
    background-color: #f0ad4e;
    color: white;
  }
  
  .edit-btn:hover {
    background-color: #ec971f;
  }
  
  .delete-btn {
    background-color: #d9534f;
    color: white;
  }
  
  .delete-btn:hover {
    background-color: #c9302c;
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 400px;
  }
  
  .modal h2 {
    margin-bottom: 20px;
  }
  
  .modal input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .submit-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
  }
  
  .submit-btn:hover {
    background-color: #45a049;
  }
  
  .close-btn {
    background-color: #ccc;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
  }
  
  .close-btn:hover {
    background-color: #aaa;
  }
  </style>
  