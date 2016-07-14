'use strict';
import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
    constructor(){
        super();
        this.state = {
            socket: io()
        };
    }

    disconnectSocket(){
        this.state.socket.emit('endStream');
    }

    reConnectSocket(){
        this.state.socket.connect();
        this.startStream();
    }

    startStream(){
        this.state.socket.emit('startStream');
    }

    render(){

        const props = {
            socket: this.state.socket,
            disconnectSocket: this.disconnectSocket.bind(this),
            reConnectSocket:  this.reConnectSocket.bind(this),
            startStream: this.startStream.bind(this)
        };
        return (
            <div>
                {React.cloneElement(this.props.children, props)}
            </div>
        );
    }
}
