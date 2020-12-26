import React from 'react';
import NavTopBar from '../components/NavTopBar'
import UserList from '../components/ConnectAdmin/UserList'
import ContentContainer from '../components/ContentContainer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AgentMetricData from '../components/ConnectAdmin/AgentMetricData';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {AWS_CONFIGURATION, CONNECT_INSTANCE_ID} from '../Config/AWSConfig'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const AWS = require('aws-sdk');
  AWS.config.region = AWS_CONFIGURATION.region;
  AWS.config.credentials = {
    accessKeyId: AWS_CONFIGURATION.accessKeyId,
    secretAccessKey: AWS_CONFIGURATION.secretAccessKey
}

//initialize AWSConnect

 
return (
    <div className={classes.root}>

      <Router>
          <NavTopBar />
          <Route path="/userlist" render={(props) => ( <UserList {...props} AWS={AWS} /> )} /> 
          <Route path="/agentmetrics" render={(props) => ( <AgentMetricData {...props} AWS={AWS} /> )} /> 
          <Route path="/" exact component={ ContentContainer} />
         
       </Router> 
    </div>
      
  )
}

export default App;


