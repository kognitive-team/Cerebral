import React from 'react'
import PhoneDialpad from './PhoneDialpad'




class PhoneEngage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        
    }

    componentDidMount(){
       
 
    }

    placeCall(phoneNumber){
        console.log(phoneNumber)
        console.log("Called Place Call")
  
    }
    render(){
        return(
            <React.Fragment>
             <PhoneDialpad placeCall={this.placeCall} />
          </React.Fragment>   
        );
    }

}



export default PhoneEngage;