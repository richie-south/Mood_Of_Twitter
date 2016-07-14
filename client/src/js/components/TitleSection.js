'use strict';
import React from 'react';
import { Link } from 'react-router';

export default class TitleSection extends React.Component {
    constructor(props){
        super(props);
    }

    clearState(){
        this.props.clearState();
    }

    render(){
        return (
            <section class="hero is-dark">
              <div class="hero-head">
                <header class="nav">
                  <div class="container">
                    <div class="nav-left">
                        <Link onClick={this.clearState.bind(this)} class="button is-info" to="twitterUserMood">Check your Twitter mood</Link>
                    </div>
                  </div>
                </header>
              </div>

              <div class="hero-body">
                <div class="container">
                  <p class="title">
                    Mood Of Twitter
                  </p>
                  <p class="subtitle">
                    tweets analyzed: {this.props.nrOfTweets}
                  </p>
                </div>
              </div>
            </section>

        );
    }
}
