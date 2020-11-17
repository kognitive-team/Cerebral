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
  const classes = useStyles();
  const [available, setAvailable] = useState(false);

 
  
  useEffect( () => {
    
    console.log('here')
    
    const connect = window.connect;
    const instanceURL = "https://lonebridge.awsapps.com/connect/ccp#/";  
  
    const divContainer = document.createElement("divContainer");
    console.log(divContainer)
  
    connect.core.initCCP(divContainer, {
      ccpUrl: instanceURL,            // REQUIRED
      loginPopup: false,               // optional, defaults to `true`
      loginPopupAutoClose: false,      // optional, defaults to `true`
      loginOptions: {                 // optional, if provided opens login in new window
        autoClose: false,              // optional, defaults to `false`
        height: 600,                  // optional, defaults to 578
        width: 400,                   // optional, defaults to 433
        top: 0,                       // optional, defaults to 0
        left: 0                       // optional, defaults to 0
      },
      region: "eu-central-1",         // REQUIRED for `CHAT`, optional otherwise
      softphone: {                    // optional
        allowFramedSoftphone: true,   // optional
        disableRingtone: false,       // optional
        ringtoneUrl: "./ringtone.mp3" // optional
       }
     });
  
     connect.agent(subscribeToAgentEvents);

  
  })
    

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
    <Card className={classes.root}>
      <CardHeader
      
        avatar={
          <Avatar aria-label="account" className={classes.avatar}>
            <AccountCircleIcon fontSize="large" />
          </Avatar>
        }
        action={
            <FormControlLabel
          control={<Switch size="small" className={classes.toggleColor} checked={available} onChange={handleAvailableToggle} name="available"  />}
          label="Available"
        />
        }
        title="Sai Thotapalli"
        subheader={available ? 'available' : 'offline'}
      />
      
      <CardContent>
       
        </CardContent>

    </Card>
  );
}
export default CallPanel;