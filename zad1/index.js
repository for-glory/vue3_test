const app = Vue.createApp({
  data: () => {
    return { message: "" };
  },
  computed: {
    has_uppercase() {
      return /[A-Z]+/.test(this.message)
    },
    has_lowercase() {
      return /[a-z]+/.test(this.message)
    },
    has_number() {
      return /[0-9]+/.test(this.message)
    },
    has_special() {
      return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.message)
    },
  }
});

app.mount("#app");
