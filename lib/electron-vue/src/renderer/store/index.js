import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        main:{
            state:{
                test:'123',
            },
            mutations:{

            },
            // 因为使用了vuex-electron 所以需要采用actions
            actions:{

            }

        }
    },
    plugins: [
        createPersistedState(),
        createSharedMutations()
    ],
    // strict: process.env.NODE_ENV !== 'production'
})
