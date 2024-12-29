import { createRouter, createWebHistory } from "vue-router";
import ClientesView from "../views/clientes/ClientesView.vue";
import ProductosView from "../views/productos/ProductosView.vue";
import PedidosView from "../views/pedidos/PedidosView.vue";

const routes = [
  { path: "/", redirect: "/clientes" },
  { path: "/clientes", name: "clientes", component: ClientesView },
  { path: "/productos", name: "productos", component: ProductosView },
  { path: "/pedidos", name: "pedidos", component: PedidosView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
