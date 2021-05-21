<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawer = !leftDrawer"
          aria-label="Menu"
          icon="menu"
        />
        <q-toolbar-title
          :class="
            $q.platform.is.mobile
              ? 'text-center text-weight-medium'
              : 'text-weight-medium'
          "
          >{{ $t("logo") }}</q-toolbar-title
        >

        <div>v1.0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawer"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LayoutMain",
  components: {},
  data() {
    return {
      leftDrawer: false,
    };
  },
};
</script>

<style>
</style>
