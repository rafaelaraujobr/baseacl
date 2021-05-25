<template>
  <q-card
    :bordered="!$q.platform.is.mobile"
    flat
    :class="$q.platform.is.mobile ? 'q-pa-sm transparent' : 'q-pa-md'"
    :style="$q.platform.is.mobile ? `width: ${$q.screen.width}px` : 'width: 400px'"
  >
    <q-card-section class="text-center q-py-sm">
      <img :src="require('@/assets/logo.svg')"  height="40" class="q-pt-sm" />
    </q-card-section>
    <q-card-section
      class="text-center text-h6"
      :class="$q.platform.is.mobile ? 'q-py-sm' : ''"
      >Recuperar senha</q-card-section
    >
    <q-card-section class="q-gutter-md">
      <q-input
        clearable
        clear-icon="close"
        outlined
        v-model="form.email"
        type="email"
        label="Informe seu e-mail"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-email-outline" color="" />
        </template>
      </q-input>
    </q-card-section>
    <q-card-section class="q-px-md row justify-between">
      <q-btn
        unelevated
        outline
        color="primary"
        no-caps
        class="q-pa-sm q-px-md"
        label="Cancelar"
        @click="$emit('change', 'login')"
      />
      <q-btn
        unelevated
        color="primary"
        no-caps
        class="q-pa-sm q-px-md"
         :label="$t('send')"
        @click="$emit('change', 'login')"
      />
    </q-card-section>
    <q-card-section class="text-center q-pa-none"> </q-card-section>
  </q-card>
</template>

<script>
import GlobalService from "@/mixins/GlobalService";
export default {
  name: "ForgotPassword",
  mixins: [GlobalService],
  components: {},
  data() {
    return {
      form: {
        email: null,
      },
    };
  },
};
</script>
   