<template>
  <q-btn flat v-if="user" round unelevated dense no-caps>
    <q-avatar>
      <q-icon name="mdi-account" v-if="!user.photo" />
      <img src="https://cdn.quasar.dev/img/avatar.png" v-if="user.photo" />
      <q-badge floating color="red" rounded></q-badge>
    </q-avatar>
    <q-menu :square="false" content-class="">
      <q-list >
        <q-item>
          <q-item-section top avatar>
            <q-icon name="mdi-account" size="xl">
              <q-btn
                size="xs"
                class="absolute bg-grey-3"
                round
                icon="mdi-pencil"
                style="top: 20px; left: 20px"
              />
            </q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium">{{
              user.name
            }}</q-item-label>
            <q-item-label caption lines="1">{{ user.email }}</q-item-label>
          </q-item-section>
          <!-- <q-item-section side top>
          <q-item-label
            caption
            v-for="(role, index) in user.roles"
            :key="index"
            >{{ role.description }}</q-item-label
          >
        </q-item-section> -->
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="mdi-theme-light-dark" />
          </q-item-section>
          <q-item-section>{{ $t("theme") }}</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu anchor="top end" self="top start">
            <q-list style="min-width: 180px">
              <q-item
                clickable
                @click="themeChange('light')"
                :active="theme == 'light'"
                :active-class="
                  $q.dark.isActive
                    ? 'bg-grey-10 text-white'
                    : 'text-white bg-dark'
                "
              >
                <q-item-section avatar>
                  <q-icon name="mdi-weather-sunny" />
                </q-item-section>
                <q-item-section>{{ $t("light") }}</q-item-section>
              </q-item>
              <q-item
                clickable
                @click="themeChange('dark')"
                :active="theme == 'dark'"
                :active-class="
                  $q.dark.isActive
                    ? 'bg-grey-10 text-white'
                    : 'text-white bg-dark'
                "
              >
                <q-item-section avatar>
                  <q-icon name="mdi-weather-night" />
                </q-item-section>
                <q-item-section>{{ $t("dark") }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="mdi-translate" />
          </q-item-section>
          <q-item-section>{{ $t("language") }}</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu anchor="top end" self="top start">
            <q-list style="min-width: 200px">
              <q-item
                clickable
                v-for="(lang, index) in languages"
                :key="index"
                @click="languageChange(lang.value)"
                :active="language == lang.value"
                :active-class="
                  $q.dark.isActive
                    ? 'bg-grey-10 text-white'
                    : 'text-white bg-dark'
                "
              >
                <q-item-section avatar>
                  <img
                    :src="require('@/assets/flag/' + lang.flag)"
                    height="32"
                  />
                </q-item-section>
                <q-item-section>{{ lang.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup @click="dialog = !dialog">
          <q-item-section avatar>
            <q-icon name="mdi-form-textbox-password" />
          </q-item-section>
          <q-item-section>{{ $t("change-password") }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup @click="logOut()">
          <q-item-section avatar>
            <q-icon color="negative" name="mdi-power" />
          </q-item-section>
          <q-item-section>{{ $t("exit") }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center"> </q-card-section>
      </q-card>
    </q-dialog>
  </q-btn>
</template>

<script>
import GlobalService from "@/mixins/GlobalService";
import AuthService from "@/mixins/AuthService";
export default {
  mixins: [GlobalService, AuthService],
  name: "MenuUserProfile",
  data() {
    return {
      dialog: false,
      theme: "light",
      language: "pt-br",
      languages: [
        {
          label: "Português(BR)",
          value: "pt-br",
          flag: "pt-br.svg",
        },
        {
          label: "Inglês",
          value: "en",
          flag: "en.svg",
        },
      ],
    };
  },
  methods: {
    languageChange(value) {
      this.language = value;
      this.$i18n.locale = value;
    },
    themeChange(value) {
      this.theme = value;
      if (value == "dark") this.$q.dark.set(true);
      else if (value == "light") this.$q.dark.set(false);
    },
  },
};
</script>

<style>
</style>