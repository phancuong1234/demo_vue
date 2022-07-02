import { http } from "@/helpers";
const auth = {
  namespaced: true,
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    async login(_, data) {
      return http.post("/auth/login", data);
    },
  },
};
export default auth;
