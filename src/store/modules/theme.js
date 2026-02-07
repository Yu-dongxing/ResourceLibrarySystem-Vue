// src/store/modules/theme.js
export default {
  namespaced: true,
  state: {
    isDark: false,
  },
  mutations: {
    SET_DARK(state, isDark) {
      state.isDark = isDark;
      const html = document.documentElement;
      if (isDark) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    },
    TOGGLE_THEME(state) {
        state.isDark = !state.isDark;
        const html = document.documentElement;
        if (state.isDark) {
          html.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          html.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
    }
  },
  actions: {
    initTheme({ commit }) {
      const cachedTheme = localStorage.getItem('theme');
      if (cachedTheme) {
        commit('SET_DARK', cachedTheme === 'dark');
      } else {
        // Optional: Check system preference
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        commit('SET_DARK', systemDark);
      }
    },
    toggleTheme({ commit }) {
      commit('TOGGLE_THEME');
    }
  }
};
