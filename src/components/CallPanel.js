import React , { useState , useEffect }from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';

import { red, green } from '@material-ui/core/colors';

import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import "amazon-connect-streams";


  

class CallPanel extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
       
    };
  
}

componentDidMount() {
  const divContainer = document.createElement("divContainer")
  const connect = window.connect;
  const instanceURL = "https://lonebridge.awsapps.com/connect/ccp#" 

  console.log(connect)
    connect.core.initCCP(divContainer, {
      ccpUrl: instanceURL,
      ccpLoadTimeout: 25000,
      loginPopup: true,
      loginPopupAutoClose: true,
      region: "us-east-1",
     
      softphone: {
        allowFramedSoftphone: true
      }
    });
    connect.agent(this.subscribeToAgentEvents);
}

 subscribeToAgentEvents(agent) {
  console.log('Inside subscription')
  console.log(agent)
  // Subscribing to Streams API Long Polling Agent events
  window.myCPP.agent = agent;
  
}

  render() {
    return (
      <div id="divContainer" style={{ width: "320px", height: "500px" }} > Loading ... </div>
    )
    }
  
}
export default CallPanel;