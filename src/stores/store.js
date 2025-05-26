import { defineStore } from "pinia";

export const useRobotStore = defineStore("alerts", {
  id: "store",
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      dataRobot: {
        pos_x: 58,
        pos_y: 0,
        pos_theta: 0,
      },
      //base station to PC robot
      bs2pc: {
        status: 0,
        mapStatus: "",
      },
      //others
      utils: {
        // status button
        tempStatus: "",
        tempMapStatus: "",
      },
    };
  },
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    resetDataRobot() {
      //default values
      this.dataRobot.pos_x = 69;
      this.dataRobot.pos_y = 0;
      this.dataRobot.pos_theta = 0;
      this.utils.tempMapStatus = 'RED';
    },
    // randomizeCounter() {
    //   this.count = Math.round(100 * Math.random());
    // },
  },
});
