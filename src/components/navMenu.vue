<template>
  <b-navbar type="is-light">
    <template #brand>
    </template>
    <template #start>
      <b-navbar-item :to="{ name: 'MainPage' }" tag="router-link">
        Home
      </b-navbar-item>
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