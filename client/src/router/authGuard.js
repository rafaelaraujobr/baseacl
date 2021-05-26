import axios from "axios";
import store from "@/store";

export default async (to, from, next) => {

    const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.VUE_APP_IP_SERVICE_EXTERNO : process.env.VUE_APP_IP_SERVICE_LOCAL;
    const { token } = localStorage['roostec-base-acl'] ? JSON.parse(localStorage.getItem("roostec-base-acl")) : { token: null };

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        console.log('protegido')
        try {
            if (!token) throw 'token não informado'
            let { data } = await axios.get(`${baseUrl}/v1/account/authorization`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            store.dispatch("User/ActionSetAuth", data);
            next();
        } catch (error) {
            console.log(error);
            store.dispatch("User/ActionSetAuth", null);
            next({ name: "Auth" });
        }
    } else {
        console.log('nao protegido')
        try {
            if (!token) throw 'token não informado'
            await axios.get(`${baseUrl}/account/authorization`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            next({ name: "Home" });
        } catch (error) {
            store.dispatch("User/ActionSetAuth", null);
            console.log(error);
            next();
        }
    }
}
