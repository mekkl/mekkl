import React, { Component } from 'react';
import '../styles/styles.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';


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

        return (

            <div className='grid'>
                <header id="pageHeader">
                    <div id='pageHeaderTitle'>mekkl</div>
                    <div id='pageHeaderMiddle'></div>
                    <div id='pageHeaderMenu'>articles   about</div>
                </header>
                <article id="mainArticle">
                
                </article>
            </div>

        );
    }
}

export default App;

