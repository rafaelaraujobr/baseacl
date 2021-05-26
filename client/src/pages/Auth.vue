<template>
  <q-page class="fit row justify-center items-center bg-grey-1 fullscreen">
    <particles-bg
      type="cobweb"
      color="#027BE3"
      :bg="true"
      num="50"
      alpha=" [0.1, 0]"
    />
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
      <div class="row justify-between" :class="isMobile ? 'q-px-lg' : ''">
        <div class="q-mt-sm text-caption">© 2021 roostec</div>
        <div>
          <q-select
            borderless
            v-model="languageSelect"
            :options="languages"
            dense
          >
            <template v-slot:selected>
              <q-chip
                v-if="languageSelect"
                dense
                square
                color="grey-1"
                class="q-my-none q-mr-none text-caption"
              >
                <q-avatar rounded>
                  <img :src="require('@/assets/flag/' + languageSelect.flag)" />
                </q-avatar>
                {{ languageSelect.label }}
              </q-chip>
              <q-badge v-else>*none*</q-badge>
            </template>
            <template v-slot:option="{ itemProps, itemEvents, opt }">
              <q-item
                v-bind="itemProps"
                v-on="itemEvents"
                class="bg-white text-primary"
              >
                <q-item-section avatar>
                  <q-avatar rounded>
                    <img :src="require('@/assets/flag/' + opt.flag)" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label v-html="opt.label"></q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Login from "@/components/auth/Login.vue";
import RegisterAccount from "@/components/auth/RegisterAccount.vue";
import ForgotPassword from "@/components/auth/ForgotPassword.vue";
import GlobalService from "@/mixins/GlobalService";
import { ParticlesBg } from "particles-bg-vue";

export default {
  name: "Auth",
  mixins: [GlobalService],
  components: {
    RegisterAccount,
    Login,
    ForgotPassword,
    ParticlesBg,
  },
  data() {
    return {
      loginView: true,
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
      registerView: false,
      forgotPasswordView: false,
      languageSelect: this.language,
    };
  },
  watch: {
    languageSelect() {
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
      label: "Português(BR)",
      value: "pt-br",
      flag: "pt-br.png",
    };
  },
};
</script>
   
<style>
</style>