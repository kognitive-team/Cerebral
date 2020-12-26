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
class AgentMetricsPie extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.handleMerticDataResponse();
    }

    handleMerticDataResponse() {
        const metricData = this.props.pieData
        for (var i = 0; i < metricData[0].Collections.length; i++) {
            const collection = metricData[0].Collections[i]
            const pieDataObj = {}
            if (collection.Metric.Name === 'AGENTS_ONLINE') {
                pieDataObj.name = "Agents Online"
                pieDataObj.value = collection.Value
                pieData.push(pieDataObj)

            }
            else if (collection.Metric.Name === 'AGENTS_AVAILABLE') {
                this.setState({ agentsAvailable: collection.Value })
                pieDataObj.name = "Agents Available"
                pieDataObj.value = collection.Value
                pieData.push(pieDataObj)
            }
            else if (collection.Metric.Name === 'AGENTS_ON_CALL') {
                pieDataObj.name = "Agents On Call"
                pieDataObj.value = collection.Value
                pieData.push(pieDataObj)
            }
        }
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

    paintGraph() {
        const classes = this.props.classes;
        return (
            <Card className={classes.root}>
                                <CardContent>
                                <Typography component="h6" variant="h6">
                                   Agent Availability
                                </Typography>
            <ResponsiveContainer width="100%" height={200}>
                    <PieChart align="left"  >
                        <Pie data={pieData} cx="30%" cy="50%" dataKey="value" innerRadius={50} outerRadius={70} fill="#82ca9d">
                            {
                                pieData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Legend content={(props) => this.renderLegend(props)} layout="vetical" verticalAlign="middle" align="right" />
                    </PieChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        )
    }
    render() {
        return (
            !_.isEmpty(pieData) ? this.paintGraph() : <div />
        )
    }
}

export default withStyles(styles)(AgentMetricsPie)