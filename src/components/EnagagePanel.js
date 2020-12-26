import React from 'react'

import { addCurrentAgent, handleAgentStateChangeAction } from '../actions'
import { connect } from 'react-redux';
import "amazon-connect-streams";
import { CONNECT_INSTANCE_URL, AWS_REGION } from '../constants'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';


const AWSConnect = window.connect;
window.myCPP = window.myCPP || {};

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: '500px',
        },
    },

});


class EngagePanel extends React.Component {
    constructor(props) {
        super(props);
        this.initializeCCP = this.initializeCCP.bind(this);
        this.containerDiv = React.createRef();
        this.subscribeToAgentEvents = this.subscribeToAgentEvents.bind(this);
        this.setAgentDataOnState = this.setAgentDataOnState.bind(this)
        this.handleAgentRefresh = this.handleAgentRefresh.bind(this);
     //   this.handleAgentRoutable = this.handleAgentRoutable.bind(this);
     //   this.handleAgentNotRoutable = this.handleAgentNotRoutable.bind(this);
        this.handleAgentStateChange = this.handleAgentStateChange.bind(this);

    }

    componentDidMount() {
        this.initializeCCP()
    }

    //Create the CCP Connection with AWS Provided CCP Panel
    initializeCCP() {
            AWSConnect.core.initCCP(this.containerDiv.current, {
                ccpUrl: CONNECT_INSTANCE_URL,            // REQUIRED
                loginPopup: true,               // optional, defaults to `true`
                loginPopupAutoClose: true,      // optional, defaults to `true`
                loginOptions: {                 // optional, if provided opens login in new window
                    autoClose: true,              // optional, defaults to `false`
                    height: 600,                  // optional, defaults to 578
                    width: 400,                   // optional, defaults to 433
                    top: 0,                       // optional, defaults to 0
                    left: 0                       // optional, defaults to 0
                },
                region: AWS_REGION,         // REQUIRED for `CHAT`, optional otherwise
                softphone: {                    // optional
                    allowFramedSoftphone: true// optional
                }
            });
            AWSConnect.agent(this.subscribeToAgentEvents) //Subscribe to the agent events
    }


    subscribeToAgentEvents(agent) {
        window.myCPP.agent = agent;
        agent.onRefresh(this.handleAgentRefresh);
        agent.onRoutable(this.handleAgentRoutable);
        agent.onNotRoutable(this.handleAgentNotRoutable);
        agent.onOffline(this.handleAgentOffline);
        agent.onStateChange(this.handleAgentStateChange);
        //get the list of the queue names to match with the name of the queues that the agent is listed on
        agent.onError((agent) => {
            console.log('Error with Agent')
        })
        

        this.setAgentDataOnState(agent)
    }


    setAgentDataOnState(agent) {
      if (this && agent) {
            this.props.addCurrentAgent(this.collectAgentData(agent))
        }
    }

    collectAgentData(agent){
        const agentQueueARNList = agent.getAllQueueARNs()
        const queueList = []
        if (!_.isEmpty(agentQueueARNList) && agentQueueARNList.length > 0){
            for (var i=0;i<agentQueueARNList.length;i++){
                queueList.push(agentQueueARNList[i].split('/').pop());
            }
        }
        var agentData = {}
        agentData.name = agent.getName()
        agentData.status = agent.getState().name
        agentData.statusDuration = agent.getStatusDuration()
        agentData.queueList = queueList
        return agentData;
    }
    refreshAgentDataOnState(agent){
        this.props.handleAgentStateChangeAction(this.collectAgentData(agent))
    }

    handleAgentStateChange(agent) {
        this.refreshAgentDataOnState(agent)
    }

    handleAgentRefresh(agent) {
        this.refreshAgentDataOnState(agent)
    }

    
    
    render() {
        const classes = this.props;
        return (
            <React.Fragment>
                <Paper >
                    <div style={{ width: 'auto', height: '500px' }} ref={this.containerDiv}> </div>
                </Paper>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentAgent: state.currentAgent
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCurrentAgent: (val) => dispatch(addCurrentAgent(val)),
        handleAgentStateChangeAction: (val) => dispatch(handleAgentStateChangeAction(val))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EngagePanel));


