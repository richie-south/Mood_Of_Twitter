'use strict';
import React from 'react';
import TitleSection from '../components/TitleSection';
import SymbolHolderMax from '../components/SymbolHolderMax';
import SymbolRows from '../components/SymbolRows';
import Message from '../components/Message';
import { Link } from 'react-router';

export default class MyTwitterMood extends React.Component {
    constructor(props){
        super(props);
        this.props.disconnectSocket();

        this.state = {
            userName: '',
            nrOfTweets: 0,
            symbols: [],
            mostOccuredSymbol: '',
            mostOccuredSymbolNr: 0,
            error: false,
            errorMessage: '',
            noTweets: false,
            message: ''
        };
    }

    getUserData(userName){
        return new Promise((resolve, reject) => {
            fetch(`/userMood/${userName}`)
                .then(resonse => resonse.json())
                .then(result => resolve(result))
                .catch(e => reject(e));
        });
    }

    getMostOccuredSymbol(symbols){
        return symbols.splice(0, 1);
    }

    handleInputChange(e){
        const userName = e.target.value;
        this.setState({userName});
    }

    inputKeyPress(e){
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();

            this.handleSubmit();
      }
    }

    handleSubmit(){
        this.getUserData(this.state.userName)
            .then(result => {
                if(result.hasOwnProperty('error')){
                    this.setState({error: true, errorMessage: result.error});
                    return;
                }else if(result.nrOfTweets <= 0){
                    this.setState({noTweets: true, message: 'No emojis found!'});
                    return;
                }

                let symbols = result.symbols;
                const mostOccuredSymbolObject = symbols.splice(0, 1)[0];
                const mostOccuredSymbol = (<div key={Math.random()} class="pop-appear">{mostOccuredSymbolObject.symbol}</div>);
                this.setState({noTweets: false, error: false, symbols, nrOfTweets: result.nrOfTweets, mostOccuredSymbol: mostOccuredSymbol, mostOccuredSymbolNr: mostOccuredSymbolObject.occurs});
            })
            .catch(e => {});
    }

    render(){
        return (
            <div>
                <section class="hero is-dark is-small">
                  <div class="hero-head">
                    <header class="nav">
                      <div class="container">
                        <div class="nav-left">
                            <Link class="button is-info" to="/">Home</Link>
                        </div>

                        <div class="nav-center">
                            {(() => {
                                  if(this.state.error){
                                      return (<Message class="nav-item" message={this.state.errorMessage}/>);
                                  }else if(this.state.noTweets){
                                      return (<Message class="nav-item" message={this.state.message}/>);
                                  }
                              })()}
                         </div>

                         <div class="nav-right nav-menu">
                         </div>
                      </div>
                    </header>
                  </div>

                  <div class="hero-body">
                      <div class="container has-text-centered">

                        <h1 class="title">
                            <p class="title">
                              Enter Twitter name
                            </p>

                            <input class="input is-info userNameInput" type="text" placeholder="Twitter user name" onKeyPress={this.inputKeyPress.bind(this)} onChange={this.handleInputChange.bind(this)} />
                        </h1>

                        <h2 class="subtitle">
                          <button class="button is-info" onClick={this.handleSubmit.bind(this)}>Check Mood</button>
                        </h2>
                      </div>
                  </div>
                </section>

                <SymbolHolderMax symbols={this.state.symbols} symbol={this.state.mostOccuredSymbol} occurs={this.state.mostOccuredSymbolNr}/>
                <SymbolRows symbols={this.state.symbols}/>
            </div>
        );
    }
}
