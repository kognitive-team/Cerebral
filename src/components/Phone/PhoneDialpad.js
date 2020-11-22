import React , { useState, useEffect }from 'react'
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'

const PhoneDialpad = (props) => {

    const [dialedNumber, setDialedNumber] = useState();
    console.log(dialedNumber)
    useEffect(() => {
      },[props.placeCall]);


    const addToDialedNumber = (numberDialed) => {
           setDialedNumber(_.concat(dialedNumber, numberDialed))
    } 

    const removeDialedNumber = () => {
            setDialedNumber(dialedNumber.slice(0,-1))
    }

    return (
        <React.Fragment>
            <div class="ui grid">
                <div class="four wide column" />
                <div class="twelve wide column" >
                    <div class="ui disabled input">
                        {dialedNumber}
                </div>
                </div>
            </div>

            <div class="ui grid">
                <div class="one wide column" />
                <div class="four wide column">
                    <a class="ui massive gray circular label" onClick={() => addToDialedNumber(1)}>1</a>
                </div>
                <div class="four wide column">
                    <a class="ui massive gray circular label" onClick={() => addToDialedNumber(2)}>2</a>
                </div>
                <div class="four wide column">
                    <a class="ui massive gray circular label" onClick={() => addToDialedNumber(3)}>3</a>
                </div>
            </div>
            <div class="ui grid">
                <div class="one wide column" />
                <div class="four wide column">
                    <a class="ui massive gray circular label" onClick={() => addToDialedNumber(4)} >4</a>
                </div>
                <div class="four wide column">
                    <a class="ui massive gray circular label" onClick={() => addToDialedNumber(5)}>5</a>
                </div>
                <div class="four wide column">
                    <a class="ui massive gray circular label" onClick={() => addToDialedNumber(6)}>6</a>
                </div>
            </div>
            <div class="ui grid">
                <div class="one wide column" />
                <div class="four wide column">
                    <a class="ui massive gray circular label" onClick={() => addToDialedNumber(7)}>7</a>
                </div>
                <div class="four wide column">
                    <a class="ui massive gray circular label" onClick={() => addToDialedNumber(8)}>8</a>
                </div>
                <div class="four wide column">
                    <a class="ui massive gray circular label" onClick={() => addToDialedNumber(9)}>9</a>
                </div>
            </div>
            <div class="ui grid">
                <div class="one wide column" />
                <div class="four wide column">
                    <a class="ui massive gray circular label" onClick={() => addToDialedNumber('*')}>*</a>
                </div>
                <div class="four wide column">
                    <a class="ui massive gray circular label" onClick={() => addToDialedNumber(0)}>0</a>
                </div>
                <div class="four wide column">
                    <a class="ui massive gray circular label" onClick={() => addToDialedNumber('#')}>#</a>
                </div>
            </div>
            <div class="ui grid">
                <div class="one wide column" />
                <div class="four wide column">
                </div>
                <div class="four wide column">
                    <a class="ui massive green circular label">
                        <i class="icon phone" onClick={() => props.placeCall(dialedNumber)}></i>
                    </a>
                </div>
                <div class="four wide column">
                    <a class="ui large white circle label">
                        {!_.isEmpty(dialedNumber) ? < FontAwesomeIcon onClick = { () => (removeDialedNumber())} icon={faBackspace} /> : <div/>}
                    </a>
                </div>
                <div class="three wide column">
                </div>
            </div>

        </React.Fragment>
    )
}

export default PhoneDialpad;