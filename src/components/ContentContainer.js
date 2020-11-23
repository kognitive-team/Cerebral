import React from 'react'
import {  makeStyles  } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import EngagePanel from '../components/EnagagePanel'
import ContactPanel from '../components/ContactData/ContactPanel'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import { Typography ,Divider } from '@material-ui/core';
import NextStepAction from '../components/SuggestiveAction/NextStepAction'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gridSpacing:{
    margin:theme.spacing(1)
},   
  toolbar: theme.mixins.toolbar,
  
}));

const ContentContainer = () => {
    const classes = useStyles();
    return(
       
<div className={classes.root}>
    <div className={classes.toolbar} />
    <Grid container className={classes.gridSpacing} spacing={2}>
        <Grid item xs={2}>
        <Box component="span" m={1}>
            <EngagePanel />
        </Box>
        </Grid>
        <Grid item xs={5}>
           <Card>
             <CardHeader title= { <Typography gutterBottom variant="h4" component="h2">  Contact Details </Typography> } />
             <Divider />
             <CardContent>
                 <ContactPanel />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5}>
            <NextStepAction />
        </Grid>
    </Grid>
</div>   
    )
}

export default ContentContainer;