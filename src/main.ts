import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/reset.css';
import './assets/main.css';
import '@fontsource/open-sans';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
  faRightFromBracket, faListCheck, faCalendarPlus, faTable,
} from '@fortawesome/free-solid-svg-icons';
import router from './router';
import App from './App.vue';

/* add icons to the library */
library.add(faRightFromBracket, faListCheck, faCalendarPlus, faTable);

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
