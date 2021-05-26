<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      bordered
      :class="$q.dark.isActive ? 'bg-dark text-white' : 'bg-white text-dark'"
    >
      <q-toolbar class="q-pl-md">
        <tasty-burger-button
          type="arrowalt"
          :active="!$q.platform.is.mobile"
          size="xs"
          :color="$q.dark.isActive ? 'white' : 'dark'"
          :active-color="$q.dark.isActive ? 'white' : 'dark'"
          @toggle="leftDrawer = !leftDrawer"
        />
        <q-separator spaced="1rem" vertical />
        <q-toolbar-title :class="$q.platform.is.mobile ? 'text-center ' : ''">
          logotipo
          <!-- <img
            :src="require('@/assets/logo-light.svg')"
            height="40"
            class="q-pt-sm"
          /> -->
        </q-toolbar-title>
        <menu-user-profile />
        <q-separator spaced vertical />
        <q-btn
          round
          dense
          flat
          unelevated
          icon="mdi-tune"
          @click="rightDrawer = !rightDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawer"
      show-if-above
      bordered
      :mini-to-overlay="menuMode == 'mouseOver'"
      :width="$q.platform.is.mobile ? 280 : 256"
      :breakpoint="700"
      :mini="miniState"
      @mouseover="menuMode == 'mouseOver' ? (miniState = false) : ''"
      @mouseout="menuMode == 'mouseOver' ? (miniState = true) : ''"
      content-class="bg-dark text-white"
    >
      <main-menu />
    </q-drawer>

    <q-drawer
      side="right"
      v-model="rightDrawer"
      bordered
      :width="$q.platform.is.mobile ? 280 : 600"
      content-class="bg-grey-3"
    >
      <q-list>
        <q-item-label header>Notificações</q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container :class="$q.dark.isActive ? 'white' : 'bg-grey-1'">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuUserProfile from "./widgets/MenuUserProfile.vue";
import { TastyBurgerButton } from "vue-tasty-burgers";
import MainMenu from "./widgets/MainMenu.vue";
export default {
  name: "LayoutMain",
  components: { MenuUserProfile, TastyBurgerButton, MainMenu },
  data() {
    return {
      leftDrawer: false,
      rightDrawer: false,
      miniState: true,
      menuMode: "mouseOver",
    };
  },
  methods: {
    setModeMenu() {
      if (this.$q.screen.name == "xl") {
        this.menuMode = "mouseClick";
        this.miniState = false;
      } else {
        this.menuMode = "mouseOver";
        this.miniState = true;
      }
    },
  },
  watch: {
    "$q.screen.name"() {
      this.setModeMenu();
    },
  },
  created() {
    this.setModeMenu();
  },
};
</script>

<style>
</style>
