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

        let sidemenu_class = "show-sidemenu"
        // let toggle_sidemenu_class = this.state.showMenu ? "toogle-hide-sidemenu" : "toogle-show-sidemenu";
        // let btn_icon = this.state.showMenu ? <MenuIcon  width={50} fill={'black'} /> : <HideMenuIcon  width={50} fill={'black'} />;

        return (

            <div className='grid'>
                <header id="pageHeader">Header</header>
                <article id="mainArticle">Article</article>
            </div>

        );
    }
}

export default App;

