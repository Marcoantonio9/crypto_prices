import { createApp } from 'vue'
import './styles/app.css';
import './styles/global.css';
import App from './App.vue'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App);

app.component('Datepicker', Datepicker);
app.mount('#app');
