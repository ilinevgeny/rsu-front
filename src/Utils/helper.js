import {OrderedMap, Map} from 'immutable'

export function arrToMap(arr) {
    return arr.reduce((acc, item) =>
            acc.set(item.id, item)
        , new OrderedMap({}))
}

export function mapToArr(obj, DataRecord) {
    return obj.valueSeq().toArray().map((value) => new DataRecord(value));
}

export function numberFormat( number, decimals, dec_point, thousands_sep ) {
    let i, j, kw, kd, km;

    // input sanitation & defaults
    if( isNaN(decimals = Math.abs(decimals)) ){
        decimals = 2;
    }
    if( dec_point === undefined ){
        dec_point = ",";
    }
    if( thousands_sep === undefined ){
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if( (j = i.length) > 3 ){
        j = j % 3;
    } else{
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");

    return km + kw + kd;
}

export function getParameterByName(name) {
    let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

export function prepareParams(params) {
    let url = params[0];
    delete params[0];
    for (let i in params) {
        params[i] = params[i] ? decodeURIComponent(params[i]) : params[i];
    }

    return params;
}