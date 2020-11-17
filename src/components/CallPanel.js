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
  const containerDiv = document.createElement("containerDiv")
  const connect = window.connect;
  const instanceURL = "https://lonebridge.awsapps.com/connect/ccp-v2/sai.thotapalli" 


  console.log(connect)
  connect.core.initCCP(containerDiv, {
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
      allowFramedSoftphone: true,   // optional
      disableRingtone: false,       // optional
      ringtoneUrl: "./ringtone.mp3" // optional
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
      <div id="containerDiv" style={{ width: "320px", height: "500px" }} > Loading ... </div>
    )
    }
  
}
export default CallPanel;