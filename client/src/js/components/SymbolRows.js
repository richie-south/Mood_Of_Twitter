'use strict';
import React from 'react';
import SymbolHolder from '../components/SymbolHolder';

export default class SymbolRows extends React.Component {

    getSymbolHolders(){
        return this.props.symbols.map(a => {
            return (<SymbolHolder key={a.symbol} symbol={a.symbol} occurs={a.occurs}/>);
        });
    }

    render(){
        return (
            <section class="section">
              <div class="container">
                <h1 class="title">Other popular emojis</h1>
                <h2 class="subtitle">
                <strong><span class="tag is-info">(number of times it's been used)</span></strong>
                </h2>
                <hr/>
                <div class="content">
                    <div class="columns is-multiline">
                        {this.getSymbolHolders()}
                    </div>
                </div>
              </div>
            </section>
        );
    }
}
