// src/stores/main.js
import { defineStore } from "pinia";
import { clientes, productos, pedidos, detallePedidos } from "@/data/db"; // Importa los datos

export const useStore = defineStore("main", {
  state: () => ({
    clientes: clientes,        // Asigna los datos importados
    productos: productos,
    pedidos: pedidos,
    detallePedidos: detallePedidos,
  }),
  actions: {
    // Servicios para clientes
    addCliente(cliente) {
      cliente.id = this.clientes.length + 1;
      this.clientes.push(cliente);
    },
    editCliente(updatedCliente) {
      const index = this.clientes.findIndex((c) => c.id === updatedCliente.id);
      if (index !== -1) {
        this.clientes.splice(index, 1, updatedCliente);
      }
    },
    deleteCliente(id) {
      this.clientes = this.clientes.filter((c) => c.id !== id);
    },

    // Servicios para productos
    addProducto(producto) {
      producto.id = this.productos.length + 1;
      this.productos.push(producto);
    },
    editProducto(updatedProducto) {
      const index = this.productos.findIndex((p) => p.id === updatedProducto.id);
      if (index !== -1) {
        this.productos.splice(index, 1, updatedProducto);
      }
    },
    deleteProducto(id) {
      this.productos = this.productos.filter((p) => p.id !== id);
    },

    // Servicios para pedidos
    addPedido(pedido) {
      pedido.id = this.pedidos.length + 1;
      this.pedidos.push(pedido);
    },
    editPedido(updatedPedido) {
      const index = this.pedidos.findIndex((p) => p.id === updatedPedido.id);
      if (index !== -1) {
        this.pedidos.splice(index, 1, updatedPedido);
      }
    },
    deletePedido(id) {
      this.pedidos = this.pedidos.filter((p) => p.id !== id);
    },
  },
});
