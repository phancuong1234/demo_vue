import "./assets/js/nav-pills.js";
import "./assets/scss/argon-dashboard.scss";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

export default {
  install(Vue) {
    Vue.component("EasyDataTable", Vue3EasyDataTable);
  }
};
