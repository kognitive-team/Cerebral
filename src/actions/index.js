import { CONNECT_QUEUE_LIST_URL} from '../constants'
import Axios from 'axios'

export const addCurrentAgent = (agent) => {
    return async dispatch => {
        dispatch({ type: 'ADD_CURRENT_AGENT', payload: agent })
    }
}


export const handleAgentStateChangeAction = (state) => {
    return async dispatch => {
        dispatch({ type: 'AGENT_STATE_CHANGE', payload: state })
    }
}

export const addQueueList = (queueList) => {
    return async dispatch => {
        dispatch({ type: 'ADD_QUEUE_LIST', payload: queueList })
    }
}





