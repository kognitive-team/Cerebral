import React from 'react'
import { connect } from 'react-redux'
import { Label, Icon, Tab, Header, Checkbox, List, Image} from 'semantic-ui-react'

class TopNav extends React.Component{

    
    render(){
       

        return(
            <div className="ui top fixed menu nav">
            <div className="left ui text menu">
                <a href="#" className="sidebar-menu-toggler item" data-target="#sidebar">
                    <i className="sidebar icon"></i>
                </a>
                <div class="item ">
                <Header as='h2' >
                <Header.Content>
                { this.props.currentAgent.name}
             <Header.Subheader>{this.props.currentAgent.status}</Header.Subheader>
              </Header.Content>
            </Header>
                </div>
                
           
            </div>
            <div className="right menu">

                
        
                <div className="ui dropdown item">
                    <i className="user cirlce icon large"></i>
                    <div className="menu">
                        <a href="#" className="item">
                            <i className="info circle icon"></i> Profile</a>
                        <a href="#" className="item">
                            <i className="wrench icon"></i>
                                    Settings</a>
                        <a href="#" className="item">
                            <i className="sign-out icon"></i>
                                       Logout
                            </a>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentAgent: state.currentAgent
    }
}

export default connect(mapStateToProps)(TopNav);