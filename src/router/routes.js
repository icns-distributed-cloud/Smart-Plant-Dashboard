
import CCTV from "../components/Dashboard/CCTV.vue";
import Home from "../views/Home.vue";
import Detection from "../components/Dashboard/Detection.vue";
import Monitoring from "../components/Dashboard/Monitoring.vue";
import SensorManage from "../views/SensorManage.vue";
import AlertSettings from "../components/AbnormalDetection/AlertSettings.vue";
import SensorPos from "../components/IoTManage/SensorPos.vue";
// import SensorPos from "../components/SOPEditor/test.vue"
import EsopEidtor from "../components/SOPEditor/MainPage.vue";
import EsopManager from "../components/Esop/EsopManager.vue";
import MsgLog from "../components/Esop/MsgLog.vue";
import PageNotfound from "../views/PageNotFound.vue";
import AbnormalDetectionLog from "../components/AbnormalDetection/AbnormalDetectionLog.vue";
import EditEsopHome from "../components/SOPEditor/EditEsopHome.vue";
import EsopEditor from "../components/SOPEditor/MainPage.vue";


const routes = [
  {
    path: "/cctv",
    name: "CCTV",
    component: CCTV,
  },
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
    path: "/abnormal-detection-log",
    name: "AbnormalDetectionLog",
    component: AbnormalDetectionLog,
  },
  {
    path: "/edit-esop-home",
    name: "EditEsopHome",
    component: EditEsopHome,
  },
  {
    path: "/esop-editor",
    name: "EsopEditor",
    component: EsopEditor,
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
  {
    path: '/*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: PageNotfound,
  }
];


 
export default routes