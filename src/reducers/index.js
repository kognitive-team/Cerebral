import { combineReducers } from 'redux';

export function currentAgentReducer(state = {}, action) {
    
    switch (action.type) {
        case 'ADD_CURRENT_AGENT': {
            return  action.payload
        }
        case 'AGENT_STATE_CHANGE': {
            console.log(state)
            if (state){
                console.log('inside reducer and the current status is ' + action.payload)
                return { ...state,  status: action.payload }
            }
            else return state  
        }
        default:
            return state
    }
}



const appReducer = combineReducers({
    //contactFlowList: contactFlowListReducer,
    currentAgent:currentAgentReducer,
   // error: errorReducer

})
export default appReducer;