import React, { Component } from 'react';
import '../styles/App.css';
import SideBar from './SideBar';
import Content from './Content';
import TutorialNotFound from './TutorialNotFound';
import NgrokSupervisor from '../tutorialComponents/NgrokSupervisor';
import Test from './../tutorialComponents/test'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    return (
      <div className="grid-container-main">
        <div className="grid-item flex-container-sidenav" id='main-sidenav'>
          <div className="flex-item-sidenav">
            <SideBar />
          </div>
          <div className="flex-item-sidenav">
          </div>
        </div>
          <div className="grid-item flex-container-content">
            <Router basename='/'>
                <Switch>
                    <Route exact path="/tutorials" component={Content} />
                    <Route exact path="/tutorials/ngrok_on_rasp-pi" component={NgrokSupervisor} />
                    <Route component={TutorialNotFound} />
                </Switch>
            </Router>
          </div>
      </div>
    );
  }
}

