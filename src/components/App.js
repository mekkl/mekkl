import React, { Component } from 'react';
import '../styles/App.css';
import TutorialPage from './TutorialPage';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import StartPage from './StartPage';
import { Link } from 'react-router-dom'
import PageNotFound from './PageNotFound'

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Router basename={`${this.props.history.location.pathname}`}>
                <div className="grid-container-frame">
                    <div className="grid-container-main" >
                        <div id='search-topbar' className="frame-grid-item">
                            
                        </div>
                        
                        <div id='main-topbar' className="frame-grid-item">
                            <div id='logo-container'>
                                <Link to='/'><button className='button-logo' type="submit" >mekkl.</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="frame-grid-item">
                        <Router basename={`${this.props.history.location.pathname}`}>
                            <Switch>
                                <Route exact path="/" component={StartPage} />
                                <Route exact path="/tutorials*" component={TutorialPage} />
                                <Route component={PageNotFound} />
                            </Switch>
                        </Router>
                    </div >
                </div >
            </Router>
        );
    }
}

export default App;
