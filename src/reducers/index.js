import { combineReducers } from 'redux';

export function currentAgentReducer(state = {}, action) {
    
    switch (action.type) {
        case 'ADD_CURRENT_AGENT': {
            return  action.payload
        }
        case 'AGENT_STATE_CHANGE': {
            if (state){
                console.log('inside reducer and the current status is ' + action.payload)
                return { ...state,  status: action.payload.status, statusDuration:action.payload.statusDuration }
            }
            else return state  
        }
        default:
            return state
    }
}

export function addQueueListReducer(state = {}, action) {
    switch (action.type) {
        case 'ADD_QUEUE_LIST': {
        return  action.payload
         }
        default:
        return state
        }
}


const appReducer = combineReducers({
    queueList: addQueueListReducer,
    currentAgent: currentAgentReducer

})
export default appReducer;