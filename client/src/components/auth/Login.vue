<template>
  <q-card
    class="login"
    :bordered="!isMobile"
    flat
    :class="isMobile ? 'q-pa-sm  transparent  ' : 'q-pa-md'"
    :style="isMobile ? `width: ${$q.screen.width}px` : 'width: 400px'"
  >
    <q-card-section class="text-center q-py-sm">
      <img :src="require('@/assets/logo.svg')" width="100" class="q-pt-sm" />
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
      <q-input
        clearable
        clear-icon="close"
        :dark="isMobile"
        :filled="isMobile"
        :outlined="!isMobile"
        v-model="form.password"
        ref="password"
        class="modern"
        :label="$t('password')"
        :type="showPassword ? 'text' : 'password'"
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-lock-open-outline" />
        </template>
        <template v-slot:append>
          <q-btn
            flat
            round
            color="primary"
            no-caps
            :icon="showPassword ? 'eva-eye-off-outline' : 'eva-eye-outline'"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
    </q-card-section>
    <q-card-section class="q-px-md q-pt-none">
      <q-btn
        unelevated
        color="primary"
        no-caps
        class="full-width q-mb-md q-py-sm text-body1"
        :label="$t('enter')"
        to="/magazine"
      />
      <div class="row justify-between">
        <q-btn
          no-caps
          unelevated
          flat
          :color="isMobile ? 'white' : ''"
          @click="$emit('change', 'forgot_password')"
          :label="$t('forgot-password')"
        />
        <q-btn
          unelevated
          flat
          no-caps
          color="primary"
          :label="$t('create-account')"
          @click="$emit('change', 'register')"
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