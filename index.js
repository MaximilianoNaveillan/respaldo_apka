import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import {BrowserRouter as Router} from 'react-router-dom';


  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyCIQpI1Ppo6EcBxWO_YNsOUAoipKPjS1Po",
    authDomain: "apkaapimap.firebaseapp.com",
    databaseURL: "https://apkaapimap.firebaseio.com",
    projectId: "apkaapimap",
    storageBucket: "apkaapimap.appspot.com",
    messagingSenderId: "959340797070"
  })



ReactDOM.render(
       <Router>
                <App />
     </Router>,
                 document.getElementById('root'));
registerServiceWorker();
