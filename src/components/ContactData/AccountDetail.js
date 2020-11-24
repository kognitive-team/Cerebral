import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Faker from 'faker'
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {formatDate } from '../utils'


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    labelFont: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        fontWeight: 'bold'
    },
}));

const AccountDetail = () => {
    const classes = useStyles();

    return (
        <div>

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h2">
                        Personal Details
                    </Typography>
                    <Divider />
                    <Box component="span" m={1}>
                    </Box>
                </Grid>


                <Grid item xs={4}>
                    <Box component="div" className={classes.labelFont} display="inline">First Name: </Box>
                    <Box component="div" display="inline"> {Faker.name.firstName()} </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box component="div" className={classes.labelFont} display="inline">Last Name: </Box>
                    <Box component="div" display="inline"> {Faker.name.lastName()} </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box component="div" className={classes.labelFont} display="inline">Address: </Box>
                    <Box component="div" display="inline"> {Faker.address.streetAddress()} </Box>
                    <Box component="div" display="inline"> {Faker.address.city()} , {Faker.address.state()} </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box component="div" className={classes.labelFont} display="inline">Email: </Box>
                    <Box component="div" display="inline"> {Faker.internet.email()} </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box component="div" className={classes.labelFont} display="inline">Phone: </Box>
                    <Box component="div" display="inline"> {Faker.phone.phoneNumberFormat()} </Box>
                </Grid>

                <Grid item xs={12}>
                <Box component="span" m={1} />
                    <Typography variant="h6" component="h2">
                        Account Details
                    </Typography>
                    <Divider />
                    <Box component="span" m={1} />
                    
                </Grid>

                <Grid item xs={4}>
                    <Box component="div" className={classes.labelFont} display="inline">Account: </Box>
                    <Box component="div" display="inline"> {Faker.finance.account()} </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box component="div" className={classes.labelFont} display="inline">Last Visit Date: </Box>
                    <Box component="div" display="inline"> {formatDate(Faker.date.past(), "DD/MM/YYYY")} </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box component="div" className={classes.labelFont} display="inline">Next Visit Date: </Box>
                    <Box component="div" display="inline"> {formatDate(Faker.date.future(), "DD/MM/YYYY")} </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box component="div" className={classes.labelFont} display="inline">Payment Due: </Box>
                    <Box component="div" display="inline"> {Faker.finance.amount()} </Box>
                </Grid>
            </Grid>
        </div>



    );
}

export default AccountDetail;


