<template></template>

<script>
export default {
  name: "MainMenu",
  methods: {
    async getMenu(module) {
      try {
        const { data } = await this.$http.get(`/v1/menu`);
        this.ActionSetMenus(data);
        this.$router.push({ name: "Home" });
        console.log(data);
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
};
</script>

<style>
</style>