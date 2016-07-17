'use strict';

const config = require('../config/config.js');
const symbols = config.items.join('|');
const regexp = new RegExp(symbols, 'gi');

class SymbolCalculator {

    constructor(){
        this.counter = 0;
    }

    getCounted(){
        return this.counter;
    }

    /**
     * [counts number of times each symbol occurs in multible texts]
     * @param  {[type]} text [description]
     * @return {[type]}      [description]
     */
    getMostUsedSymbol(text){
        let symbolsHolder = {};
        let matchedSymbols;
        try {
            matchedSymbols = text.match(regexp);
            if(matchedSymbols === null){
                throw 'No symbols matched';
            }
        } catch (e) {
            return symbolsHolder;
        }

        matchedSymbols.forEach(a => {
            if(symbolsHolder[a]){
                symbolsHolder[a] = symbolsHolder[a] + 1;
            }else{
                symbolsHolder[a] = 1;
            }
        });
        this.counter+=1;
        return symbolsHolder;
    }
}


module.exports = SymbolCalculator;
