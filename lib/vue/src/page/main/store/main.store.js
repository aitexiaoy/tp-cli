import * as actionTypes from './actionTypes'

export default {
    state: {
        aa: '1234'
    },
    mutations: {
        [actionTypes.MAIN_STORE](state, payload){
            // eslint-disable-next-line no-param-reassign
            state.aa = payload
        },
    },
    actions: {
        [actionTypes.MAIN_STORE](state, payload) {
            state.commit(actionTypes.MAIN_STORE, payload)
        },
    }
}
