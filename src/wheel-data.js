const entities = [
    "The AEC",
    "Leonardo Puglisi",
    "Dan Andrews",
    "The ABC",
    "The Greens party",
    "The Labor party",
    "The Guardian",
    "Pfizer",
    "Moderna",
    "AstraZeneca",
    "The Unofficial Chaser Discord Server",
    "The Great Mouse Plague of 2021",
    "The Chaser",
    "The Shovel",
    "The Betoota Advocate",
    "Antony Green",
];

const problems = [
    "right wing",
    "problematic",
    "a liberal front",
    "run by a Lib/Nat staffer",
    "generally crap",
    "even worse than the LNP",
    "not even slightly impartial",
    "a front for Nazis",
    "perpetuating cancel culture",
    "spreading fake news",
    "a right wing nutjob",
    "a secret supporter of Pauline Hansons One Nation",
    "a rabit antivaxxer",
    "the cause of Pizzagate",
    "a corporate shill",
    "a shill for the Coalition",
    "a crisis actor",
    "the founder of ANTIFA",
    "a far left plant",
];

const reasons = [
    "I'm secretly a Nazi",
    "they criticised Labor",
    "they criticised Albo",
    "PRGuy said so",
    "my friend's cousins ballsack tripled in size",
    "they're pink",
    "they steal votes from Labor",
    "they dared remind us that preferential voting exists",
    "they're a loaf of milk",
    "a fact check hurt my fee fees",
    "the UAP showed me the truth",
    "the frogs turned gay",
    "they need to smile more",
    "we don't have free RATs",
    "they defamed me on Twitter",
    "I couldn't purchase soft serve today",
    "I sent a spicy text message",
    "the milkshake did not consent",
    "they went woke",
    "they fondled a lump of coal",
    "they texted me like a cringy ex",
    "they are a Rupert Murdoch simp",
    "Mr Potato head started wearing heels",
    "they own a sexy desk",
    "that desk was asking for it!",
    "they refused a handshake from Scott Morrison",
    "they didn't think carparks in marginal electorates was a good investment",
    "they support unpublishing sexist books",
    "they researched facts before writing a tweet",
    "they're actually 3 lib staffers in a trench coat",
];

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

export default {
    get_entities,
    get_problems,
    get_reasons,
}
