<template>
  <div class="window-height">
    <q-list v-if="menu.length > 0">
      <q-item clickable v-ripple v-for="(item, index) in menu" :key="index">
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>
        <q-item-section>{{ $t(item.label) }}</q-item-section>
      </q-item>
    </q-list>
    <q-list class="absolute-bottom">
      <q-item clickable v-ripple @click="logOut()">
        <q-item-section avatar>
          <q-icon name="mdi-power" />
        </q-item-section>
        <q-item-section>{{ $t('exit') }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import GlobalService from "@/mixins/GlobalService";
import AuthService from "@/mixins/AuthService";
export default {
  mixins: [GlobalService, AuthService],
  name: "MainMenu",
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    async getMenu() {
      let body = { slug: "main-menu" };
      try {
        const { data } = await this.$http.get("/v1/menu", body);
        console.log(data);
        if (data) this.menu = data["menu_items"];
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
  created() {
    this.getMenu();
  },
};
</script>

<style>
</style>