<template>
  <layout-main />
</template>

<script>
import GlobalService from "@/mixins/GlobalService";
import LayoutMain from "@/components/LayoutMain.vue";
export default {
  name: "App",
  mixins: [GlobalService],
  components: { LayoutMain },
  whatch: {
    language() {
      this.$i18n.locale = this.language;
    },
  },
};
</script>

<style>
</style>