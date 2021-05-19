<template>
  <q-card
    :bordered="!isMobile"
    flat
    :class="isMobile ? 'q-pa-sm transparent' : 'q-pa-md'"
    :style="isMobile ? `width: ${$q.screen.width}px` : 'width: 400px'"
  >
    <q-card-section
      class="text-center text-h6"
      :class="isMobile ? 'q-py-sm text-white' : ''"
      >Informe seu e-mail</q-card-section
    >
    <q-card-section class="q-gutter-md">
      <q-input
        clearable
        clear-icon="close"
        :dark="isMobile"
        :filled="isMobile"
        :outlined="!isMobile"
        v-model="form.email"
        type="email"
        label="Email"
        class="modern"
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
        :color="isMobile ? 'white' : 'dark'"
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
   
<style scoped>
.q-card {
  width: 360px;
}
</style>