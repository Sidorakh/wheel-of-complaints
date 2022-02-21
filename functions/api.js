const wheel_data = require('./wheel-data');
exports.handler = async function(event,context) {
    const entity = wheel_data.entities[Math.floor(Math.random()*wheel_data.entities.length)];
    const problem = wheel_data.problems[Math.floor(Math.random()*wheel_data.problems.length)];
    const reason = wheel_data.reasons[Math.floor(Math.random()*wheel_data.reasons.length)];
    return {
        statusCode:200,
        body: `${entity} is ${problem} because ${reason}`,
    }
}