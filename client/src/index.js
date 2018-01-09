import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './Components/Main/App';
import registerServiceWorker from './registerServiceWorker';

//MATERIAL UI THEME
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import customMuiTheme from './Components/Other/muiTheme';

const Index = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(customMuiTheme)}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
