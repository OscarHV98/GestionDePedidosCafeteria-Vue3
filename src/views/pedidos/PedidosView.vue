<template>
  <div>
    <h1>Pedidos</h1>

    <!-- Campo de búsqueda -->
    <input v-model="searchQuery" type="text" placeholder="Buscar Pedido..." class="search-input" />

    <!-- Botón para abrir el modal -->
    <button @click="openModal" class="add-pedido-btn">Agregar Pedido</button>

    <!-- Modal para agregar/editar pedido -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ editing ? 'Editar Pedido' : 'Agregar Pedido' }}</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Selección de cliente -->
          <select v-model="newPedido.id_cliente" required>
            <option disabled value="">Selecciona un cliente</option>
            <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
              {{ cliente.nombre }}
            </option>
          </select>

          <!-- Selección de producto -->
          <select v-model="newPedido.id_producto" required>
            <option disabled value="">Selecciona un producto</option>
            <option v-for="producto in productos" :key="producto.id" :value="producto.id">
              {{ producto.nombre }} - ${{ producto.precio }}
            </option>
          </select>

          <!-- Fecha del pedido -->
          <input v-model="newPedido.fecha" type="date" placeholder="Fecha del pedido" required />

          <button type="submit" class="submit-btn">{{ editing ? "Editar" : "Agregar" }} Pedido</button>
          <button type="button" @click="closeModal" class="close-btn">Cerrar</button>
        </form>
      </div>
    </div>

    <!-- Tabla de pedidos -->
    <table class="pedido-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Producto</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in filteredPedidos" :key="pedido.id">
          <td>{{ pedido.id }}</td>
          <td>{{ getClienteNombre(pedido.id_cliente) }}</td>
          <td>{{ getProductoNombre(pedido.id_producto) }}</td>
          <td>{{ pedido.fecha }}</td>
          <td>
            <button @click="editPedido(pedido)" class="edit-btn">Editar</button>
            <button @click="deletePedido(pedido.id)" class="delete-btn">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import { useStore } from "@/stores/main";
import { computed, reactive, ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const pedidos = computed(() => store.pedidos);
    const clientes = computed(() => store.clientes);
    const productos = computed(() => store.productos); 
    const newPedido = reactive({ id: null, id_cliente: "", id_producto: "", fecha: "" });
    const showModal = ref(false); // Estado para mostrar el modal
    const editing = computed(() => newPedido.id !== null);
    const searchQuery = ref(""); // Estado para la búsqueda

    // Filtrar pedidos en función de la búsqueda
    const filteredPedidos = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return pedidos.value.filter(pedido =>
        getClienteNombre(pedido.id_cliente).toLowerCase().includes(query) ||
        getProductoNombre(pedido.id_producto).toLowerCase().includes(query)
      );
    });

    const handleSubmit = () => {
      if (editing.value) {
        store.editPedido({ ...newPedido });
      } else {
        store.addPedido({ ...newPedido });
      }
      resetForm();
      closeModal();
    };

    const editPedido = (pedido) => {
      Object.assign(newPedido, pedido);
      openModal();
    };

    const deletePedido = (id) => {
      store.deletePedido(id);
    };

    const resetForm = () => {
      Object.assign(newPedido, { id: null, id_cliente: "", id_producto: "", fecha: "" });
    };

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      resetForm();
    };

    const getClienteNombre = (id_cliente) => {
      const cliente = clientes.value.find((c) => c.id === id_cliente);
      return cliente ? cliente.nombre : "Desconocido";
    };

    const getProductoNombre = (id_producto) => {
      const producto = productos.value.find((p) => p.id === id_producto);
      return producto ? producto.nombre : "Desconocido";
    };

    return {
      pedidos,
      clientes,
      productos,
      newPedido,
      editing,
      showModal,
      searchQuery,
      filteredPedidos,
      handleSubmit,
      editPedido,
      deletePedido,
      openModal,
      closeModal,
      getClienteNombre,
      getProductoNombre,
    };
  },
};
</script>

<style scoped>
/* Estilo para la tabla */
.pedido-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.pedido-table th,
.pedido-table td {
  border: 1px solid #ddd;
  padding: 10px;
}

.pedido-table th {
  background-color: #f4f4f4;
}

/* Estilo para los botones */
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

/* Estilo del modal */
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

.modal input,
.modal select {
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

/* Estilo para el campo de búsqueda */
.search-input {
  margin-bottom: 20px;
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.add-pedido-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

.add-pedido-btn:hover {
  background-color: #45a049;
}
</style>
