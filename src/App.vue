<template>
  <div>
    <header>
      <div class="container">
        <h1>Gestión de Pedidos en una Cafetería</h1>
        <nav>
          <router-link to="/clientes">Clientes</router-link>
          <router-link to="/productos">Productos</router-link>
          <router-link to="/pedidos">Pedidos</router-link>
        </nav>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
/* Estilos para el header */
header {
  background-color: #2c3e50;
  color: white;
  padding: 15px 0;
  margin-bottom: 20px;
}
header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
header h1 {
  margin: 0;
  font-size: 24px;
}
nav {
  display: flex;
  gap: 15px;
}
nav a {
  text-decoration: none;
  color: white;
  padding: 8px 15px;
  background-color: #3498db;
  border-radius: 5px;
  transition: background-color 0.3s;
}
nav a:hover {
  background-color: #2980b9;
}
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
