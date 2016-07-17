'use strict';

/**
 * [splits every entry in object to seperate object an places it in array]
 * @return {[Array]}        [array of objects]
 */
const splitObjectToArray = (object, node = 0, result = []) => {
    if(Object.keys(object).length === node){
        return result;
    }
    let value = object[Object.keys(object)[node]];
    result.push({ key: Object.keys(object)[node], value: value});

    return splitObjectToArray(object, node+1, result);
};

class SymbolCollection {
    constructor(){
        this.collection = {};
    }

    add(symbolObject){
        const mostUsed = splitObjectToArray(symbolObject);
        mostUsed.forEach(obj => {
            if(this.collection[obj.key]){
                this.collection[obj.key] = this.collection[obj.key] + obj.value;
            }else{
                this.collection[obj.key] = 1;
            }
        });
    }

    getCollection(){
        return splitObjectToArray(this.collection)
            .map(a => {
                return {
                    symbol: a.key,
                    occurs: a.value
                };
            });
    }

    getCollectionSorted(){
        return this.getCollection()
            .sort((a, b) => {
                if(a.occurs < b.occurs){
                    return 1;
                }else if(a.occurs > b.occurs){
                    return -1;
                }else{
                    return 0;
                }
            });
    }
}

module.exports = SymbolCollection;
