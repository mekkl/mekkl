import React, { Component } from 'react';
import '../styles/styles.css';
import TutorialPage from './TutorialPage';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import StartPage from './StartPage';
import { Link } from 'react-router-dom'
import PageNotFound from './PageNotFound'

class App extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     showMenu: false,
        // }
    }

    // changeColor() {
    //     this.setState({showMenu: !this.state.showMenu})
    // }


    render() {

        let sidemenu_class = "show-sidemenu"
        // let toggle_sidemenu_class = this.state.showMenu ? "toogle-hide-sidemenu" : "toogle-show-sidemenu";
        // let btn_icon = this.state.showMenu ? <MenuIcon  width={50} fill={'black'} /> : <HideMenuIcon  width={50} fill={'black'} />;

        return (
            <Router basename={`${this.props.history.location.pathname}`}>
            <div className='page'>
                
                <div className='topmenu'>

                </div >
                <div className='content'>

                </div >
                <div className={sidemenu_class}>
                    
                </div >
            </div>
            </Router>
        );
    }
}

export default App;


{/* <div id='main-topbar' className="frame-grid-item">
                            <div id='logo-container'>
                                <Link to='/'><button className='button-logo' type="submit" >mekkl.</button></Link>
                            </div>
                        </div> */}