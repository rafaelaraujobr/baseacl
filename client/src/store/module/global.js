export default {
    namespaced: true,
    state: {
        isMobile: null,
        language: 'pt-br'
    },
    getters: {
        isMobile: (state) => state.isMobile,
        language: (state) => state.language,
    },
    mutations: {
        SET_ISMOBILE(state, payload) {
            state.isMobile = payload;
        },
        SET_LANGUAGE(state, payload) {
            state.language = payload;
        },
    },
    actions: {
        ActionSetIsMobile({ commit }, payload) {
            commit('SET_ISMOBILE', payload);
        },
        ActionSetLanguage({ commit }, payload) {
            commit('SET_LANGUAGE', payload);
        }
    },
};