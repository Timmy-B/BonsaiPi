import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)
// const url = 'http://192.168.10.212:8686/sensors'
export const GET_TEMP = 'GET_TEMP'
export const GET_CONFIG = "GET_CONFIG";
export const ADD_TEMP = 'ADD_TEMP'
export const SET_CONFIG = "SET_CONFIG";
export default new Vuex.Store({
  state: {
    stats: {
      temp: [],
      humidity: [],
      lux: [],
      moisture: [],
    },
    config: {},
  },
  mutations: {
    [ADD_TEMP]: (state, data) => {
      if (state.stats.temp.length > 29) {
        var num = state.stats.temp.length - 29;
        state.stats.temp.splice(0, num);
        state.stats.humidity.splice(0, num);
        state.stats.lux.splice(0, num);
        state.stats.moisture.splice(0, num);
      }
      state.stats.temp.push(data.temp);
      state.stats.humidity.push(data.humidity);
      state.stats.lux.push(data.lux);
      state.stats.moisture.push(data.moisture);
    },
    [SET_CONFIG]:(state, data) => {
      state.config = data
    }
  },
  actions: {
    [GET_TEMP]: ({ commit }) => {
      axios({
        url: "http://192.168.10.212:8686/sensors",
        method: "GET",
      })
        .then((resp) => {
          console.log(resp.data);
          commit(ADD_TEMP, resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [GET_CONFIG]: ({ commit }) => {
      axios({
        url: "http://192.168.10.212:8686/config",
        method: "GET",
      })
        .then((resp) => {
          console.log(resp.data);
          commit(SET_CONFIG, resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
