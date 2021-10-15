import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import CCTV from "@/components/Dashboard/CCTV.vue";
import Detection from "@/components/Dashboard/Detection.vue";
import Monitoring from "@/components/Dashboard/Monitoring.vue";
import SensorManage from "@/views/SensorManage.vue";
import AlertSettings from "@/components/AbnormalDetection/AlertSettings.vue";
import SensorPos from "@/components/IoTManage/SensorPos.vue";
import EsopEidtor from "@/components/Esop/EsopEditor.vue";
import EsopManager from "@/components/Esop/EsopManager.vue";
import MsgLog from "@/components/Esop/MsgLog.vue";


const routes = [
  // dashboardMenu,
  {
    path: "/alertsettings",
    name: "AlertSettings",
    component: AlertSettings,
  },
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
    path: "/esop-editor",
    name: "EsopEditor",
    component: EsopEidtor,
  },
  {
    path: "/esop-manager",
    name: "EsopManager",
    component: EsopManager,
  },
  {
    path: "/msglog",
    name: "MsgLog",
    component: MsgLog,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sensorpos",
    name: "sensorPos",
    component: SensorPos,

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
