import React from 'react'
import { Label, Menu, Tab, Card } from 'semantic-ui-react'
import AccountDetail from '../ContactData/AccountDetail'
import BillingDetail from '../ContactData/BillingDetail'

const panes = [
    {
        menuItem: { key: 'users', icon: 'users', content: 'Account Details' },
        render: () => <Tab.Pane><AccountDetail /></Tab.Pane>,
    },
    {
        menuItem: { key: 'billing', icon: 'users', content: 'Billing Details' },
        render: () => <Tab.Pane><BillingDetail /></Tab.Pane>,
    
    },
        {
            menuItem: (
                <Menu.Item key='messages'>
                    Past Interactions <Label>15</Label>
                </Menu.Item>
            ),   
        render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
]

const ContactPanel = () => {

    return (
        <React.Fragment>
            <Card fluid raised={true} >
                <Card.Content>
                    <Card.Header>Contact Details</Card.Header>
                </Card.Content>
                <Card.Content>
                <Tab panes={panes} />
                </Card.Content>
             </Card>
        </React.Fragment>
    )
} 

export default ContactPanel;