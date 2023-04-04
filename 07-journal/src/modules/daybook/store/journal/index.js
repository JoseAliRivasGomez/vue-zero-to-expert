

import state from './state'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

const journalModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

export default journalModule