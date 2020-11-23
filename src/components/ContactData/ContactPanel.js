import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountDetail from '../ContactData/AccountDetail'
import BillingDetail from '../ContactData/BillingDetail'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ContactPanel = () =>  {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={1}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="Contact Details Tabs"
        >
          <LinkTab label="Account Details" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Billing Details" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Recent Transactions" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        
        <AccountDetail />


      </TabPanel>
      <TabPanel value={value} index={1}>
        <BillingDetail />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Recent Interactions
      </TabPanel>
    </div>
  );
}
export default ContactPanel;