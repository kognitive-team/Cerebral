
export const addCurrentAgent = (agent) => {
    console.log('Inside Dispatcher')
    console.log(agent)
    return async dispatch => {
           dispatch({ type: 'ADD_CURRENT_AGENT', payload: agent })
    }
}    


export const handleAgentStateChangeAction = (agent) => {
    console.log('Inside Dispatcher')
    console.log(agent)
    return async dispatch => {
        
           dispatch({ type: 'AGENT_STATE_CHANGE', payload: agent })
    }
}    


