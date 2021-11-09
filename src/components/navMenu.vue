<template>
  <b-navbar type="is-light">
    <template #brand>
    </template>
    <template #start>
      <b-navbar-item :to="{ name: 'MainPage' }" tag="router-link">
        Home
      </b-navbar-item>
      <b-navbar-dropdown label="Programs">
        <b-navbar-item>
          Main Page
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Creator">
        <b-navbar-item>
          Main Page
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "navMenu",
}
</script>

<style scoped>
</style>