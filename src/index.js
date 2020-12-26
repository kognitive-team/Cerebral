import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import appReducer from './reducers';
import thunk from 'redux-thunk';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

const theme = createMuiTheme({
  typography: {

      
      h5: {
     
        fontFamily: 'Abril Fatface ',
        fontWeight: "600",
        fontSize: "1.5rem",
        color:'#e5452b'
      },
      h6: {
          fontFamily: 'DM Serif Text, serif',
          fontWeight: "400",
      },
      button:{
          fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
          fontWeight: "500",
          fontSize: "0.875rem",
          disableRipple: true
      }},
      transitions: {
          // So we have `transition: none;` everywhere
          create: () => 'none',
        },
      MuiButtonBase: {
          // The properties to apply
          disableRipple: true // No more ripple, on the whole application!
        },
      palette: {
              primary: {
              light: '#7986cb',
              main: '#532bf2',
              dark: '#303f9f',
              contrastText: '#fff'
           },
           secondary: {
               main:'#e5452b'
           }

      }//end of Palette
      
});

ReactDOM.render( 
  
    <Provider store={store}>
      <ThemeProvider theme={theme}>
            <App />
      </ThemeProvider>      
    </Provider>,
  document.querySelector('#root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

