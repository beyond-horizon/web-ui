import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Timeline from "@/views/Timeline.vue";
import Flowchart from "@/views/Flowchart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/timeline",
    name: "timeline",
    component: Timeline
  },
  {
    path: "/flowchart",
    name: "flowchart",
    component: Flowchart
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
