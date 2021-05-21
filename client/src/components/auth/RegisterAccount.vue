<template>
  <q-card
    class="register-account"
    :bordered="!isMobile"
    flat
    :class="isMobile ? 'q-pa-sm  transparent' : 'q-pa-md'"
    :style="isMobile ? `width: ${$q.screen.width}px` : 'width: 520px'"
  >
    <q-card-section
      class="text-center text-h6"
      :class="isMobile ? 'q-py-sm text-white' : ''"
      >{{ $t("create-account") }}</q-card-section
    >
    <q-card-section class="q-col-gutter-sm">
      <div class="row q-col-gutter-sm">
        <div class="col">
          <q-input
            clearable
            clear-icon="close"
            ref="name"
            :dark="isMobile"
            :filled="isMobile"
            :outlined="!isMobile"
            v-model="form.name"
            :label="$t('name')"
            :rules="[(val) => !!val || 'Informe seu nome']"
          />
        </div>
        <div class="col">
          <q-input
            clearable
            clear-icon="close"
            ref="last_name"
            :dark="isMobile"
            :filled="isMobile"
            :outlined="!isMobile"
            v-model="form.name"
            :label="$t('last_name')"
            :rules="[(val) => !!val || 'Informe seu nome']"
          />
        </div>
      </div>
      <q-input
        clearable
        clear-icon="close"
        ref="name"
        :dark="isMobile"
        :filled="isMobile"
        :outlined="!isMobile"
        v-model="form.name"
        :label="$t('company-name')"
        :rules="[(val) => !!val || 'Informe seu nome']"
      />
      <q-input
        clearable
        clear-icon="close"
        ref="name"
        :dark="isMobile"
        :filled="isMobile"
        :outlined="!isMobile"
        v-model="form.name"
        :label="$t('phone')"
        :rules="[(val) => !!val || 'Informe seu nome']"
      />
      <q-input
        clearable
        clear-icon="close"
        ref="email"
        :dark="isMobile"
        :filled="isMobile"
        :outlined="!isMobile"
        @blur="checkEmail"
        @focus="checkEmailData = null"
        v-model="form.email"
        :label="$t('email')"
        :rules="[
          (val) => !!val || 'Informe um email valido',
          () => checkEmailData != 'error' || 'Este email já está em uso',
        ]"
      >
        <template v-slot:append>
          <q-icon
            clearable
            clear-icon="close"
            v-if="checkEmailData"
            :name="
              checkEmailData == 'ok'
                ? 'mdi-checkbox-marked-circle-outline'
                : checkEmailData == 'error'
                ? 'mdi-close-circle'
                : ''
            "
            :color="
              checkEmailData == 'ok'
                ? 'positive'
                : checkEmailData == 'error'
                ? 'negative'
                : ''
            "
          />
        </template>
      </q-input>
      <q-input
        clearable
        clear-icon="close"
        ref="password"
        :dark="isMobile"
        :filled="isMobile"
        :outlined="!isMobile"
        v-model="form.password"
        class="q-mb-md"
        :label="$t('password')"
        :type="showPassword ? 'text' : 'password'"
        lazy-rules
        :rules="[
          (val) => !!val || 'Informe uma senha',
          (val) => val.length >= 6 || 'Use no minimo 6 characteres',
        ]"
      >
        <template v-slot:append>
          <q-btn
            flat
            no-caps
            :label="showPassword ? $t('hide') : $t('show')"
            @click="showPassword = !showPassword"
          />
        </template>
        <template v-slot:hint>
          <div class="text-right" style="left: 0; position: absolute; top: 3px">
            {{ $t("minimum_6_characters") }}
          </div>
        </template>
      </q-input>
      <q-input
        clearable
        clear-icon="close"
        ref="checkPassword"
        :dark="isMobile"
        :filled="isMobile"
        :outlined="!isMobile"
        v-model="form.checkPassword"
        :label="$t('confirm-password')"
        :type="showCheckPassword ? 'text' : 'password'"
        :rules="[
          (val) => !!val || 'Informe a confirmação de senha',
          (val) =>
            val == this.$refs.password.value || 'As senhas não são iguais',
        ]"
      >
        <template v-slot:append>
          <q-btn
            flat
            no-caps
            :label="showCheckPassword ? $t('hide') : $t('show')"
            @click="showCheckPassword = !showCheckPassword"
          />
        </template>
      </q-input>
      <div class="row justify-between q-my-none">
        <q-toggle
          v-model="form.accept"
          :class="isMobile ? 'text-white' : ''"
          :label="$t('accept-terms')"
        />
        <q-btn
          unelevated
          flat
          no-caps
          color="primary"
          :label="$t('terms')"
          @click="termsDialog = true"
        />
      </div>
    </q-card-section>
    <q-card-section class="q-px-md row justify-between q-pt-none">
      <q-btn
        unelevated
        outline
        :color="isMobile ? 'white' : 'primary'"
        no-caps
        class="q-py-sm q-px-md"
        :label="$t('cancel')"
        @click="$emit('change', 'login')"
      />
      <q-btn
        unelevated
        color="primary"
        no-caps
        class="q-py-sm q-px-md"
        :label="$t('register')"
        @click="registerAccount()"
      />
    </q-card-section>
    <q-dialog v-model="termsDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Termos de uso</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
            perferendis totam, ea at omnis vel numquam exercitationem aut, natus
            minima, porro labore.
          </p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            flat
            label="Recusar"
            no-caps
            color="primary"
            @click="(form.accept = false), (termsDialog = false)"
          />
          <q-btn
            flat
            no-caps
            label="Aceitar"
            color="primary"
            @click="(form.accept = true), (termsDialog = false)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import GlobalService from "@/mixins/GlobalService";
