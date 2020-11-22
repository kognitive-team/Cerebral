import React from 'react'
import { Card , List, Button} from 'semantic-ui-react'
class NextStepAction extends React.Component {

    createSuggestedActions() {

        return ( 
            <React.Fragment>
            Based on the informtion from the contact. Following are some suggested actions. Please note these actions were generated leveraging propeitary algorithm. Agents are encouraged to cross-verify these actions.
            <br />
            <List>
            <List.Item>
              <List.Header>Payment Due Notice</List.Header><br />
                <div> A reminder was sent to the customer regarding a payment notice. The user might be calling to make the payment. </div> <br />
                <Button content='Collect Payment' primary />
            </List.Item>
            <List.Item>
              <List.Header>Recent Visit</List.Header><br />
              <div> The customer had a recent visit to the clinic, the user might be calling to know about the rest results </div> <br />
              <Button content='Open Dr. Notes' primary />
            </List.Item>
            
          </List>
          </React.Fragment>
        
        )
    }


    render(){
    
        return (
            <Card fluid raised={true}>
    <Card.Content header='Suggested Next Actions ' />
    <Card.Content description = {this.createSuggestedActions()} />
    
    </Card>
        )
    }

}
export default NextStepAction;