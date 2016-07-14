'use strict';
import React from 'react';
import TitleSection from '../components/TitleSection';
import SymbolHolderMax from '../components/SymbolHolderMax';
import SymbolRows from '../components/SymbolRows';

export default class TwitterMood extends React.Component {
    constructor(props){
        super(props);

        this.socket = this.props.socket;
        this.props.reConnectSocket();
        this.socketConnect();


        this.state = {
            symbolsList: [],
            mostOccuredSymbol: '',
            mostOccuredSymbolNr: 0,
            nrOfTweets: 0
        };
    }

    clearState(){
        this.setState({
            symbolsList: [],
            mostOccuredSymbol: '',
            mostOccuredSymbolNr: 0,
            nrOfTweets: 0
        });
    }

    socketConnect(){
        this.socket.on('connect', () => {
        });
    }

    socketSymbolUpdate(){
        this.socket.on('symbol update', this._socketSymbolUpdate.bind(this));
    }

    _socketSymbolUpdate(data){
        let symbols = JSON.parse(JSON.stringify(data)).symbols;
        const mostOccuredSymbolObject = symbols.splice(this.getMostOccuredSymbolIndex(symbols), 1)[0];

        this.symbolUpdate(symbols, data.nrOfTweets, mostOccuredSymbolObject.symbol, mostOccuredSymbolObject.occurs);
    }

    componentWillUnmount(){
        this.socket.removeAllListeners('symbol update');
    }

    componentDidMount(){
        this.socketSymbolUpdate();
    }

    symbolUpdate(symbolsList, nrOfTweets, mostOccuredSymbol, mostOccuredSymbolNr ){
        this.setState({symbolsList, nrOfTweets, mostOccuredSymbol, mostOccuredSymbolNr});
    }

    getMostOccuredSymbolIndex(symbols){
        let max = 0;
        let maxIndex = 0;
        symbols.forEach((s, i) => {
            if(s.occurs > max){
                maxIndex = i;
                max = s.occurs;
            }
        });

        return maxIndex;
    }

    render(){
        return (
            <div>
                <TitleSection clearState={this.clearState.bind(this)} nrOfTweets={this.state.nrOfTweets}/>
                <SymbolHolderMax symbols={this.state.symbolsList} symbol={this.state.mostOccuredSymbol} occurs={this.state.mostOccuredSymbolNr}/>
                <SymbolRows symbols={this.state.symbolsList}/>
            </div>
        );
    }
}
