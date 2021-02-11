<template>
  <div id="nav">
    <router-link to="/" class="link-item"><span>All Games</span></router-link>
    <router-link to="/new" class="link-item"><span>Add New</span></router-link>
  </div>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/css/global.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
  background-color: rgb(235, 235, 235);
}
#nav {
  background-color: #01375a;
  padding: 20px;
  a {
    font-size: 24px;
    color: rgb(255, 255, 255);
    text-decoration: none;
    margin: 0 10px 0 10px;
    font-weight: bold;

    &.router-link-exact-active {
      color: rgb(0, 200, 0);
    }
  }
}
.container {
  padding: 20px;
}
</style>
