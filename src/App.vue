<template>
  <div id="app">
    <!--     <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/timeline">Timeline</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  font-family: Roboto !important;
  margin: 0px;
}

#nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
