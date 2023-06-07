const logger = require('./bei-logger');

function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

function serializeValues(req){
    let values = []
    Object.values(req.body).forEach(value => {
        logger.debug(`Es JSON? ${isJson(value)}`)
        values.push(isJson(value)?JSON.stringify(value):value)
    }) 
    return values
}

module.exports = {
    isJson,
    serializeValues
}