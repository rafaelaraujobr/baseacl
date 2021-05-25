export default {
    namespaced: true,
    state: {
        user: {
            id: null,
            name: null,
            email: null,
            roles: [{
                slug: null,
                description: null
            }],
            realm: {
                id: null,
                name: null
            },
            preference: {
                theme: "light",
                language: 'pt-br'
            },
        },
        token: null,
    },
    getters: {
        user: (state) => state.user,
        token: (state) => state.token
    },
    mutations: {
        SET_AUTH(state, payload) {
            if (payload) {
                state.user = payload.user;
                state.token = payload.token;
            } else {
                state.user = {
                    id: null,
                    name: null,
                    email: null,
                    roles: [{
                        slug: null,
                        description: null
                    }],
                    realm: {
                        id: null,
                        name: null
                    },
                    preference: {
                        theme: "light",
                        language: 'pt-br'
                    },
                };
                state.token = null;
            }
        },
        SET_USER(state, payload) {
            state.user = payload;
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
        }
    },
    actions: {
        ActionSetAuth({ commit }, payload) {
            commit('SET_AUTH', payload);
        },
        ActionSetUser({ commit }, payload) {
            commit('SET_USER', payload);
        },
        ActionSetToken({ commit }, payload) {
            commit('SET_TOKEN', payload);
        }
    },
};