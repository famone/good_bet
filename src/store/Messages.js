import { API } from '../api'

const messages = {
  namespaced: true,
  state: {
    unread: 0,
    total: 0,
    messages: [],
  },
  mutations: {
    SET_UNREAD(state, payload) {
      state.unread = payload
    },
    SET_TOTAL(state, payload) {
      state.total = payload
    },
    SET_MESSAGES(state, payload) {
      state.messages = payload
    }
  },
  actions: {
    getUnreadCount({commit}) {
      API.get('counters').then(res => {
        commit('SET_UNREAD', res.data.messages.unread)
        commit('SET_TOTAL', res.data.messages.total)
      })
    },
    loadMessages({commit}) {
      API.get('messages')
        .then(res => {
          commit('SET_MESSAGES', res.data)
        })
    },
  },
  getters: {
    getUnread(state) {
      return state.unread
    },
    getTotal(state) {
      return state.total
    },
    getMessages(state) {
      return state.messages
    }
  }

}

export default messages