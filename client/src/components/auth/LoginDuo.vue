<template>
  <q-card
    class="login"
    :bordered="!isMobile"
    flat
    :class="isMobile ? 'q-pa-sm  transparent  ' : 'q-pa-md'"
    :style="isMobile ? `width: ${$q.screen.width}px` : 'width: 400px'"
  >
    <q-card-section class="text-center q-py-sm">
      <div>
        <img :src="require('@/assets/logo.svg')" width="100" class="q-pt-sm" />
      </div>
      <div class="text-body1">Fazer login</div>
    </q-card-section>
    <q-card-section class="q-gutter-sm q-py-sm">
      <q-input
        :dark="isMobile"
        :filled="isMobile"
        :outlined="!isMobile"
        v-model="form.email"
        type="email"
        ref="email"
        :label="$t('email')"
        class="modern"
        :rules="[(val) => !!val || 'Field is required']"
        clearable
        clear-icon="close"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-email-outline" color="" />
        </template>
      </q-input>
    </q-card-section>
    <q-card-section class="q-px-md q-pt-none">
      <div class="row justify-between">
        <q-btn
          unelevated
          flat
          no-caps
          color="primary"
          :label="$t('create-account')"
          @click="$emit('change', 'register')"
        />
        <q-btn
          no-caps
          class="q-py-sm q-px-md"
          unelevated
          color="primary"
          :label="$t('next')"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import GlobalService from "@/mixins/GlobalService";
export default {
  name: "Login",
  mixins: [GlobalService],
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showPassword: false,
    };
  },
  methods: {},
  created() {
    console.log(this.$q.screen.width);
  },
};
</script>
   
<style scoped>
</style>