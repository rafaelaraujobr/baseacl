<template>
  <q-page class="fit row justify-center items-center bg-white fullscreen">
    <!-- <particles-bg type="cobweb" :bg="true"  num="20"   alpha=" [0.1, 0]"/> -->
    <div class="column">
      <div class="row">
        <q-intersection transition="flip-left" v-show="loginView">
          <login v-if="loginView" @change="changeCard" />
        </q-intersection>
        <q-intersection transition="flip-right" v-show="registerView">
          <register-account v-if="registerView" @change="changeCard" />
        </q-intersection>
        <q-intersection transition="flip-right" v-show="forgotPasswordView">
          <forgot-password v-if="forgotPasswordView" @change="changeCard" />
        </q-intersection>
      </div>
      <div class="text-center text-caption q-pt-sm">© 2021 roostec</div>
    </div>
    <q-select
      borderless
      style="width: 156px"
      class="fixed-right"
      v-model="languageSelect"
      :options="languages"
      :label="$t('language')"
    >
      <template v-slot:selected>
        <q-chip
          v-if="languageSelect"
          dense
          square
          color="white"
          class="q-my-none q-ml-xs q-mr-none"
        >
          <q-avatar rounded>
            <img :src="require('@/assets/' + languageSelect.flag)" />
          </q-avatar>
          {{ languageSelect.label }}
        </q-chip>
        <q-badge v-else>*none*</q-badge>
      </template>
      <template v-slot:option="{ itemProps, itemEvents, opt }">
        <q-item v-bind="itemProps" v-on="itemEvents">
          <q-item-section avatar>
            <q-avatar rounded>
              <img :src="require('@/assets/' + opt.flag)" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label v-html="opt.label"></q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </q-page>
</template>

<script>
import Login from "@/components/auth/Login.vue";
import RegisterAccount from "@/components/auth/RegisterAccount.vue";
import ForgotPassword from "@/components/auth/ForgotPassword.vue";
import GlobalService from "@/mixins/GlobalService";
export default {
  name: "Auth",
  mixins: [GlobalService],
  components: {
    RegisterAccount,
    Login,
    ForgotPassword,
  },
  data() {
    return {
      loginView: true,
      languages: [
        {
          label: "Portugues(BR)",
          value: "pt-br",
          flag: "pt-br.png",
        },
        {
          label: "Inglês",
          value: "en",
          flag: "en.png",
        },
      ],
      registerView: false,
      forgotPasswordView: false,
      languageSelect: this.language,
    };
  },
  watch: {
    languageSelect() {
      console.log(this.languageSelect);
      // this.ActionSetLanguage(this.languageSelect);
      this.$i18n.locale = this.languageSelect.value;
    },
  },
  methods: {
    changeCard(event) {
      switch (event) {
        case "register":
          this.loginView = false;
          this.registerView = true;
          this.forgotPasswordView = false;
          break;
        case "forgot_password":
          this.loginView = false;
          this.registerView = false;
          this.forgotPasswordView = true;
          break;
        default:
          this.loginView = true;
          this.registerView = false;
          this.forgotPasswordView = false;
          break;
      }
    },
  },
  created() {
    this.languageSelect = {
      label: "Portugues(BR)",
      value: "pt-br",
      flag: "pt-br.png",
    };
  },
};
</script>
   
<style>
</style>