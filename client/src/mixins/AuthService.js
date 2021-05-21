import { mapActions, mapGetters } from "vuex";
export default {
    methods: {
        ...mapActions("User", ["ActionSetUser", "ActionSetToken"]),
        async login(email, password) {
            try {
                const { data } = await this.$http.post("/account/login", {
                    email,
                    password,
                });
                if (data) localStorage.setItem("roostec-base-acl", JSON.stringify(data));
                this.$router.push({ name: "Home" });
                console.log(data);
            } catch (error) {
                console.log(error.response.data);
            }
        },
    },
    computed: {
        ...mapGetters("User", ["user", "token"])
    },
};