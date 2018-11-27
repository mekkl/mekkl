import React, { Component } from 'react';
import '../styles/styles.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <article id="mainArticle">Article</article>
        );
    }
}

export default App;

