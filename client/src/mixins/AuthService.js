import { mapActions, mapGetters } from "vuex";
export default {
    methods: {
        ...mapActions("User", ["ActionSetUser", "ActionSetToken", "ActionSetAuth"]),
        async logIn(email, password) {
            try {
                if (!email) throw 'email empyt'
                if (!password) throw 'password empyt'
                const { data } = await this.$http.post("/v1/account/login", {
                    email,
                    password,
                });
                if (data) localStorage.setItem("roostec-base-acl", JSON.stringify(data));
                this.ActionSetAuth(data)
                this.$router.push({ name: "Home" });
                console.log(data);
            } catch (error) {
                console.log(error.response.data);
            }
        },
        async logOut() {
            try {
                let res = await this.$http.post("/v1/account/logout");
                if (res.status == 200) {
                    localStorage.removeItem("roostec-base-acl");
                    this.ActionSetAuth(res.data)
                    this.$router.push({ name: "Auth" });
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        ...mapGetters("User", ["user", "token"])
    },
};