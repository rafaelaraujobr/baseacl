import { mapActions, mapGetters } from "vuex";
export default {
    methods: {
        ...mapActions("Global", ["ActionSetIsMobile", "ActionSetLanguage"]),
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