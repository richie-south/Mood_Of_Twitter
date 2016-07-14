'use strict';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SymbolHolderMax extends React.Component {

    render(){
        return (
            <section class="hero is-light is-medium">
                <ReactCSSTransitionGroup transitionName="pop"
                    transitionAppear={true} transitionAppearTimeout={500}
                    transitionEnter={false} transitionLeave={false}>
              <div class="hero-body">

                  <div class="container has-text-centered">

                    <h1 class="title">
                        <div class="symbolWrapMax">
                            {this.props.symbol}
                        </div>
                    </h1>

                    <h2 class="subtitle">
                      <span class="tag is-info">{this.props.occurs}</span>
                    </h2>
                  </div>

              </div>
              </ReactCSSTransitionGroup>
            </section>
        );
    }
}
