import React, { Component } from 'react';


export default class NgrokSupervisor extends Component {
        constructor(props) {
                super(props)
                this.state = {}
        }

        // async componentDidMount() {
        //         fetch('http://localhost:3001/api/md/html/ngrok_pi_setup.md').then(res => res.json()).then(json => this.setState({ __html: json.html.join('\n') }))
        // }

        render() {
                return (
                        <div className='flex-item-markdown'>



                        </div>
                )
        }
};