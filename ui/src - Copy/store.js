import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)
// const url = 'http://192.168.10.212:8686/sensors'
export const GET_TEMP = 'GET_TEMP'
export const ADD_TEMP = 'ADD_TEMP'
export default new Vuex.Store({
  state: {
    temps:[]
  },
  mutations: {
    [ADD_TEMP]: (state, data) => {
      state.temps.push(data)
    },
  },
  actions: {
    [GET_TEMP]: ({ commit, dispatch }) => {
      setTimeout(() => {
        axios({
          url: 'http://192.168.10.212:8686/sensors',
          method: 'GET'
        })
          .then(resp => {
            console.log(resp.data)
            commit(ADD_TEMP, resp.data.temp)
          })
          .catch(err => {
            console.log(err)
          })
        dispatch(GET_TEMP)
      }, 5000);
    }
  },
  modules: {
  }
})
