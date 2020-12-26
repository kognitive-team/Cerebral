import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import _ from 'lodash'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    gridSpacing: {
        margin: theme.spacing(2)
    },
    toolbar: theme.mixins.toolbar,
    table: {
        minWidth: 700,
      },


});

var AWS = {};
var AWSConnect = {}

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

class UserList extends React.Component {

    constructor(props) {
        super(props);
        AWS = props.AWS;
        AWSConnect = new AWS.Connect();
        this.state = {
           userDetailList: [],
           dataLoaded: false
        }
        this.fetchUserList = this.fetchUserList.bind(this);
        
    }

    componentDidMount() {
        var myConfig = new AWS.Config();
        const rows = []
        var count = 0
        myConfig.update({ region: 'us-east-1' });
        this.fetchUserList().then((response) => {
                var userSummarList = response.UserSummaryList;
                for (var i=0;i< userSummarList.length;i++) {
                    var params = {
                        InstanceId: '28466db6-06f0-4ab2-a6d1-2377336d9c9c', /* required */
                        UserId: userSummarList[i].Id/* required */
                    }
                  this.fetchUserDetailList( params).then( (item) => {
                    var userObj = {}
                    count++
                    userObj.id = count
                    userObj.firstname = item.User.IdentityInfo.FirstName
                    userObj.lastname = item.User.IdentityInfo.LastName
                    userObj.email = item.User.IdentityInfo.Email
                    userObj.phonetype = item.User.PhoneConfig.PhoneType
                    userObj.deskphonenumber = item.User.PhoneConfig.DeskPhoneNumber
                    userObj.autoaccept = item.User.PhoneConfig.AutoAccept
                    var userDetailList = this.state.userDetailList
                    userDetailList.push(userObj)
                    this.setState({userDetailList: userDetailList})
                })  
               
            } 
      })
        this.setState({dataLoaded:true})
    }

    async fetchUserList() {

        var returnedData = {}
        var params = {
            InstanceId: '28466db6-06f0-4ab2-a6d1-2377336d9c9c', /* required */
            MaxResults: '10'
        };
        return await AWSConnect.listUsers(params).promise();
    }
   
    async fetchUserDetailList( params) {
         return await AWSConnect.describeUser(params).promise();
    }   

    renderDataGrid(){
        const classes = this.props.classes;
        const userListDetailsArray = this.state.userDetailList
        const tableDom = <React.Fragment>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone Type</StyledTableCell>
            <StyledTableCell align="right">Desk Phone Number</StyledTableCell>
            <StyledTableCell align="right">Auto Accept</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {userListDetailsArray.map((row) => (
             
            <StyledTableRow key={row.firstname}>
              <StyledTableCell component="th" scope="row">
                {row.firstname}
              </StyledTableCell>
              <StyledTableCell align="right">{row.lastname}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.phonetype}</StyledTableCell>
              <StyledTableCell align="right">{row.deskphonenumber}</StyledTableCell>
              <StyledTableCell align="right">{row.autoaccept}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
        
    return  tableDom;
    }
    
    render() {
        const { classes } = this.props;
        return (

            <div className={classes.root}>
                <div className={classes.toolbar} />
                <Grid item xs={12} lg={12} md={12} className={classes.gridSpacing} spacing={2}>

                    <Card className={classes.root}>
                        <CardActionArea>
                           
                            <CardContent>
                             { this.renderDataGrid()}
                            </CardContent>
                        </CardActionArea>
                        
                    </Card>

                </Grid>
            </div>
        )
    }
}


  

export default (withStyles(styles)(UserList));
