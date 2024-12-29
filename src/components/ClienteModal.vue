<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span @click="close" class="close">&times;</span>
      <h2>{{ editing ? 'Editar' : 'Agregar' }} Cliente</h2>
      <form @submit.prevent="handleSubmit">
        <input 
          v-model="cliente.nombre" 
          placeholder="Nombre" 
          required 
        />
        <input 
          v-model="cliente.correo" 
          placeholder="Correo" 
          required 
        />
        <button type="submit">{{ editing ? 'Editar' : 'Agregar' }} Cliente</button>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  props: {
    clienteData: {
      type: Object,
      default: () => ({
        id: null,
        nombre: "",
        correo: ""
      }),
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
    editing: {
      type: Boolean,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const cliente = reactive({ ...props.clienteData });

    const handleSubmit = () => {
      props.onSubmit(cliente);
    };

    const close = () => {
      props.onClose();
    };

    return { ...toRefs(cliente), handleSubmit, close };
  },
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>
