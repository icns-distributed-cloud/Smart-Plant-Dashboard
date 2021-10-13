import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import CCTV from "@/components/Dashboard/CCTV.vue";
import Detection from "@/components/Dashboard/Detection.vue";
import Monitoring from "@/components/Dashboard/Monitoring.vue";
import SensorManage from "@/views/SensorManage.vue";

const routes = [
  // dashboardMenu,
  {
    path: "/detection",
    name: "Detection",
    component: Detection,
  },
  {
    path: "/cctv",
    name: "CCTV",
    component: CCTV,
  },
  {
    path: "/monitoring",
    name: "Monitoring",
    component: Monitoring,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sensor-manage",
    name: "SensorManage",
    component: SensorManage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
