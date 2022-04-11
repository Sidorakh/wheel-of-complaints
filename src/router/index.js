import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import HomeColours from '../views/HomeColours.vue';
import Slots from '../views/Slots.vue';
import GabbiSickie from '../views/GabbiSickie.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Spinner', component: Home },
  { path: '/colours', name: 'SpinnerColours', component: HomeColours },
  { path: '/slots', name: 'Slots', component: Slots },
  { path: '/sickie', name: 'GabbiSickie', component: GabbiSickie },
  { path: '/about', name: 'About', component: function () { return import(/* webpackChunkName: "about" */ '../views/About.vue') } },
];

const router = new VueRouter({
    routes
});

export default router
