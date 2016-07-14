'use strict';
import React from 'react';

export default class Message extends React.Component {

    render(){
        return (
            <div class="notification is-warning">
                {this.props.message}
            </div>
        );
    }
}
