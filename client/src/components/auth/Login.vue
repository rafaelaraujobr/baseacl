<template>
  <q-card
    class="login"
    :bordered="!$q.platform.is.mobile"
    flat
    :class="$q.platform.is.mobile ? 'q-pa-sm  transparent  ' : 'q-pa-md'"
    :style="$q.platform.is.mobile ? `width: ${$q.screen.width}px` : 'width: 400px'"
  >
    <q-card-section class="text-center q-py-sm">
      <img :src="require('@/assets/logo.svg')"  height="40" class="q-pt-sm" />
    </q-card-section>
    <q-card-section
      class="text-center text-h6"
      :class="$q.platform.is.mobile ? 'q-py-sm' : ''"
      >Fazer login</q-card-section
    >
    <q-card-section class="q-gutter-sm q-py-sm">
      <q-input
        outlined
        v-model="form.email"
        type="email"
        ref="email"
        :label="$t('email')"
        :rules="[(val) => !!val || 'Field is required']"
        clearable
        class="bg-grey-1"
        clear-icon="close"
        @keyup.enter="logIn(form.email, form.password)"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-email-outline" color="" />
        </template>
      </q-input>
      <q-input
        clearable
        clear-icon="close"
        outlined
        v-model="form.password"
        ref="password"
        :label="$t('password')"
        :type="showPassword ? 'text' : 'password'"
        :error="!isValidEmail"
        @keyup.enter="logIn(form.email, form.password)"
      >
        <template v-slot:error> {{ errorEmail }} </template>
        <template v-slot:prepend>
          <q-icon name="mdi-lock-open-outline" />
        </template>
        <template v-slot:append>
          <q-btn
            flat
            round
            color="primary"
            no-caps
            :icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
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
        @click="logIn(form.email, form.password)"
      />
      <div class="row justify-between">
        <q-btn
          no-caps
          unelevated
          flat
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
import AuthService from "@/mixins/AuthService";
export default {
  name: "Login",
  mixins: [GlobalService, AuthService],
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isValidEmail: true,
      errorEmail: "",
      showPassword: false,
    };
  },
  methods: {},
  created() {},
};
</script>
   
<style scoped>
</style>