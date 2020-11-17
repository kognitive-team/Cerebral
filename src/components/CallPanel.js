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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    width:60,
    height:60
  },
  toggleColor:{
    color:green[500]
  }
}));


  

const CallPanel = () => {
  const classes = useStyles()
  const [available, setAvailable] = useState(false)
  
  

  useEffect(() => {
    const divContainer = document.createElement("divContainer")
    const connect = window.connect;
  const instanceURL = "https://lonebridge.awsapps.com/connect/ccp#/" 
    connect.core.initCCP(divContainer, {
      ccpUrl: instanceURL,
      loginPopup: true,
      loginPopupAutoClose: true,
      region: "us-east-1",
      softphone: {
        allowFramedSoftphone: true
      }
    });
  }, []);


  function subscribeToAgentEvents(agent) {
    console.log('Inside subscription')
    console.log(agent)
    // Subscribing to Streams API Long Polling Agent events
    window.myCPP.agent = agent;
    
}
    


  const handleAvailableToggle = () => {
    setAvailable(!available);
  }


  

return (
   <div id="divContainer" style={{ width: "320px", height: "500px" }} />
)


}
export default CallPanel;