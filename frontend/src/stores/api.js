import { defineStore } from "pinia";
import { useNotifications } from "./notifications";

export const useApiStore = defineStore("api", {
  state: () => ({
    data: null,
    loading: false,
    error: null,
    lastUpdated: null,
  }),

  actions: {
    // Запрос к серверу
    async fetchData() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch("http://127.0.0.1:8000/api/dashboard");
        const json = await response.json();

        this.data = json.data;
        this.lastUpdated = new Date();

        const notify = useNotifications();
        notify.show("Данные загружены!", "success", 3000);
      } catch (error) {
        this.error = error.message;
        const notify = useNotifications();
        notify.show("Ошибка загрузки данных", "error", 3000);
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    // геттеры для данных
    waterData: (state) => state.data?.water || null,
    airData: (state) => state.data?.air || null,
    tourismData: (state) => state.data?.tourism || null,
    actionsData: (state) => state.data?.actions || [],

    // Активные события
    activeActions: (state) =>
      state.data?.actions?.filter((a) => a.is_active) || [],

    // Ближайшее событие
    nextAction: (state) => {
      if (!state.data?.actions?.length) return null;
      return state.data.actions.sort(
        (a, b) => new Date(a.date) - new Date(b.date),
      )[0];
    },
  },
});
