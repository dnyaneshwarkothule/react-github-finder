import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import { Home } from './components/layout/Home';
import { Alert } from './components/layout/Alert';
import { About } from './components/layout/About';
import { NotFound } from './components/layout/NotFound';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App = () => {
    return (
        <GithubState>
            <AlertState>
                <Router>
                    <Fragment>
                        <Navbar title='Github Finder' icon='fab fa-github' />
                        <div className='container'>
                            <Alert />
                            <Route exact path='/' component={Home} />

                            <Route exact path='/about' component={About} />

                            <Route exact path='/user/:login' component={User} />

                            <Route component={NotFound} />
                        </div>
                    </Fragment>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
