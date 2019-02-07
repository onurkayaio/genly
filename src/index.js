import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import storeConfiguration from './store';

// containers
import Home from './containers/home/home';
import Dashboard from './containers/dashboard/dashboard';
import Privacy from './containers/privacy/privacy';
import Feedback from './containers/feedback/feedback';

const store = storeConfiguration();

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route exact path="/dashboard" component={ Dashboard }/>
          <Route exact path="/privacy" component={ Privacy }/>
          <Route exact path="/feedback" component={ Feedback }/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();