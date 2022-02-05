import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Slots from '../views/Slots.vue';

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Spinner', component: Home },
  { path: '/slots', name: 'Slots', component: Slots },
  { path: '/about', name: 'About', component: function () { return import(/* webpackChunkName: "about" */ '../views/About.vue') } },
];

const router = new VueRouter({
  routes
})

export default router
