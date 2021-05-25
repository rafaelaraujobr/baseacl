<template>
  <q-btn flat v-if="user" round unelevated dense  no-caps>
    <q-avatar>
      <q-icon name="mdi-account" v-if="!user.photo" />
      <img src="https://cdn.quasar.dev/img/avatar.png" v-if="user.photo" />
      <q-badge floating color="red" rounded></q-badge>
    </q-avatar>
    <q-menu :square="false" content-class="">
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
      <q-item clickable v-close-popup>
        <q-item-section avatar>
          <q-icon name="mdi-tune" />
        </q-item-section>
        <q-item-section>Configurações</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup @click="dialog = !dialog">
        <q-item-section avatar>
          <q-icon name="mdi-form-textbox-password" />
        </q-item-section>
        <q-item-section>Alterar Senha</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup @click="logOut()">
        <q-item-section avatar>
          <q-icon color="negative" name="mdi-power" />
        </q-item-section>
        <q-item-section>Sair</q-item-section>
      </q-item>
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
    };
  },
};
</script>

<style>
</style>