import React, { useState, useEffect } from 'react'
import "amazon-connect-streams";
import { Segment } from 'semantic-ui-react'
import { Label, Icon, Tab, Header, Checkbox, List, Image} from 'semantic-ui-react'
import Dialpad from '../components/Dialpad'
import  { addCurrentAgent, handleAgentStateChangeAction }  from '../actions/index'
import { connect } from 'react-redux';

class CallPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     
    };
    this.containerDiv = React.createRef();
    this.subscribeToAgentEvents = this.subscribeToAgentEvents.bind(this);
   // this.handleAgentRefresh = this.handleAgentRefresh.bind(this);
    this.handleAgentStateChange = this.handleAgentStateChange.bind(this);
  }

  componentDidMount() {

    const connect = window.connect;
    const instanceURL = "https://lonebridge.awsapps.com/connect/ccp-v2/sai.thotapalli/"

    if (connect) {
      console.log(connect)
      connect.core.initCCP(this.containerDiv.current, {
        ccpUrl: instanceURL,            // REQUIRED
        loginPopup: true,               // optional, defaults to `true`
        loginPopupAutoClose: true,      // optional, defaults to `true`
        loginOptions: {                 // optional, if provided opens login in new window
          autoClose: true,              // optional, defaults to `false`
          height: 600,                  // optional, defaults to 578
          width: 400,                   // optional, defaults to 433
          top: 0,                       // optional, defaults to 0
          left: 0                       // optional, defaults to 0
        },
        region: "us-east-1",         // REQUIRED for `CHAT`, optional otherwise
        softphone: {                    // optional
          allowFramedSoftphone: false// optional
        }
      });
      connect.agent(this.subscribeToAgentEvents)
    }
  }

  subscribeToAgentEvents(agent) {
   
 //   agent.onRefresh(handleAgentRefresh);
 //   agent.onRoutable(handleAgentRoutable);
  //  agent.onNotRoutable(handleAgentNotRoutable);
   // agent.onOffline(handleAgentOffline);
    agent.onStateChange(this.handleAgentStateChange);
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


  handleAgentStateChange(agent){
    if (agent){
      console.log('here')
    this.props.handleAgentStateChangeAction(agent.newState)
    }
  }
  
  render() {
    const { classes } = this.props;
    
    const panes = [
      {
        menuItem: { key: 'phone', icon: 'phone', content: 'Phone' },
        render: () => <Tab.Pane floated="left" style={{ borderBottom: 'none' }}><Dialpad /></Tab.Pane>,
      },
      {
        menuItem: { key: 'chat', icon: 'chat', content: 'Chat' },
        render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
      },
    ]

    return (
      <React.Fragment>
        <div className="containerDiv" style={{ width: "320px", height: "500px" }} ref={this.containerDiv}> </div>
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
export default connect(mapStateToProps, mapDispatchToProps )(CallPanel)