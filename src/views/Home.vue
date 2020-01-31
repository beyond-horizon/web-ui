<template>
  <div>
    <h1>Horizon</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/timeline">Timeline</router-link> |
      <router-link to="/flowchart">Flowchart</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "home"
};
</script>
<style lang="scss" scoped>
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
