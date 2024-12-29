<template>
  <div>
    <h1 class="page-title">Productos</h1>

    <!-- Campo de búsqueda -->
    <input v-model="searchQuery" type="text" placeholder="Buscar Producto..." class="search-input" />

    <!-- Botón para abrir el modal -->
    <button @click="openModal" class="add-product-btn">Agregar Producto</button>

    <!-- Modal para agregar/editar producto -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ editing ? 'Editar Producto' : 'Agregar Producto' }}</h2>
        <form @submit.prevent="handleSubmit">
          <input v-model="newProducto.nombre" placeholder="Nombre del Producto" required />
          <input
            v-model.number="newProducto.precio"
            placeholder="Precio del Producto"
            type="number"
            min="0"
            required
          />
          <button type="submit" class="submit-btn">{{ editing ? 'Editar' : 'Agregar' }}</button>
          <button type="button" @click="closeModal" class="close-btn">Cerrar</button>
        </form>
      </div>
    </div>

    <!-- Tabla de productos -->
    <table class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in filteredProductos" :key="producto.id">
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.precio }}</td>
          <td>
            <button @click="editProducto(producto)" class="edit-btn">Editar</button>
            <button @click="deleteProducto(producto.id)" class="delete-btn">Eliminar</button>
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
    const productos = computed(() => store.productos);
    const newProducto = ref({ id: null, nombre: "", precio: 0 });
    const showModal = ref(false); // Usar ref para el estado del modal
    const editing = computed(() => newProducto.value.id !== null);
    const searchQuery = ref(""); // Estado para la búsqueda

    // Filtrar productos en función de la búsqueda
    const filteredProductos = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return productos.value.filter(producto =>
        producto.nombre.toLowerCase().includes(query) ||
        producto.precio.toString().includes(query)
      );
    });

    const handleSubmit = () => {
      if (editing.value) {
        store.editProducto({ ...newProducto.value });
      } else {
        store.addProducto({ ...newProducto.value });
      }
      resetForm();
      closeModal();
    };

    const editProducto = (producto) => {
      Object.assign(newProducto.value, producto);
      openModal();
    };

    const deleteProducto = (id) => {
      store.deleteProducto(id);
    };

    const resetForm = () => {
      newProducto.value = { id: null, nombre: "", precio: 0 };
    };

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      resetForm(); // Reset the form when closing the modal
    };

    return {
      productos,
      newProducto,
      editing,
      showModal,
      searchQuery,
      filteredProductos,
      handleSubmit,
      editProducto,
      deleteProducto,
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

.add-product-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

.add-product-btn:hover {
  background-color: #45a049;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.product-table th {
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
  background-color: #4caf50;
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