export default {
  name: "Register",
  mixins: [GlobalService],
  components: {},
  data() {
    return {
      form: {
        name: null,
        realm: null,
        email: null,
        phone: null,
        password: null,
        checkPassword: null,
        accept: false,
      },
      termsDialog: false,
      checkRealmData: null,
      checkEmailData: null,
      maskPhone: "(##) #####-####",
      showPassword: false,
      showCheckPassword: false,
      loadingRealm: false,
    };
  },
  methods: {
    async registerAccount() {
      if (this.verifyForm())
        try {
          let { data } = await this.$http.post(
            "/accounts/createaccount",
            this.form
          );
          console.log(data);
          this.$emit("change", "login");
        } catch (error) {
          console.log(error);
        } finally {
          console.log("finalizado");
        }
    },
    verifyForm() {
      this.$refs.realm.validate();
      this.$refs.name.validate();
      this.$refs.email.validate();
      this.$refs.password.validate();
      this.$refs.checkPassword.validate();
      if (this.form.name == null) return false;
      else if (this.form.checkRealmData != "error") return false;
      else if (this.form.checkEmailData != "error") return false;
      else if (this.form.realm == null) return false;
      else if (this.form.email == null) return false;
      else if (this.form.password == null) return false;
      else if (this.form.password != this.form.checkPassword) return false;
      else return true;
    },
    async checkRealm() {
      if (this.form.realm && this.form.realm.length >= 4)
        try {
          let { data } = await this.$http.get(
            "accounts/check-realm/" + this.form.realm
          );
          if (!data.length) this.checkRealmData = "ok";
          else this.checkRealmData = "error";
          this.$refs.realm.validate();
        } catch (error) {
          console.log(error);
        }
    },
    async checkEmail() {
      if (this.form.email)
        try {
          let { data } = await this.$http.get(
            "accounts/check-email/" + this.form.email
          );
          console.log(data);
          if (!data.length) this.checkEmailData = "ok";
          else this.checkEmailData = "error";
          this.$refs.email.validate();
        } catch (error) {
          console.log(error);
        }
    },
  },
};
</script>
   
<style >
</style>