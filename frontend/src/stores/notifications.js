import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useNotifications = defineStore("notification", {
  state: () => ({
    visible: false,
    message: "",
    type: "info",
    timeout: null,
  }),

  actions: {
    show(message, type = "info", duration = 3000) {
      if (this.timeout) clearTimeout(this.timeout);

      this.message = message;
      this.type = type;
      this.visible = true;

      // Автоскрытие
      this.timeout = setTimeout(() => {
        this.hide();
      }, duration);
    },

    hide(){
        this.visible = false,
        this.timeout = null
    }
  },
});
