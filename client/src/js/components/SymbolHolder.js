'use strict';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SymbolHolder extends React.Component {

    getSize(occurs){
        if(occurs < 24){
            return {
                fontSize: '24px'
            };
        } else if(occurs > 80){
            return {
                fontSize: '80px'
            };
        } else{
            return {
                fontSize: `${occurs}px`
            };
        }

    }

    render(){
        return (
            <div class="column is-4">
                <ReactCSSTransitionGroup transitionName="pop"
                    transitionAppear={true} transitionAppearTimeout={500}
                    transitionEnter={false} transitionLeave={false}>
                    <div class="box symbolWrapBox">
                        <figure class="image symbolWrap" style={this.getSize(this.props.occurs)}>
                            <div>{this.props.symbol}</div>
                        </figure>
                        <div class="symboTagHolder">
                            <span class="tag is-info">{this.props.occurs}</span>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
