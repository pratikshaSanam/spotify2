import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from './Utils/StateProvider';
import reducer, { initialState } from './Utils/reducer';



ReactDOM.render(
  <React.StrictMode>  
      <StateProvider initialState={initialState} reducer={reducer}>

  
      <App />
      </StateProvider>
    
    </React.StrictMode>,
document.getElementById('root'));



