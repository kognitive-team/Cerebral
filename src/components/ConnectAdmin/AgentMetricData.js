import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import { CONNECT_INSTANCE_URL, AWS_REGION } from '../../constants'
import { CONNECT_INSTANCE_ID } from '../../Config/AWSConfig'
import { connect } from 'react-redux'
import { addQueueList } from '../../actions'
import _ from 'lodash';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import {
    PieChart, Pie, Sector, Cell,
} from 'recharts';
import AgentMetricsPie from './AgentMetricsPie'
import ContactsInQueue from './ContactsInQueue'


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

});

var AWS = {}
var AWSConnect = {}


class AgentMetricData extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            queueList: [],
            queueListIDByName: new Map(),
            chipColors: new Map(),
            agentPieData: {}
        }
        AWS = props.AWS
        AWSConnect = new AWS.Connect();
        this.renderQueueChips = this.renderQueueChips.bind(this);
        this.getQueueList = this.getQueueList.bind(this);
    }

    componentDidMount() {
        //load all components by calling AWSConnect
        this.loadQueueList()
    }


    loadQueueList() {
        var chipColors = new Map()
        var queueListIDByName = new Map()
        this.getQueueList().then((response) => {
            this.setState({ queueList: response.QueueSummaryList })
            for (var i = 0; i < response.QueueSummaryList.length; i++) {
                queueListIDByName.set(response.QueueSummaryList[i].Name, response.QueueSummaryList[i].Id)
                chipColors.set(response.QueueSummaryList[i].Name, "primary")
            }
            this.setState({ chipColors })
            this.setState({ queueListIDByName })
        })
    }

    async getQueueList() {
        var params = {
            InstanceId: CONNECT_INSTANCE_ID, /* required */
            MaxResults: '10',
            QueueTypes: ['STANDARD'
                /* more items */
            ]
        };
        return await AWSConnect.listQueues(params).promise()
    }

    renderQueueChips() {
        const retVal = <div>
            {
                this.state.queueList.map((item, index) => {
                    return <React.Fragment><Chip onClick={(item) => this.handleChipClick(item)} color="primary" style={{ backgroundColor: this.state.chipColors.get(item.Name) }} icon={<LinearScaleIcon />} label={item.Name} /> <box /> </React.Fragment>
                })
            }
        </div>
        return retVal;
    }

    handleChipClick(e) {
        this.state.chipColors.set(e.target.innerText, "red")

        this.forceUpdate();
        this.fetchQueueMetrics(this.state.queueListIDByName.get(e.target.innerText)).then(
            (response) => {
                console.log(response)
                console.log('###########')
                this.setState({ agentPieData: response.MetricResults })
                console.log(this.state.agentPieData)


            }
        )
    }
    async fetchQueueMetrics(queueId) {

        var params = {
            CurrentMetrics: [
                {
                    Name: 'AGENTS_ONLINE',
                    Unit: 'COUNT'
                },
                {
                    Name: 'AGENTS_AVAILABLE',
                    Unit: 'COUNT'
                },
                {
                    Name: 'AGENTS_ON_CALL',
                    Unit: 'COUNT'
                },
                {
                    Name: 'CONTACTS_IN_QUEUE',
                    Unit: 'COUNT'
                }
            ],
            Filters: { /* required */
                Channels: [
                    'VOICE', 'CHAT'
                ],
                Queues: [
                    queueId
                    /* more items */
                ]
            },
            InstanceId: CONNECT_INSTANCE_ID, /* required */
            Groupings: [
                'QUEUE', 'CHANNEL',
                /* more items */
            ],
            MaxResults: '10'
        };
        return await AWSConnect.getCurrentMetricData(params).promise();

    }


    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root}>
                <div className={classes.toolbar} />
                <Grid container className={classes.gridSpacing} spacing={2}>
                    <Grid item xs={12} lg={12} md={12} className={classes.gridSpacing} spacing={1}>
                        {this.renderQueueChips()}
                    </Grid>
                    <Grid item xs={12} lg={2} md={4} className={classes.gridSpacing} spacing={1}>
                        {(!_.isEmpty(this.state.agentPieData)) ? <AgentMetricsPie pieData={this.state.agentPieData} /> : <div /> }
                    </Grid>
                    <Grid item xs={12} lg={2} md={4} className={classes.gridSpacing} spacing={1}>
                        {(!_.isEmpty(this.state.agentPieData)) ? <ContactsInQueue pieData={this.state.agentPieData} /> : <div /> }
                    </Grid> 
                </Grid>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        queueList: state.queueList
    }
}




export default connect(mapStateToProps, { addQueueList })(withStyles(styles)(AgentMetricData));