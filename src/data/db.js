// src/data/db.js
export const clientes = [
    { id: 1, nombre: "Carlos Pérez", correo: "carlos.perez@example.com", telefono: "76543210" },
    { id: 2, nombre: "Lucía Flores", correo: "lucia.flores@example.com", telefono: "71234567" },
    { id: 3, nombre: "Paola Pérez", correo: "paola@example.com", telefono: "78787878" },
    { id: 4, nombre: "Fernando López", correo: "fernando@example.com", telefono: "65874532" }
  ];
  
  export const productos = [
    { id: 1, nombre: "Café Espresso", precio: 15, categoria: "Bebida", stock: 50 },
    { id: 2, nombre: "Torta de Chocolate", precio: 30, categoria: "Postre", stock: 20 },
    { id: 3, nombre: "Café Americano", precio: 10, categoria: "Bebida", stock: 10 },
    { id: 4, nombre: "Capuchino", precio: 15, categoria: "Bebida", stock: 10 }
  ];
  
  export const pedidos = [
    { id: 1, fecha: "2024-12-29", total: 45, estado: "Pendiente", id_cliente: 1 },
    { id: 2, fecha: "2024-12-29", total: 30, estado: "Entregado", id_cliente: 2 }
  ];
  
  export const detallePedidos = [
    { id: 1, id_pedido: 1, id_producto: 1, cantidad: 1, subtotal: 15 },
    { id: 2, id_pedido: 1, id_producto: 2, cantidad: 1, subtotal: 30 },
    { id: 3, id_pedido: 2, id_producto: 2, cantidad: 1, subtotal: 30 }
  ];
  