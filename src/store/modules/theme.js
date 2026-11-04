// src/store/modules/theme.js
import { nextTick } from 'vue';

let activeSwitch;

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
    async toggleTheme({ state, commit }) {
      const html = document.documentElement;

      if (activeSwitch) {
        // Track the requested theme even before the first snapshot callback runs.
        activeSwitch.isDark = !activeSwitch.isDark;
        activeSwitch.interrupted = true;
        activeSwitch.transition?.skipTransition();
        html.classList.add('theme-switching');
        commit('SET_DARK', activeSwitch.isDark);
        return;
      }

      const request = { isDark: !state.isDark };
      activeSwitch = request;
      const applyTheme = async () => {
        html.classList.add('theme-switching');
        if (state.isDark !== request.isDark) {
          commit('SET_DARK', request.isDark);
        }
        await nextTick();
      };

      try {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (typeof document.startViewTransition === 'function' && !reduceMotion) {
          request.transition = document.startViewTransition(applyTheme);
          // A skipped animation rejects ready even when the theme update succeeds.
          request.transition.ready.catch(() => {});
          await request.transition.finished;
        } else {
          await applyTheme();
        }
      } finally {
        if (!request.transition || request.interrupted) {
          await nextTick();
          // Commit the final styles before restoring component transitions.
          void html.offsetWidth;
        }
        html.classList.remove('theme-switching');
        activeSwitch = undefined;
      }
    }
  }
};
