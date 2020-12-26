import React from 'react'

var AWS = {}
var AWSConnect = {}
class QueueMetricData extends React.Component {
    constructor(props){
        super(props);
        AWS = props.AWS
        AWSConnect = new AWS.Connect();
    }
    componentDidMount(){
        this.getQueueMetricData(props.queueID)
    }
   async getQueueMetricData(queueID)
    {
        var params = {
            EndTime: new Date(), /* required */
            Filters: { /* required */
              Channels: [
                VOICE | CHAT | TASK,
                /* more items */
              ],
              Queues: [
                queueID,
                /* more items */
              ]
            },

            HistoricalMetrics: [
                {
                    Name: 'CONTACTS_QUEUED',
                    Statistic: 'SUM',
                    Unit: 'SECONDS | COUNT | PERCENT'
                },
                {
                    Name: 'CONTACTS_ABANDONED',
                    Statistic: 'SUM',
                    Unit: 'SECONDS | COUNT | PERCENT'
                },
                {
                    Name: 'CONTACTS_CONSULTED',
                    Statistic: 'SUM',
                    Unit: 'SECONDS | COUNT | PERCENT'
                },
                {
                    Name: 'HANDLE_TIME',
                    Statistic: 'SUM',
                    Unit: 'SECONDS | COUNT | PERCENT'
                }
                
                
                /* more items */
            ],  
            InstanceId: 'STRING_VALUE', /* required */
            StartTime: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789, /* required */
            Groupings: [
              QUEUE | CHANNEL,
            
            ],
            MaxResults: '100'
          };
       await AWSConnect.getMetricData(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
          });
    }
    render(){
        return (
            <div> Sai Thotapalli</div>
        )
    }
}


export default QueueMetricData;