const {entities,problems,reasons} = require('../src/raw-data.json');

function array_sample(array,num) {
    const items = [...array].map(v=>({v,r:Math.random()})).sort((a,b)=>a.r-b.r);
    return items.slice(0,Math.min(num,items.length)).map(v=>v.v);
}

function get_entities(num=-1) {
    if (num == -1) return entities;
    return array_sample(entities,num);
}

function get_problems(num=-1) {
    if (num == -1) return problems;
    return array_sample(problems,num);
}

function get_reasons(num=-1) {
    if (num == -1) return reasons;
    return array_sample(reasons,num);
}

module.exports =  {
    get_entities,
    get_problems,
    get_reasons,
    entities,problems,reasons,
}
