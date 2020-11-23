import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles({
    root: {
        maxWidth: '97%',
    },
});



const NextStepAction = () => {

    const classes = useStyles();

    const createSuggestedActions = () => {

        return (
          
            <div> Sai Thotapalli</div>
        )
    }

    return (
        <Card className={classes.root}>
            
            <CardHeader   
                title= {<Typography gutterBottom variant="h4" component="h2"> Suggested Next Actions </Typography> } />
                   <Divider />
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Payment Due Notice
                        </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                    <div> A reminder was sent to the customer regarding a payment notice. The user might be calling to make the payment. </div> <br />
                    <Button variant="contained" color="primary"> Collect Payment </Button>
                  </Typography><br />
                  <Typography gutterBottom variant="h5" component="h2">
                        Recent Visit
                        </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                    <div> The customer had a recent visit to the clinic, the user might be calling to know about the rest results</div> <br />
                    <Button variant="contained" color="primary"> Open Dr. Notes </Button>
                  </Typography>
                 <Box m={3}/>

                </CardContent>
            </CardActionArea>
        </Card>
    )


}
export default NextStepAction;

