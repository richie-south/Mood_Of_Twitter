'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

import Layout from './pages/Layout';
import TwitterMood from './pages/TwitterMood';
import MyTwitterMood from './pages/MyTwitterMood';

const app = document.querySelector('#app');
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" components={Layout}>
            <IndexRoute components={TwitterMood}></IndexRoute>
            <Route path="/twitterUserMood" components={MyTwitterMood}></Route>
        </Route>
    </Router>,
app);
