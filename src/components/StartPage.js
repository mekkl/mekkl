import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Startpage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className='grid-container-standard'>
                <div className='flex-container-centered'>
                    <Link to='/tutorials'>
                        <h1>show tutorials</h1> 
                    </Link>
                </div>
                {/* <div className='flex-container-centered'>
                    <h1>2</h1> 
                </div>
                <div className='flex-container-centered'>
                    <h1>3</h1> 
                </div> */}
            </div>
        )
    }
}



