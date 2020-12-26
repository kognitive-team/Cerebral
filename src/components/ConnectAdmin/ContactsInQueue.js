import React from 'react';
import {
    PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer
} from 'recharts';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { SvgIcon } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Alert, AlertTitle } from '@material-ui/lab'

const styles = (theme) => ({

    root: {
        flexGrow: 1

    },
    gridSpacing: {
        margin: theme.spacing(1)
    },
    toolbar: theme.mixins.toolbar,
    cardMetrics: {

        color: '#e5452b',
        fontFamily: 'Abril Fatface'
    },
    cardTextDisplay: {

        alignItems: 'center',

    },
    listItemText: {
        fontSize: '0.8em',//Insert your required size
    }

});

const pieData = []
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
class ContactsInQueue extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.handleMerticDataResponse();
    }

    handleMerticDataResponse() {
        const contactQueueMap = new Map()

        const metricData = this.props.pieData
        for (var i = 0; i < metricData.length; i++) {
            metricData[i].Collections.map((item) => {

                if (item.Metric.Name === 'CONTACTS_IN_QUEUE') {
                    const contactObj = {}
                    // contactQueueMap.set(metricData[i].Dimensions.Channel , item.Value)
                    contactObj.name = metricData[i].Dimensions.Channel
                    contactObj.value = item.Value
                    pieData.push(contactObj)
                }
            })
        }
        console.log(pieData)
    }

    renderLegend(props) {
        const { payload } = props;
        const classes = this.props.classes;
  
        return (
            <List>
                {
                    payload.map((entry, index) => (
                        <ListItem >
                            <FiberManualRecordIcon style={{ color: entry.color }} />
                            <ListItemText classes={{ primary: classes.listItemText }} primary={`${entry.value} -  ${entry.payload.value}`} />
                        </ListItem>
                    ))
                }
            </List>
        );
    }

    renderGraphPie(pieData){
            if (!_.isEmpty(pieData))
            {
                return  pieData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
            }
            else{
                return <Cell fill='#FF0000'/> 
            }
    }

    renderGraphContainer(){

        return (
            <ResponsiveContainer width="100%" height={200}>
                        <PieChart align="left"  >
                            <Pie data={pieData} cx="30%" cy="50%" dataKey="value" innerRadius={50} outerRadius={70} fill="#82ca9d">
                                {this.renderGraphPie(pieData)}
                            </Pie>
                            <Legend content={(props) => this.renderLegend(props)} layout="vetical" verticalAlign="middle" align="right" />
                        </PieChart>
                    </ResponsiveContainer>
        )

    }

    renderInfoAlert(){
        return <Alert severity="info"> <AlertTitle>No Contacts</AlertTitle> There are currently <strong>No Contacts In the Queue!</strong> </Alert>    
    }

// // { (!_.isEmpty(pieData)) ? this.renderGraphContainer(): this.renderInfoAlert()}

    paintGraph() {
        const classes = this.props.classes;
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography component="h6" variant="h6">
                        Contacts In Queue
                    </Typography>
                    {this.renderGraphContainer()}
                  
                </CardContent>
            </Card>
        )
    }
    render() {
        return (
            this.paintGraph()
        )
    }

}

export default withStyles(styles)(ContactsInQueue)