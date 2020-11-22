import React from 'react';
import LeftNav from '../components/LeftNav'
import TopNav from '../components/TopNav'
import EngagePanel from '../components/EnagagePanel'
import ContactPanel from '../components/ContactData/ContactPanel';
import NextStepAction from '../components/SuggestiveAction/NextStepAction'

const App = () => {

  return (
    <div>
    <LeftNav />

      <div className="cerebral-dummy-class pusher">
        <div className="ui grid stackable padded" >
          <div className="four wide computer eight wide tablet sixteen wide mobile column">
            <TopNav />
          </div>
        </div>
        <div className="main-content">
          <div className="ui grid stackable padded">
            <div className="three wide computer six wide tablet sixteen wide mobile column">
              <EngagePanel />
            </div>
            <div className="eight wide computer eight wide tablet sixteen wide mobile column">
              <ContactPanel />
            </div>
            <div className="four wide computer eight wide tablet sixteen wide mobile column">
              <NextStepAction />
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default App;


