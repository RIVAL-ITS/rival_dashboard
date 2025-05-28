<script>
import ROSLIB from "roslib";
import { useRobotStore } from "./stores/store.js";

export default {
  setup() {
    const ROBOT_STATE = useRobotStore();
    return {
      ROBOT_STATE,
    };
  },
  data() {
    return {
      ros: null,
      listener: null,

      //data yang di publish ke PC robot
      toPC: null,
    };
  },
  async beforeMount() {
    await this.init();
    this.subscribe();
  },
  created() {
    this.ROBOT_STATE.resetDataRobot();
  },
  methods: {
    async init() {
      this.ros = new ROSLIB.Ros({
        url: "ws://localhost:9090", // Sesuaikan URL dengan alamat ROS Bridge Anda
      });

      //subsribe from pc robot to base station
      this.listener = new ROSLIB.Topic({
        ros: this.ros,
        name: "/pc2bs",
        messageType: "XXX",
      });
    },
    subscribe() {
      let that = this;

      //put all listener in here, from ROBOT to Ground Station PC Data
      that.listener.subscribe(function (message) {
        that.ROBOT_STATE.dataRobot = message;

        //example
        //ngikutin custom msg robot
        that.ROBOT_STATE.dataRobot.pos_x += 58;
        that.ROBOT_STATE.dataRobot.pos_y += 58;
        that.ROBOT_STATE.dataRobot.pos_theta *= -1;
        console.log(that.ROBOT_STATE.dataRobot);
      });
    },
    publish() {
      this.publisher.publish(this.toPC);
    },
    beforeDestroy() {
      // Berhenti mendengarkan topik sebelum komponen dihancurkan
      if (this.listener) {
        this.listener.unsubscribe();
      }
    },
  },
};
</script>

<template>
  <router-view> </router-view>
</template>
