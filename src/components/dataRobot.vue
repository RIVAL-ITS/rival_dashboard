<!-- 
---Author: Yosua Hares
---Date: 2025-05-26
---Description: Base Station Dashboard for Rival 25
-->

<template>
  <!-- <div class="soccer-dashboard flex flex-col p-2.5 bg-gray-100 min-w-[1400px] text-gray-800 text-[13px]"> -->
    <!-- Main content area (Left, Middle, Right panels) -->
    <div class="main-panels flex flex-row gap-2.5 mb-2.5">

    <div class="middle-panel flex-grow flex flex-col items-center p-2.5 bg-white border border-gray-300 shadow-sm">
      <div
        class="camera-grid grid grid-cols-2 grid-rows-2 gap-2"
        style="width: 1300px; height: 920px;"
      >
        <!-- you should config this alone, decode the rgb data from ROS -->
        <div class="camera-feed bg-gray-200 flex items-center justify-center rounded shadow w-full h-full">MAIN CAMERA 1</div>
        <div class="camera-feed bg-gray-200 flex items-center justify-center rounded shadow w-full h-full">MAIN CAMERA 2</div>
        <div class="camera-feed bg-gray-200 flex items-center justify-center rounded shadow w-full h-full">MAIN CAMERA 3</div>
        <div class="camera-feed bg-gray-200 flex items-center justify-center rounded shadow w-full h-full">MAIN CAMERA 4</div>
      </div>
    </div>

      <!-- Right Panel -->
      <div class="right-panel w-[320px] flex flex-col gap-2 bg-white p-2.5 border border-gray-300 shadow-sm">
        <div class="info-block-right text-xs leading-normal border border-gray-200 p-2 bg-gray-50">
          <p class="my-[3px] break-words"><strong class="font-bold">Backend :</strong> {{ backendInfo }}</p>
          <p class="my-[3px] break-words"><strong class="font-bold">Current Map :</strong> {{ this.tempMapStatus }}</p>
          <p class="my-[3px] break-words"><strong class="font-bold">Button Clicked : </strong> {{ this.tempStatus}}</p>
        </div>

        <div class="control-buttons-row flex gap-2">
          <button class="flex-grow p-2 bg-green-500 text-white border-0 rounded-sm cursor-pointer font-bold text-xs hover:bg-green-900" @click="statusClick('start')">Start</button>
          <button class="flex-grow p-2 bg-red-500 text-white border-0 rounded-sm cursor-pointer font-bold text-xs hover:bg-red-700" @click="statusClick('reset')">Reset</button>
          <button class="flex-grow p-2 bg-red-500 text-white border-0 rounded-sm cursor-pointer font-bold text-xs hover:bg-red-700" @click="statusClick('override')">Override</button>
          <!-- <button class="flex-grow p-2 bg-yellow-500 text-white border-0 rounded-sm cursor-pointer font-bold text-xs hover:bg-yellow-700" @click="statusClick('swap')">SWAP MAP!</button> -->
        </div>
        <H1>SWAP MAP</H1>
        <div class="control-buttons-row flex gap-2">
          <button class="flex-grow p-2 bg-red-500 text-white border-0 rounded-sm cursor-pointer font-bold text-xs hover:bg-red-700" @click="statusClick('red')">RED</button>
          <button class="flex-grow p-2 bg-blue-500 text-white border-0 rounded-sm cursor-pointer font-bold text-xs hover:bg-blue-700" @click="statusClick('blue')">BLUE</button>
        </div>
        <!-- <button class="strategy-button w-full p-2 bg-red-500 text-white border-0 rounded-sm cursor-pointer font-bold text-xs hover:bg-red-700">Strategy</button> -->

        <div class="command-grid grid grid-cols-2 gap-1.5">
            <button class="py-4 px-1 border border-gray-300 bg-gray-100 cursor-pointer rounded-sm text-[11px] text-center hover:bg-gray-200" @click="statusClick('undian1')">Undian 1</button>
            <button class="py-4 px-1 border border-gray-300 bg-gray-100 cursor-pointer rounded-sm text-[11px] text-center hover:bg-gray-200" @click="statusClick('undian2')">Undian 2</button>
            <button class="py-4 px-1 border border-gray-300 bg-gray-100 cursor-pointer rounded-sm text-[11px] text-center hover:bg-gray-200" @click="statusClick('undian3')">Undian 3</button>
            <button class="py-4 px-1 border border-gray-300 bg-gray-100 cursor-pointer rounded-sm text-[11px] text-center hover:bg-gray-200" @click="statusClick('undian4')">Undian 4</button>
            <button class="py-4 px-1 border border-gray-300 bg-gray-100 cursor-pointer rounded-sm text-[11px] text-center hover:bg-gray-200" @click="statusClick('undian5')">Undian 5</button>
            <button class="py-4 px-1 border border-gray-300 bg-gray-100 cursor-pointer rounded-sm text-[11px] text-center hover:bg-gray-200" @click="statusClick('undian6')">Undian 6</button>
            <button class="py-4 px-1 border border-gray-300 bg-gray-100 cursor-pointer rounded-sm text-[11px] text-center hover:bg-gray-200" @click="statusClick('undian7')">Undian 7</button>
            <button class="py-4 px-1 border border-gray-300 bg-gray-100 cursor-pointer rounded-sm text-[11px] text-center hover:bg-gray-200" @click="statusClick('undian8')">Undian 8</button>
        </div>
            <button class="py-4 px-1 border border-gray-300 bg-red-100 cursor-pointer rounded-sm text-[11px] text-center hover:bg-gray-200" @click="publish">PUBLISH TO PC ROBOT</button>

         <table class="var-robot-table w-full border-collapse text-[11px] text-center border border-gray-300">
          <tbody>
            <tr v-for="(row, rowIndex) in varRobotData.rows" :key="'data-row-' + rowIndex">
              <td class="label-col text-left font-bold bg-gray-100 w-[100px] pl-2 border border-gray-300 py-[6px] px-[3px] align-middle">{{ row.label }}</td>
              <td
                class="data-col whitespace-pre-line min-w-[35px] border border-gray-300 py-[5px] px-[3px] align-middle"
              >
                {{ row.values[0] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import ROSLIB from "roslib";
import { useRobotStore } from "../stores/store";

export default {
  name: 'RivalDashboard25',

  setup() {
    const ROBOT_STATE = useRobotStore();
    return {
      ROBOT_STATE,
    };
  },

  data() {
    return {
      ros: null,
      //topic BS to PC
      publisher: null,
      //data yang di publish ke PC robot
      toPC: {},

      tempStatus: "",
      tempMapStatus: "RED",
      backendInfo: "Disconnected",
    };
  },
  computed: {
    varRobotData() {
      return {
        headers: [1],
        rows: [
          //data subscribe dari ROBOT
          { label: "Pos X", values: [this.ROBOT_STATE.dataRobot.pos_x] },
          { label: "Pos Y", values: [this.ROBOT_STATE.dataRobot.pos_y] },
          { label: "Pos Theta", values: [this.ROBOT_STATE.dataRobot.pos_theta] },
          { label: "Data", values: [999] },
          { label: "Data", values: [999] },
          { label: "Data", values: [999] },
          { label: "Data", values: [999] },
          { label: "Data", values: [999] }, 
          { label: "Data", values: [999] },
          { label: "Data", values: [999] },
          { label: "Data", values: [999] },
          { label: "Data", values: [999] },
          { label: "Data", values: [999] },
          { label: "Data", values: [999] }
        ],
      };
    }
  },
  methods: {
    async init() {
      this.ros = new ROSLIB.Ros({
        url: "ws://localhost:9090",
      });

      // check backend status
      this.ros.on('connection', () => {
        this.backendInfo = "Connected";
      });
      this.ros.on('close', () => {
        this.backendInfo = "Disconnected";
      });
      this.ros.on('error', () => {
        this.backendInfo = "ERROR";
      });

      //publisher BS to PC Robot
      this.publisher = new ROSLIB.Topic({
        ros: this.ros,
        name: "/bs2pc",
        messageType: "XXX",
      });
    },

    publish() {
      this.ROBOT_STATE.bs2pc.status = this.ROBOT_STATE.utils.tempStatus;
      switch(this.ROBOT_STATE.bs2pc.status) {
        //case undian
        case "undian1":
        case "undian2":
        case "undian3":
        case "undian4":
        case "undian5":
        case "undian6":
        case "undian7":
        case "undian8":


        //case main button
        case "start":
        case "reset":
        case "override":
        case "swap":
          this.toPC = new ROSLIB.Message({
            mapStatus: this.ROBOT_STATE.bs2pc.mapStatus,
          });
          break;
      }

      this.publisher.publish(this.toPC);
    },

    statusClick(data) {
      const strNumber = String(data);

        this.tempStatus = strNumber;
        this.ROBOT_STATE.utils.tempStatus = strNumber; 

      switch(this.tempStatus) {
        //case undian
        case "undian1":
        case "undian2":
        case "undian3":
        case "undian4":
        case "undian5":
        case "undian6":
        case "undian7":
        case "undian8":


        //case main button
        case "start":
        case "reset":
        case "override":
        case "red":
        if (strNumber === "red" || strNumber === "blue") {
          this.tempMapStatus = strNumber;
        }

        case "blue":
        if (strNumber === "red" || strNumber === "blue") {
          this.tempMapStatus = strNumber;
        }

      }
    }
  }
}
</script>
