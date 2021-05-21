import { mapActions, mapGetters } from "vuex";
export default {
    methods: {
        ...mapActions("Global", ["ActionSetIsMobile", "ActionSetLanguage"]),
        validateEmail(value, msg) {
            const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!value.match(mailformat)) throw msg;
        }

    },
    computed: {
        ...mapGetters("Global", ["isMobile", "language"]),
        isMobile() {
            return (
                (this.$q.platform.is.mobile || this.$q.screen.name == "xs") &&
                this.$q.screen.height > this.$q.screen.width
            );
        },
    },
};