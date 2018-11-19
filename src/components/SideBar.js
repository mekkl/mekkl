import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/App.css';

export default class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Link to='/tutorials/ngrok_on_rasp-pi'><button className='button-sidenav' type="submit" >ngrok på pi</button></Link>
            </div>
        )
    }
}