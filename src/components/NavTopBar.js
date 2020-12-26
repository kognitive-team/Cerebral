import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { AnnouncementSharp } from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { connect } from 'react-redux';    
import { convertMiliseconds} from './utils'

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logoImage: {
    width: '75%',
    height:' 75%',
    margin:20
  }, 
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
   
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      marginRight: theme.spacing(1),
      backgroundColor:'black'
    },
 
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  accountButton: {
    marginRight: theme.spacing(1),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nameTitle:{
    fontFamily: 'DM Serif Text, serif',
    fontWeight: '900',
    fontSize: "1.5rem"
    
  }
}));

const NavTopBar = (props) => {
  
  const { window, history } = props;
  
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navItems = [
    { text: 'Interact', icon: <AnnouncementSharp className={classes.iconColor} />, action: () => { history.push('/');}},
    { text: 'User List', icon: <AnnouncementSharp className={classes.iconColor} />, action: () => { history.push('/userlist');}},
    { text: 'Agent Metrics', icon: <AnnouncementSharp className={classes.iconColor} />, action: () => { history.push('/agentmetrics');}}
  ]
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} >
            <img className={classes.logoImage} src="images/logo/KognitiveLogo.png" />
      </div>   
      <Divider />
      <List className={classes.list}>
        {navItems.map((item, index) => {

          const { text, icon, action } = item;

          return (
            <ListItem button key={text} onClick={action}>
              <ListItemIcon> {icon} </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        })}
      </List>
      <Divider />
    </div>
  );

  const displayDuration = (duration) => {
   const durationConverted =  convertMiliseconds( props.currentAgent.statusDuration)
    return (`${durationConverted.d} : ${durationConverted.h} : ${durationConverted.m} `)
  
  }

  const container = window !== undefined ? () => window().document.body : undefined;
  return (  
    
    <div className={classes.root}>
       
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton} >
            <MenuIcon />
          </IconButton>
          <Typography  noWrap style={{ flex: 1 }}>
            Sai Thotapalli
            <Typography  noWrap variant='subtitle2'>
             {props.currentAgent ? props.currentAgent.status : null}  - &nbsp;
             <React.Fragment>
              {displayDuration(props.currentAgent.statusDuration)}
             </React.Fragment>
          </Typography>
          </Typography>
          
        
          <IconButton
            color="inherit"
            aria-label="Notifications"
            edge="start" >
            <NotificationsIcon className={classes.accountButton} fontSize="large" />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="account details"
            edge="start" >
            <AccountCircleIcon className={classes.accountButton} fontSize="large" />
          </IconButton>
          
        </Toolbar>

      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }} >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
     
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      currentAgent: state.currentAgent
    }
}
export default connect(mapStateToProps)(withRouter(NavTopBar));