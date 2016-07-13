'use strict';

const config = require('../config/config.js');

const symbols = config.items.join('|');
const regexp = new RegExp(symbols, 'gi');
let result = [];
let nrOfTweetsCounted = 0;

/**
 * [adds symbols to array and sorts it by most frequently used ]
 * @param  {[object]} symbolsHolder [contains symbols and value of symbols]
 * @param  {[number]} node          [node of symbolsHolder]
 * @param  {[array]} result         [array of sorted symbols]
 * @return {[array]}                [array of sorted symbols]
 */
const sortSymbols = (symbolsHolder, node = 0, result = []) => {

    if(Object.keys(symbolsHolder).length === node){
        return result
            .sort((a, b) => {
                if(a.occurs > b.occurs){
                    return 1;
                }else if(a.occurs < b.occurs){
                    return -1;
                }else{
                    return 0;
                }
            });
    }

    let value = symbolsHolder[Object.keys(symbolsHolder)[node]];
    result.push({ symbol: Object.keys(symbolsHolder)[node], occurs: value});

    return sortSymbols(symbolsHolder, node+1, result);
};

/**
 * [matches values of string with regex, if no match it will throw error]
 * @param  {[RegExp]} regex [regex with values to match]
 * @param  {[string]} text  [string to match regex with]
 * @return {[array]}       [matched values]
 */
const matchWithRegex = (regex) => (text) => {
    let matchedSymbols = text.match(regex);
    if(matchedSymbols === null){
        throw 'No symbols matched';
    }
    return matchedSymbols;
};
const matchSymbols = matchWithRegex(regexp);

/**
 * [adds only uniq values to mySet and valueHolder]
 * @param  {[array]} values    [array with values]
 * @param  {[Set]} mySet       [Set that holds uniq values]
 * @param  {[Object]} valueHolder [Holds uniq values and nr of times that value occurs]
 * @return {[array]}             [array whti mySet and valueHolder]
 */
const addIfUniq = (values, mySet, valueHolder) => {
    values.forEach(value => {
        if(!mySet.has(value)){
            mySet.add(value);
            valueHolder[value] = 1;
        }else{
            valueHolder[value] = valueHolder[value] + 1;
        }
    });
    return [mySet, valueHolder];
};

/**
 * [counts number of times each symbol occurs in multible texts]
 * @param  {[Number]} counter       [represents number of times function have been invoked]
 * @param  {[Set]} mySet            [ensures only uniq symbols are added to symbolsHolder]
 * @param  {[object]} symbolsHolder [holds uniq symbols an number of times each symbols bean mentiond]
 * @param  {[string]} Text          [string that wil be examined for symbols]
 * @return {[Function]}             [self]
 */
const symbolCounter = (counter = 0, mySet = new Set(), symbolsHolder = {}) => (text) => {
    let matchedSymbols;
    try {
        matchedSymbols = matchSymbols(text);
    } catch (e) {
        return symbolCounter(counter, mySet, symbolsHolder);
    }

    const [newSet, newSymbolsholder] = addIfUniq(matchedSymbols, mySet, symbolsHolder);
    // Evil bad sideeffects
    result = sortSymbols(newSymbolsholder);
    nrOfTweetsCounted = counter;

    return symbolCounter(counter+=1, mySet, newSymbolsholder);
};

const getUsedSymbols = () => {
    return result;
};

const getNumberOfTweetsCalculated = () => {
    return nrOfTweetsCounted;
};

module.exports = {
    symbolCounter,
    getUsedSymbols,
    getNumberOfTweetsCalculated
};
