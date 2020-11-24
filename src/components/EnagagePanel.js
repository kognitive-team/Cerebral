import React from 'react'

import  { addCurrentAgent, handleAgentStateChangeAction }  from '../actions'
import { connect } from 'react-redux';
import "amazon-connect-streams";
import { CONNECT_INSTANCE_URL , AWS_REGION } from '../constants'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const AWSConnect = window.connect;

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
    this.toggleAgentAvailable = this.toggleAgentAvailable.bind(this);
    this.initializeCCP = this.initializeCCP.bind(this);
    this.containerDiv = React.createRef();
    this.subscribeToAgentEvents = this.subscribeToAgentEvents.bind(this);
    this.agentGoOffline = this.agentGoOffline.bind(this)
    this.state = {
        availableStatus: false
    }
  }

  componentDidMount(){
     this.initializeCCP()
 }
 setAvailabileStatus(status) {
    this.setState({availableStatus:status})
}
 //Create the CCP Connection with AWS Provided CCP Panel
 initializeCCP(){
    if (AWSConnect) {
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
}
subscribeToAgentEvents(agent) {
    AWSConnect.agent = agent;
    console.log(agent.getState().name)
    this.setAvailabileStatus(agent.getState().name !== "Offline"? true : false)
    console.log(this.state.availableStatus)
    agent.onOffline(this.agentGoOffline);
    this.setAgentDataOnState(agent)
}
setAgentDataOnState(agent){
    const currentAgent = {}
    currentAgent.name = agent.getName()
    currentAgent.status = agent.getState().name 
   if (this && currentAgent) { 
         this.props.addCurrentAgent(currentAgent)
      }
}

agentGoAvailable() {
    // Streams API call to the first Routable state availale to the Agent
    // Logging results to the console and setting the DOM button UI to the 'Available' state
    var routableState = AWSConnect.agent.getAgentStates().filter(function (state) {
        return state.type === AWSConnect.AgentStateType.ROUTABLE;
    })[0];
    AWSConnect.agent.setState(routableState, {
        success: function () {
            console.log('Set agent status to Available via Streams');
        },
        failure: function () {
            console.log('Failed to set agent status to Available via Streams');
        }
    });
}
 agentGoOffline() {
    // Streams API call to the first Offline state availale to the Agent
    // Logging results to the console and setting the DOM button UI to the 'Offline' state
    var offlineState = AWSConnect.agent.getAgentStates().filter(function (state) {
        return state.type === AWSConnect.AgentStateType.OFFLINE;
    })[0];
    AWSConnect.agent.setState(offlineState, {
        success: function () {
            console.log('Succesfully set agent status to Offline via Streams');
        },
        failure: function () {
            console.log('Failed to set agent status to Offline via Streams');
        }
    });
}


toggleAgentAvailable(){
  if (AWSConnect.agent.getState().name !== 'Offline' ){
      this.agentGoOffline()
      this.setAvailabileStatus (false)
  }
  else{
    this.agentGoAvailable()
    this.setAvailabileStatus (true)
  }
 
}

 render() {
    const classes = this.props;
        return (
            <React.Fragment>
                <Paper >
                    <div style={{width:'380px' , height:'500px'}}  ref={this.containerDiv}> </div>
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
      addCurrentAgent: ( val) => dispatch(addCurrentAgent( val)),
      handleAgentStateChangeAction : (val ) =>  dispatch(handleAgentStateChangeAction(val))
    };
}   

export default connect(mapStateToProps, mapDispatchToProps ) (withStyles(styles)( EngagePanel ));


